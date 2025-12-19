import useSWR, {type Fetcher, type SWRConfiguration} from 'swr';
import {authenticatedFetcher, fetcher} from '../utils/swr.js';
import {useAuthStorage} from './useAuthStorage.ts';
import type {FaunaPresentUser, FaunaUser} from "../fauna-types";
import type {PortierActionLogEntry, PortierDevice, RawMqttReading} from "../portier-types";

function useAuthSWR<TResult>(key: URL | string, config?: SWRConfiguration) {
    const {accessToken} = useAuthStorage();
    const hasAccessToken = !!accessToken;

    const path = hasAccessToken ? key : null;

    return useSWR(path, authenticatedFetcher as Fetcher<TResult>, config);
}

function useCheckSWR<TResult>(key: URL | string, config?: SWRConfiguration) {
    return useSWR(key, fetcher as Fetcher<TResult>, config);
}

export function useDevices(config?: SWRConfiguration) {
    return useAuthSWR<PortierDevice[]>(import.meta.env.PORTIER_URL.concat('api/devices'), config);
}

export function useCurrentUser(config?: SWRConfiguration) {
    return useAuthSWR<FaunaUser>(import.meta.env.OIDC_AUTHORITY_URL.concat('api/current_user'), config);
}

export function usePresentUsers(config?: SWRConfiguration) {
    return useCheckSWR<FaunaPresentUser[]>(import.meta.env.PRESENCE_URL.concat('api/users/present'), config);
}

export function useMqttStatus(config?: SWRConfiguration) {
    return useCheckSWR<{ [topic: string]: RawMqttReading }>(import.meta.env.MQTT_PROXY_URL.concat('status'), config);
}

export function useActionLog(config?: SWRConfiguration) {
    return useAuthSWR<PortierActionLogEntry[]>(import.meta.env.PORTIER_URL.concat('api/actionLog/0/0'), config);
}
