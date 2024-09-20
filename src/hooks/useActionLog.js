import { useAuthenticatedSWR } from './useAuthenticatedSWR.js';

export function useActionLog() {
    return useAuthenticatedSWR(import.meta.env.PORTIER_URL.concat('api/actionLog/0/0'));
}
