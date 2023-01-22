const ACCESS_TOKEN_KEY = 'accessToken';
const ACCESS_TOKEN_EXPIRE_KEY = 'accessTokenExpire';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const checkAuth = () => {
    const expire = localStorage.getItem(ACCESS_TOKEN_EXPIRE_KEY) * 1000;

    if (expire === null || expire > Date.now()) {
        return;
    }
    // TODO: refresh token
    clearAuth();
};

export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const setAuth = (accessToken, accessTokenExpire, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(ACCESS_TOKEN_EXPIRE_KEY, accessTokenExpire);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearAuth = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}
