import { useAuthenticatedSWRMutation } from './useAuthenticatedSWRMutation.js';

export default function useDeviceAction(deviceId, action) {
    const url = `${import.meta.env.PORTIER_URL}api/device/${deviceId}/${action}`;

    return useAuthenticatedSWRMutation(url);
}
