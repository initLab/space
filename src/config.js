export const oidc = {
    authority: import.meta.env.OIDC_AUTHORITY_URL,
    client_id: import.meta.env.OIDC_CLIENT_ID,
    redirect_uri: window.location.protocol + '//' + window.location.host + import.meta.env.BASE_URL + 'oauth-callback',
};

export const sensors = {
    'sensors/big-room': {
        label: 'Big room',
    },
    'sensors/small-room': {
        label: 'Small room',
    },
    'sensors/kitchen': {
        label: 'Kitchen',
    },
};

export const grafana = {
    dashboard: {
        id: 'SGAb0ZXMk',
        name: 'temperature-and-humidity',
    },
    panels: [4, 5, 10],
};
