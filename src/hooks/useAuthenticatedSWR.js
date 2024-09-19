import useSWR from 'swr';
import { authenticatedFetcher } from '../utils/swr.js';
import { useAuthStorage } from './useAuthStorage.js';

export function useAuthenticatedSWR(key, config) {
    const { accessToken } = useAuthStorage();
    const hasAccessToken = !!accessToken;

    return useSWR(hasAccessToken ? key : null, authenticatedFetcher, config);
}
