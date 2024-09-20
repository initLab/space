import { useAuthenticatedSWR } from './useAuthenticatedSWR.js';

export function useDevices() {
    return useAuthenticatedSWR(import.meta.env.PORTIER_URL.concat('api/devices'));
}
