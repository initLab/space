import { authenticatedFetcher } from '../utils/swr.js';

export default function useDeviceAction(deviceId, action) {
    const url = import.meta.env.PORTIER_URL.concat('api/device/').concat(deviceId).concat('/').concat(action);
    let error = null;

    async function execute() {
        try {
            return await authenticatedFetcher(url, {
                method: 'POST',
            });
        }
        catch (e) {
            error = {
                status: e.status,
            };
        }
    }

    return {
        execute,
        error,
    };
}
