import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearTokens, getRefreshToken, getToken, getTokenExpireTimestamp, setTokens } from '../authStorage.js';
import { E_ALREADY_LOCKED, Mutex, tryAcquire } from 'async-mutex';

const refreshMutex = new Mutex();
const apiBaseUrl = import.meta.env.VITE_BACKEND_URL + 'api/';
const doorApiBaseUrl = import.meta.env.VITE_DOOR_BACKEND_URL + 'api/';

const refreshToken = async (api, extraOptions) => {
    try {
        return await tryAcquire(refreshMutex).runExclusive(async () => {
            const refreshToken = getRefreshToken();

            if (refreshToken === null) {
                clearTokens();
                console.error('No refresh token found');
                return false;
            }

            const refreshResponse = (await anonymousBaseQuery({
                url: '../oauth/token',
                method: 'POST',
                body: {
                    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                },
            }, api, extraOptions))?.data;

            if (!refreshResponse) {
                clearTokens();
                console.error('Refreshing token failed');
                return false;
            }

            setTokens(refreshResponse);
            return true;
        });
    }
    catch (e) {
        if (e === E_ALREADY_LOCKED) {
            await refreshMutex.waitForUnlock();
            return true;
        }

        throw e;
    }
};

const anonymousBaseQuery = fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: headers => {
        headers.set('accept', 'application/json');

        return headers;
    },
});

const authenticatedBaseQuery = fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: headers => {
        headers.set('accept', 'application/json');

        const token = getToken();

        if (token) {
            headers.set('authorization', 'Bearer ' + token);
        }

        return headers;
    },
});

const authenticatedDoorBaseQuery = fetchBaseQuery({
    baseUrl: doorApiBaseUrl,
    prepareHeaders: headers => {
        headers.set('accept', 'application/json');

        const token = getToken();

        if (token) {
            headers.set('authorization', 'Bearer ' + token);
        }

        return headers;
    },
});

const authenticatedBaseQueryWithReauth = async (args, api, extraOptions) => {
    const expire = getTokenExpireTimestamp();

    if (expire !== null && expire * 1000 < Date.now()) {
        await refreshToken(api, extraOptions);
    }

    let result = await authenticatedBaseQuery(args, api, extraOptions);

    if (result?.error?.status === 401 && await refreshToken(api, extraOptions)) {
        return authenticatedBaseQuery(args, api, extraOptions);
    }

    return result;
};

const query = builder => url => builder.query({
    query: () => url,
});

export const anonymousApiSlice = createApi({
    reducerPath: 'anonymousApi',
    baseQuery: anonymousBaseQuery,
    endpoints: builder => ({
        getPresentUsers: query(builder)('users/present'),
    }),
});

export const authenticatedApiSlice = createApi({
    reducerPath: 'authenticatedApi',
    baseQuery: authenticatedBaseQueryWithReauth,
    endpoints: builder => ({
        getCurrentUser: query(builder)('current_user'),
    }),
});

export const authenticatedDoorApiSlice = createApi({
    reducerPath: 'authenticatedDoorApi',
    baseQuery: authenticatedDoorBaseQuery,
    endpoints: builder => ({
        getDoors: query(builder)('doors'),
        doorAction: builder.mutation({
            query: params => ({
                url: 'doors/' + params.doorId + '/' + params.action,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetPresentUsersQuery,
} = anonymousApiSlice;

export const {
    useGetCurrentUserQuery,
} = authenticatedApiSlice;

export const {
    useGetDoorsQuery,
    useDoorActionMutation,
} = authenticatedDoorApiSlice;
