const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

const setToken = token => localStorage.setItem(TOKEN_KEY, token);
const setRefreshToken = refreshToken => localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

export const setTokens = ({
    token,
    refresh_token,
}) => {
    setToken(token);
    setRefreshToken(refresh_token);
};

export const clearTokens = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};
