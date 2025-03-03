import { useAuthenticatedSWR } from './useAuthenticatedSWR.js';

export default function useDeviceAction(deviceId, action) {
    const url = import.meta.env.PORTIER_URL.concat('api/device/').concat(deviceId).concat('/').concat(action);

    return useAuthenticatedSWR(url, {
        method: 'POST',
    });
}
