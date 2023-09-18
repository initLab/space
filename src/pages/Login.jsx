import { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import { authorizeUrl } from '../oauth.js';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const flag = useRef(false);
    const location = useLocation();
    const previousPath = location.state?.from?.pathname;

    useEffect(() => {
        if (flag.current) {
            return;
        }

        flag.current = true;

        if (previousPath) {
            localStorage.setItem('redirectAfterLogin', JSON.stringify({
                path: previousPath,
                expiresAt: Date.now() + 30 * 60 * 1000,
            }));
        }
        else {
            localStorage.removeItem('redirectAfterLogin');
        }

        window.location.replace(authorizeUrl());
    }, [previousPath]);

    return (<Row>
        <Col className="text-center">
            <LoadingIcon large />
        </Col>
    </Row>);
};

export default Login;
