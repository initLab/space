import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {clearTokens, getRefreshToken, getToken, setTokens} from '../authStorage.js';
import {E_ALREADY_LOCKED, Mutex, tryAcquire} from 'async-mutex';

const refreshMutex = new Mutex();

const anonymousBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: headers => {
        headers.set('accept', 'application/json');

        return headers;
    },
});

const authenticatedBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
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
    let result = await authenticatedBaseQuery(args, api, extraOptions);

    if (!result.error || result.error.status !== 401) {
        return result;
    }

    try {
        await tryAcquire(refreshMutex).runExclusive(async () => {
            const refreshToken = getRefreshToken();

            if (refreshToken === null) {
                clearTokens();
                throw new Error('No refresh token found');
            }

            const refreshResult = await anonymousBaseQuery({
                url: 'login/refresh-token',
                method: 'POST',
                body: {
                    refresh_token: refreshToken,
                },
            }, api, extraOptions);

            if (!refreshResult.data) {
                clearTokens();
                throw new Error('Refreshing token failed');
            }

            setTokens(refreshResult.data);
        });
    }
    catch (e) {
        if (e === E_ALREADY_LOCKED) {
            await refreshMutex.waitForUnlock();
        }
    }

    return authenticatedBaseQuery(args, api, extraOptions);
};

const query = builder => url => builder.query({
    query: () => url,
});

const postWithBody = url => params => ({
    url: url,
    method: 'POST',
    body: params,
});

const mutationPostWithBody = builder => url => builder.mutation({
    query: postWithBody(url),
});

export const anonymousApiSlice = createApi({
    reducerPath: 'anonymousApi',
    baseQuery: anonymousBaseQuery,
    endpoints: builder => ({
        getPresentUsers: query(builder)('api/users/present'),
        // TODO
        login: mutationPostWithBody(builder)('login'),
    }),
});

export const authenticatedApiSlice = createApi({
    reducerPath: 'authenticatedApi',
    baseQuery: authenticatedBaseQueryWithReauth,
    endpoints: builder => ({
        getCurrentUser: query(builder)('api/current_user'),
    }),
});

export const {
    useGetPresentUsersQuery,
    useLoginMutation,
} = anonymousApiSlice;

export const {
    useGetCurrentUserQuery,
} = authenticatedApiSlice;
