import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {authSlice, clearTokens, REFRESH_TOKEN_KEY, setTokens, TOKEN_KEY} from './authSlice';

const anonymousBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
        headers.set('accept', 'application/json');

        return headers;
    },
});

const authenticatedBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        headers.set('accept', 'application/json');

        const {
            [authSlice.name]: {
                [TOKEN_KEY]: token,
            },
        } = getState();

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

    const {
        [authSlice.name]: {
            [REFRESH_TOKEN_KEY]: refreshToken,
        },
    } = api.getState();

    if (refreshToken === null) {
        api.dispatch(clearTokens());
        return result;
    }

    const refreshResult = await anonymousBaseQuery({
        url: 'login/refresh-token',
        method: 'POST',
        body: {
            refresh_token: refreshToken,
        },
    }, api, extraOptions);

    if (!refreshResult.data) {
        api.dispatch(clearTokens());
        return result;
    }

    api.dispatch(setTokens(refreshResult.data));

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
        getDoorStatus: query(builder)('door/status'),
        // getLightsStatus: query(builder)('lights/status'),
        getPresentUsers: query(builder)('users/present'),
        // TODO
        login: mutationPostWithBody(builder)('login'),
    }),
});

export const authenticatedApiSlice = createApi({
    reducerPath: 'authenticatedApi',
    baseQuery: authenticatedBaseQueryWithReauth,
    endpoints: builder => ({
        getCurrentUser: query(builder)('current_user'),
    }),
});

export const {
    useGetDoorStatusQuery,
    // useGetLightsStatusQuery,
    useGetPresentUsersQuery,
    useLoginMutation,
} = anonymousApiSlice;

export const {
    useGetCurrentUserQuery,
} = authenticatedApiSlice;
