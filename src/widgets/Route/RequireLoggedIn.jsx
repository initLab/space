import { useCurrentUser } from '../../hooks/useCurrentUser.js';
import LoadingIcon from '../icons/LoadingIcon.jsx';
import RedirectToLogin from '../RedirectToLogin.jsx';

export function RequireLoggedIn({
    children,
}) {
    const {
        isLoading,
        isError,
        isLoggedIn,
    } = useCurrentUser();

    if (isLoading) {
        return (<LoadingIcon large />);
    }

    if (isError) {
        return (<RedirectToLogin />);
    }

    if (!isLoggedIn) {
        return (<RedirectToLogin />);
    }

    return children;
}
