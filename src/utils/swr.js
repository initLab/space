import { getAccessToken, isAccessTokenExpired } from '../hooks/useAuthStorage.js';
import { refreshTokenIfNeeded } from '../oauth.js';

function addTokenHeader(args) {
    const token = getAccessToken();
    const authHeader = {
        authorization: 'Bearer '.concat(token),
    };

    if (typeof args[0] === 'object') {
        args[0].headers = {
            ...args[0].headers,
            ...authHeader,
        };
    }
    else {
        args[1] = {
            ...args?.[1],
            headers: {
                ...args?.[1]?.headers,
                ...authHeader,
            },
        };
    }
}

export const fetcher = async (...args) => {
    const response = await fetch(...args);

    if (!response.ok) {
        const error = new Error('HTTP error '.concat(response.status));
        error.status = response.status;
        throw error;
    }

    return await response.json();
};

export const authenticatedFetcher = async (...args) => {
    if (isAccessTokenExpired()) {
        const refreshed = await refreshTokenIfNeeded();

        if (!refreshed) {
            return Promise.reject();
        }
    }

    addTokenHeader(args);

    try {
        return await fetcher(...args);
    }
    catch (e) {
        if (e?.status === 401 && await refreshTokenIfNeeded()) {
            addTokenHeader(args);
            return await fetcher(...args);
        }

        throw e;
    }
};
