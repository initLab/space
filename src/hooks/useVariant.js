export function useVariant() {
    // eslint-disable-next-line no-restricted-globals
    switch (location.hostname) {
        case 'space.initlab.org':
        case 'initlab.github.io':
            return 'initlab';
        case 'colibri.initlab.org':
            return 'colibri';
        default:
            // fallthrough to query param and local storage
    }

    // eslint-disable-next-line no-restricted-globals
    const queryParam = (new URLSearchParams(location.search)).get('variant');

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
