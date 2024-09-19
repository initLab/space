import { useLocalStorage } from '@uidotdev/usehooks';
import { scopes } from '../oauth.js';

const STORAGE_KEY = 'tokens';

const ACCESS_TOKEN_KEY = 'accessToken';
const ACCESS_TOKEN_EXPIRE_KEY = 'accessTokenExpire';
const REFRESH_TOKEN_KEY = 'refreshToken';

const defaultTokensValue = {};

function parseTokenResponse(tokenResponse) {
    if (Object.prototype.hasOwnProperty.call(tokenResponse, 'error') && Object.prototype.hasOwnProperty.call(tokenResponse, 'error_description')) {
        throw new Error(tokenResponse.error_description);
    }

    if (
        !Object.prototype.hasOwnProperty.call(tokenResponse, 'access_token') ||
        !Object.prototype.hasOwnProperty.call(tokenResponse, 'created_at') ||
        !Object.prototype.hasOwnProperty.call(tokenResponse, 'expires_in') ||
        !Object.prototype.hasOwnProperty.call(tokenResponse, 'refresh_token') ||
        !Object.prototype.hasOwnProperty.call(tokenResponse, 'scope') ||
        !Object.prototype.hasOwnProperty.call(tokenResponse, 'token_type') ||
        tokenResponse.token_type !== 'Bearer' ||
        tokenResponse.scope !== scopes
    ) {
        throw new Error('Incomplete response, missing fields');
    }

    return {
        [ACCESS_TOKEN_KEY]: tokenResponse.access_token,
        [ACCESS_TOKEN_EXPIRE_KEY]: (tokenResponse.created_at + tokenResponse.expires_in) * 1_000,
        [REFRESH_TOKEN_KEY]: tokenResponse.refresh_token,
    };
}

export function useAuthStorage() {
    const [ tokens, setTokens ] = useLocalStorage(STORAGE_KEY, defaultTokensValue);

    function updateTokens(tokenResponse) {
        setTokens(parseTokenResponse(tokenResponse));
    }

    function clearTokens() {
        setTokens();
    }

    return {
        accessToken: tokens?.[ACCESS_TOKEN_KEY],
        accessTokenExpire: tokens?.[ACCESS_TOKEN_EXPIRE_KEY],
        refreshToken: tokens?.[REFRESH_TOKEN_KEY],
        updateTokens,
        clearTokens,
    };
}

function getStorageItem(key) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))?.[key];
}

function setStorageValue(value) {
    const key = STORAGE_KEY;
    const newValue = JSON.stringify(value || defaultTokensValue);
    localStorage.setItem(key, newValue);
    window.dispatchEvent(new StorageEvent('storage', {
        key,
        newValue,
    }));
}

export function getAccessToken() {
    return getStorageItem(ACCESS_TOKEN_KEY);
}

function getAccessTokenExpire() {
    return getStorageItem(ACCESS_TOKEN_EXPIRE_KEY);
}

export function isAccessTokenExpired() {
    const accessTokenExpire = getAccessTokenExpire();

    return typeof accessTokenExpire !== 'number' || accessTokenExpire < Date.now();
}

export function getRefreshToken() {
    return getStorageItem(REFRESH_TOKEN_KEY);
}

export function updateTokens(tokenResponse) {
    setStorageValue(parseTokenResponse(tokenResponse));
}

export function clearTokens() {
    setStorageValue();
}
