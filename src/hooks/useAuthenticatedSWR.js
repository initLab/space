import useSWR from 'swr';
import { authenticatedFetcher } from '../utils/swr.js';
import { useAuth } from 'react-oidc-context';

export function useAuthenticatedSWR(key, config) {
    const auth = useAuth();
    const token = auth.isAuthenticated ? auth.user?.access_token : null;

    return useSWR(token ? key : null, authenticatedFetcher(token), config);
}
