import {getAccessToken, isAccessTokenExpired} from '../hooks/useAuthStorage.ts';
import {refreshTokenIfNeeded} from '../oauth.ts';
import type {SpaceError} from "../portier-types";

// function addTokenHeader(url : RequestInfo | URL, init?: RequestInit) {
//     const token = getAccessToken();
//     const authHeader = {
//         authorization: "Bearer ".concat(token),
//     };
//
//     if(typeof url
//     if(url.hasOwnProperty('headers'))
//         url.headers = {
//             ...url.headers,
//             ...authHeader,
//         };
// }

function withAuthHeader(init?: RequestInit): RequestInit {
    return {...init, headers: {authorization: "Bearer ".concat(getAccessToken())}};
}

export const fetcher = async <T>(url: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(url, init);

    if (!response.ok) {
        const error = new Error('HTTP error '.concat(response.status.toString())) as SpaceError;
        error.status = response.status;
        throw error;
    }

    return await response.json() as T;
}

export const authenticatedFetcher = async <T>(url: RequestInfo | URL, init?: RequestInit) => {
        if (isAccessTokenExpired()) {
            const refreshed = await refreshTokenIfNeeded();

            if (!refreshed) {
                return Promise.reject();
            }
        }

        try {
            return await fetcher(url, withAuthHeader(init)) as T
        } catch (e: any) {
            if (e?.status === 401 && await refreshTokenIfNeeded()) {
                return await fetcher(url, withAuthHeader(init)) as T;
            }
            throw e as SpaceError;
        }
    }
;
