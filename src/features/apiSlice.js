import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken, isAccessTokenExpired } from '../hooks/useAuthStorage.js';
import { refreshTokenIfNeeded } from '../oauth.js';

const deviceApiBaseUrl = import.meta.env.PORTIER_URL + 'api/';

const authenticatedDeviceBaseQuery = fetchBaseQuery({
    baseUrl: deviceApiBaseUrl,
    prepareHeaders: headers => {
        headers.set('accept', 'application/json');

        const token = getAccessToken();

        if (token) {
            headers.set('authorization', 'Bearer ' + token);
        }

        return headers;
    },
});

const authenticatedDeviceBaseQueryWithReauth = async (args, api, extraOptions) => {
    if (isAccessTokenExpired()) {
        await refreshTokenIfNeeded();
    }

    let result = await authenticatedDeviceBaseQuery(args, api, extraOptions);

    if (result?.error?.status === 401 && await refreshTokenIfNeeded()) {
        return authenticatedDeviceBaseQuery(args, api, extraOptions);
    }

    return result;
};

export const authenticatedDeviceApiSlice = createApi({
    reducerPath: 'authenticatedDeviceApi',
    baseQuery: authenticatedDeviceBaseQueryWithReauth,
    endpoints: builder => ({
        deviceAction: builder.mutation({
            query: params => ({
                url: 'device/' + params.deviceId + '/' + params.action,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useDeviceActionMutation,
} = authenticatedDeviceApiSlice;
