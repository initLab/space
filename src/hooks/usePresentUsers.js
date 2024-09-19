import useSWR from 'swr';
import { fetcher } from '../utils/swr.js';

export function usePresentUsers(config) {
    return useSWR(import.meta.env.PRESENCE_URL.concat('api/users/present'), fetcher, config);
}
