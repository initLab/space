import useSWR from 'swr';
import { authenticatedFetcher } from '../utils/swr.js';
import { useAuth } from 'react-oidc-context';

export function useAuthenticatedSWR(key, config = {}) {
    const auth = useAuth();
    const token = auth.user?.access_token;

    return useSWR([key, token], authenticatedFetcher, config);
}
