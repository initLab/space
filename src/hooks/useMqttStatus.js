import useSWR from 'swr';
import { fetcher } from '../utils/swr.js';

export function useMqttStatus(config) {
    return useSWR(import.meta.env.MQTT_PROXY_URL.concat('status'), fetcher, config);
}
