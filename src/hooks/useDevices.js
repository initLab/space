import { useAuthenticatedSWR } from './useAuthenticatedSWR.js';

export function useDevices(config = {}) {
    return useAuthenticatedSWR(`${import.meta.env.PORTIER_URL}api/devices`, config);
}
