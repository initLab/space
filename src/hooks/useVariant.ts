import {variants, variantHosts} from '../config.ts';


export function useVariantName() {
    const queryParam = (new URLSearchParams(window.location.search)).get('variant');
    const lsParam = localStorage.getItem('variant');

    return queryParam ?? lsParam ?? variantHosts[window.location.hostname] ?? 'initlab';
}

export function useVariant() {
    return variants[useVariantName()];
}
