import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useCurrentUser } from '../../hooks/useCurrentUser.js';
import LoadingIcon from '../icons/LoadingIcon.jsx';
import RedirectToLogin from '../RedirectToLogin.jsx';

const RequireLoggedIn = ({
    children,
}) => {
    const {
        isLoading,
        isError,
        isLoggedIn,
    } = useCurrentUser();

    if (isLoading) {
        return (<Row className="row-cols row-cols-1">
            <Col className="text-center">
                <LoadingIcon large />
            </Col>
        </Row>);
    }

    if (isError) {
        return (<RedirectToLogin />);
    }

    if (!isLoggedIn) {
        return (<RedirectToLogin />);
    }

    return children;
};

RequireLoggedIn.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RequireLoggedIn;
