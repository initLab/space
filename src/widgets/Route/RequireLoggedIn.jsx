import { useCurrentUser } from '../../hooks/useCurrentUser.js';
import LoadingIcon from '../icons/LoadingIcon.jsx';
import RedirectToLogin from '../RedirectToLogin.jsx';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

export function RequireLoggedIn({
    children,
}) {
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
}
