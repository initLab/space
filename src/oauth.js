import PKCE from 'js-pkce';
import { getToken } from './authStorage.js';

const baseUrl = import.meta.env.BACKEND_URL + 'oauth/';

export const urls = {
    authorize: baseUrl + 'authorize',
    token: baseUrl + 'token',
    revoke: baseUrl + 'revoke',
};

const clientId = import.meta.env.OAUTH_CLIENT_ID;

export const scopes = ['account_data_read', 'door_control'].join(' ');

export const pkce = new PKCE({
    client_id: clientId,
    redirect_uri: window.location.protocol + '//' + window.location.host + import.meta.env.BASE_URL + 'oauth-callback',
    authorization_endpoint: urls.authorize,
    token_endpoint: urls.token,
    requested_scopes: scopes,
});

export const revokeToken = async token => fetch(urls.revoke, {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        client_id: clientId,
        token,
    }),
});
