import {useLocalStorage} from '@uidotdev/usehooks';
import {scopes} from '../oauth.ts';
import type {SpaceAccessToken} from "../types";
import type ITokenResponse from 'js-pkce/dist/ITokenResponse';

const STORAGE_KEY = 'tokens';

const hasAll = (obj: any, ...props: string[]) => {
    for (const prop of props) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) return false;
    }
    return true;
}
const requiredTokenProps = ['access_token', 'created_at', 'expires_in', 'refresh_token', 'scope', 'token_type'];

type FaunaTokenError = {
    error: string,
    error_description: string,
};
type FaunaTokenResponse = {created_at?: number} & ITokenResponse;
type FaunaResponse =  FaunaTokenError | FaunaTokenResponse;


function parseTokenResponse(response: FaunaResponse): SpaceAccessToken {
    if ((response as FaunaTokenError).error)
        throw new Error((response as FaunaTokenError).error_description);

    const token = response as FaunaTokenResponse;
    if (!hasAll(response, ...requiredTokenProps) || token.token_type !== 'Bearer' || token.scope !== scopes
    )
        throw new Error('Incomplete response, missing fields');

    return {
        accessToken: token.access_token,
        accessTokenExpire: (token.created_at! + token.expires_in) * 1_000,
        refreshToken: token.refresh_token!,
    };
}

export function useAuthStorage() {
    const [tokens, setTokens] = useLocalStorage<SpaceAccessToken | undefined>(STORAGE_KEY);

    function updateTokens(tokenResponse: FaunaResponse) {
        setTokens(parseTokenResponse(tokenResponse));
    }

    function clearTokens() {
        setTokens(undefined);
    }

    return {
        accessToken: tokens?.accessToken,
        accessTokenExpire: tokens?.accessTokenExpire,
        refreshToken: tokens?.refreshToken,
        updateTokens,
        clearTokens,
    };
}

// function getStorageItem(key) {
//     return JSON.parse(localStorage.getItem(STORAGE_KEY))?.[key];
// }

function getAuthStorage(): SpaceAccessToken {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
}

function setStorageValue(value?: any) {
    const key = STORAGE_KEY;
    const newValue = JSON.stringify(value || {});
    localStorage.setItem(key, newValue);
    window.dispatchEvent(new StorageEvent('storage', {key, newValue}));
}

export function getAccessToken() {
    return getAuthStorage().accessToken;
}

export function isAccessTokenExpired() {
    const accessTokenExpire = getAuthStorage().accessTokenExpire;

    return typeof accessTokenExpire !== 'number' || accessTokenExpire < Date.now();
}

export function getRefreshToken() {
    return getAuthStorage().refreshToken;
}

export function updateTokens(tokenResponse: FaunaResponse) {
    setStorageValue(parseTokenResponse(tokenResponse));
}

export function clearTokens() {
    setStorageValue();
}
