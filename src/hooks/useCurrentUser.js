import { useAuthStorage } from './useAuthStorage.js';
import { useGetCurrentUserQuery } from '../features/apiSlice.js';

export function useCurrentUser() {
    const { accessToken } = useAuthStorage();
    const hasAccessToken = !!accessToken;
    const queryResult = useGetCurrentUserQuery(undefined, {
        skip: !hasAccessToken,
    });
    const user = queryResult.isSuccess ? queryResult.data : {};

    return {
        hasAccessToken,
        user,
        isLoggedIn: user.hasOwnProperty('id'),
        ...queryResult,
    };
}
