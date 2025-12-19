import {authenticatedFetcher} from '../utils/swr.js';
import type {SpaceError} from "../portier-types";

export default function useDeviceAction(deviceId: string, action: string) :
    {execute: () => Promise<any>, error: SpaceError | null} {
    const url = import.meta.env.PORTIER_URL.concat('api/device/').concat(deviceId).concat('/').concat(action);
    let error : {status: string} | null = null;

    const execute = async () => {
        try {
            return await authenticatedFetcher(url, {method: 'POST',});
        } catch (e: any) {
            error = {status: e.status,};
        }
    }

    return {execute, error};
}
