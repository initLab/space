import { useCurrentUser } from '../hooks/useCurrentUser.js';

const RequireRole = ({
    children,
    roles,
}) => {
    const {
        user,
    } = useCurrentUser();

    const searchRoles = typeof roles === 'string' ? [roles] : Array.from(roles);
    const isAllowed = (user.roles || []).some(userRole => searchRoles.includes(userRole));

    return isAllowed ? children : null;
};

export default RequireRole;
