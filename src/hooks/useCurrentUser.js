import { useAuthenticatedSWR } from './useAuthenticatedSWR.js';

export function useCurrentUser() {
    return useAuthenticatedSWR(import.meta.env.OIDC_AUTHORITY_URL.concat('api/current_user'));
}
