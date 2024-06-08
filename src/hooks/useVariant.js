export function useVariant() {
    switch (window.location.hostname) {
        case 'space.initlab.org':
        case 'initlab.github.io':
            return 'initlab';
        case 'colibri.initlab.org':
            return 'colibri';
        default:
            // fallthrough to query param and local storage
    }

    const queryParam = (new URLSearchParams(window.location.search)).get('variant');

    if (queryParam) {
        return queryParam;
    }

    const lsParam = localStorage.getItem('variant');

    if (lsParam) {
        return lsParam;
    }

    // local development without any overrides
    return 'initlab';
}
