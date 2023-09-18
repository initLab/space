import { useLocation, useNavigate } from 'react-router-dom';

const STATE_KEY = 'from';
const STORAGE_KEY = 'redirectAfterLogin';

export function useRememberPage() {
    const location = useLocation();
    const navigate = useNavigate();

    function getPreviousPath() {
        return location.state?.[STATE_KEY]?.pathname;
    }

    function storePreviousPath() {
        const previousPath = getPreviousPath();

        if (previousPath) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                path: previousPath,
                expiresAt: Date.now() + 30 * 60 * 1000,
            }));
        }
        else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    function navigateToPreviousPath(returnPath = '/') {
        const redirectInfo = localStorage.getItem(STORAGE_KEY);

        if (redirectInfo) {
            const {
                path,
                expiresAt,
            } = JSON.parse(redirectInfo);

            if (expiresAt > Date.now()) {
                returnPath = path;
            }

            localStorage.removeItem(STORAGE_KEY);
        }

        navigate(returnPath, {
            replace: true,
        });
    }

    return {
        getPreviousPath,
        storePreviousPath,
        navigateToPreviousPath,
    };
}
