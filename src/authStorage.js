const TOKEN_KEY = 'token';
const TOKEN_EXPIRE_KEY = 'tokenExpire';

export const checkAuth = () => {
    const expire = localStorage.getItem(TOKEN_EXPIRE_KEY);

    if (expire === null || expire > Date.now()) {
        return;
    }

    clearAuth();
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setAuth = (token, expire) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRE_KEY, (Date.now() + expire * 1000).toString(10));
};

export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRE_KEY);
}
