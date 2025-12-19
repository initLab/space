import ColibriDashboard from "./widgets/Dashboards/ColibriDashboard.tsx";
import InitLabDashboard from "./widgets/Dashboards/InitLabDashboard.tsx";

import initlabLogo from './assets/initlab/logo.svg?no-inline';
import colibriLogo from './assets/colibri/logo.png?no-inline';
import type {ReactNode} from "react";

export const oidc = {
    authority: import.meta.env.OIDC_AUTHORITY_URL,
    client_id: import.meta.env.OIDC_CLIENT_ID,
    redirect_uri: window.location.protocol + '//' + window.location.host + import.meta.env.BASE_URL + 'oauth-callback',
};

export type MqttConfig = {[topic: string]: {label: string}}
export const sensors: MqttConfig = {
    'sensors/big-room': {label: 'Big room',},
    'sensors/small-room': {label: 'Small room',},
    'sensors/kitchen': {label: 'Kitchen',},
    'sensors/outside': {label: 'Outside',},
};

export const variantHosts: {[hostname: string]: string} = {
    'space.initlab.org': 'initlab',
    'initlab.github.io': 'initlab',
    'colibri.initlab.org': 'colibri',
}

type VariantConfig = {
    dashboard: () => ReactNode,
    navbar: any,
    logo: {url: string, alt: string},
    title: string,
}

export const variants: {[variant: string]: VariantConfig} = {
    'initlab': {
        dashboard: InitLabDashboard,
        navbar: {bg: 'primary', variant: 'dark',},
        logo: {url: initlabLogo, alt: 'init Lab logo',},
        title: 'init Lab Space',
    },
    'colibri': {
        dashboard: ColibriDashboard,
        navbar: {bg: 'light',},
        logo: {url: colibriLogo, alt: 'colibri logo',},
        title: 'Casa Libri',
    },
}

export const grafana = {
    dashboard: {id: 'SGAb0ZXMk', name: 'temperature-and-humidity',},
    panels: [4, 5, 10],
};
