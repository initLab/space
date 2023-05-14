import { scopes } from './oauth.js';

const ACCESS_TOKEN_KEY = 'accessToken';
const ACCESS_TOKEN_EXPIRE_KEY = 'accessTokenExpire';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getTokenExpireTimestamp = () => localStorage.getItem(ACCESS_TOKEN_EXPIRE_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setTokens = tokenResponse => {
    if (tokenResponse.hasOwnProperty('error') && tokenResponse.hasOwnProperty('error_description')) {
        throw new Error(tokenResponse.error_description);
    }

    if (
        !tokenResponse.hasOwnProperty('access_token') ||
        !tokenResponse.hasOwnProperty('created_at') ||
        !tokenResponse.hasOwnProperty('expires_in') ||
        !tokenResponse.hasOwnProperty('refresh_token') ||
        !tokenResponse.hasOwnProperty('scope') ||
        !tokenResponse.hasOwnProperty('token_type') ||
        tokenResponse.token_type !== 'Bearer' ||
        tokenResponse.scope !== scopes
    ) {
        throw new Error('Incomplete response, missing fields');
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, tokenResponse.access_token);
    localStorage.setItem(ACCESS_TOKEN_EXPIRE_KEY, tokenResponse.created_at + tokenResponse.expires_in);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokenResponse.refresh_token);
};

export const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export const logout = async () => {
    // TODO
    // await revokeToken(getRefreshToken());
    // await revokeToken(getToken());
    clearTokens();
};
