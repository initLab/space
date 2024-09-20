import { useAuthenticatedSWR } from './useAuthenticatedSWR.js';

export function useCurrentUser(config) {
    return useAuthenticatedSWR(import.meta.env.OIDC_AUTHORITY_URL.concat('api/current_user'), config);
}
