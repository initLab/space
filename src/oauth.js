import PKCE from 'js-pkce';

const scopes = ['public', 'account_data_read', 'door_control'].join(' ');

const pkce = new PKCE({
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirect_uri: window.location.protocol + '//' + window.location.host + import.meta.env.BASE_URL + 'oauth-callback',
    authorization_endpoint: import.meta.env.VITE_BACKEND_URL + 'oauth/authorize',
    token_endpoint: import.meta.env.VITE_BACKEND_URL + 'oauth/token',
    requested_scopes: scopes,
});

export { pkce, scopes };
