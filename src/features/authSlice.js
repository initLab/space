import {createSlice} from '@reduxjs/toolkit'

export const TOKEN_KEY = 'token';
export const REFRESH_TOKEN_KEY = 'refreshToken';

const getInitialState = () => {
    return {
        [TOKEN_KEY]: localStorage.getItem(TOKEN_KEY),
        [REFRESH_TOKEN_KEY]: localStorage.getItem(REFRESH_TOKEN_KEY),
    };
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setTokens: (state, {
            payload: {
                token,
                refresh_token,
            },
        }) => {
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);

            state[TOKEN_KEY] = token;
            state[REFRESH_TOKEN_KEY] = refresh_token;
        },
        clearTokens: () => {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);

            return getInitialState();
        },
    },
});

export const tokenSelector = state => state[authSlice.name][TOKEN_KEY];
export const { setTokens, clearTokens } = authSlice.actions;
