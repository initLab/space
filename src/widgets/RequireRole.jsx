import { useAuth } from 'react-oidc-context';
import PropTypes from 'prop-types';

const RequireRole = ({
    children,
    roles,
}) => {
    const auth = useAuth();

    if (!auth.isAuthenticated) {
        return null;
    }

    const userRoles = Object.keys(auth.user.profile?.['urn:zitadel:iam:org:project:roles'] ?? {});

    const searchRoles = typeof roles === 'string' ? [roles] : Array.from(roles);
    const isAllowed = userRoles.some(userRole => searchRoles.includes(userRole));

    return isAllowed ? children : null;
};

RequireRole.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default RequireRole;
