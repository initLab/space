import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken, isAccessTokenExpired } from '../hooks/useAuthStorage.js';
import { refreshTokenIfNeeded } from '../oauth.js';

const apiBaseUrl = import.meta.env.BACKEND_URL + 'api/';
const doorApiBaseUrl = import.meta.env.DOOR_BACKEND_URL + 'api/';

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

        const token = getAccessToken();

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

        const token = getAccessToken();

        if (token) {
            headers.set('authorization', 'Bearer ' + token);
        }

        return headers;
    },
});

const authenticatedBaseQueryWithReauth = async (args, api, extraOptions) => {
    if (isAccessTokenExpired()) {
        await refreshTokenIfNeeded();
    }

    let result = await authenticatedBaseQuery(args, api, extraOptions);

    if (result?.error?.status === 401 && await refreshTokenIfNeeded()) {
        return authenticatedBaseQuery(args, api, extraOptions);
    }

    return result;
};

const authenticatedDoorBaseQueryWithReauth = async (args, api, extraOptions) => {
    if (isAccessTokenExpired()) {
        await refreshTokenIfNeeded();
    }

    let result = await authenticatedDoorBaseQuery(args, api, extraOptions);

    if (result?.error?.status === 401 && await refreshTokenIfNeeded()) {
        return authenticatedDoorBaseQuery(args, api, extraOptions);
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
    baseQuery: authenticatedDoorBaseQueryWithReauth,
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
