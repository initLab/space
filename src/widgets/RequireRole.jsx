import { useCurrentUser } from '../hooks/useCurrentUser.js';
import PropTypes from 'prop-types';

const RequireRole = ({
    children,
    roles,
}) => {
    const {
        user,
    } = useCurrentUser();

    const searchRoles = typeof roles === 'string' ? [roles] : Array.from(roles);
    const isAllowed = (user?.roles || []).some(userRole => searchRoles.includes(userRole));

    return isAllowed ? children : null;
};

RequireRole.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default RequireRole;
