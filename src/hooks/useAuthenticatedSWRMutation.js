import useSWRMutation from 'swr/mutation';
import { authenticatedFetcher } from '../utils/swr.js';
import { useAuth } from 'react-oidc-context';

export function useAuthenticatedSWRMutation(key, config = {}) {
    const auth = useAuth();
    const token = auth.user?.access_token;

    return useSWRMutation([key, token, {
        method: 'POST',
    }], authenticatedFetcher, config);
}
