import PKCE from 'js-pkce';
import { clearTokens, getAccessToken, getRefreshToken, updateTokens } from './hooks/useAuthStorage.js';

const clientId = import.meta.env.OAUTH_CLIENT_ID;
const baseUrl = import.meta.env.BACKEND_URL + 'oauth/';

const urls = {
    authorize: baseUrl + 'authorize',
    token: baseUrl + 'token',
    revoke: baseUrl + 'revoke',
};

export const scopes = ['account_data_read'].join(' ');

const pkce = new PKCE({
    client_id: clientId,
    redirect_uri: window.location.protocol + '//' + window.location.host + import.meta.env.BASE_URL + 'oauth-callback',
    authorization_endpoint: urls.authorize,
    token_endpoint: urls.token,
    requested_scopes: scopes,
});

export const authorizeUrl = () => pkce.authorizeUrl();
export const exchangeForAccessToken = async () => pkce.exchangeForAccessToken(window.location.href);

export async function revokeToken(token) {
    return fetch(urls.revoke, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            token,
        }),
    });
}

export async function refreshTokenIfNeeded() {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        clearTokens();
        console.error('No refresh token found');
        return false;
    }

    try {
        updateTokens(await pkce.refreshAccessToken(refreshToken));
    }
    catch (e) {
        clearTokens();
        console.error(e);
        return false;
    }

    return true;
}
