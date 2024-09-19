import { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';

import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import { authorizeUrl } from '../oauth.js';
import { useRememberPage } from '../hooks/useRememberPage.js';

const Login = () => {
    const flag = useRef(false);
    const { storePreviousPath } = useRememberPage();

    useEffect(() => {
        if (flag.current) {
            return;
        }

        flag.current = true;

        storePreviousPath();
        window.location.replace(authorizeUrl());
    }, [storePreviousPath]);

    return (<Row>
        <Col className="text-center">
            <LoadingIcon large />
        </Col>
    </Row>);
};

export default Login;
