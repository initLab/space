import { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import { pkce } from '../oauth.js';

const Login = () => {
    const flag = useRef(false);

    useEffect(() => {
        if (flag.current) {
            return;
        }

        flag.current = true;

        location.replace(pkce.authorizeUrl());
    }, []);

    return (<Row>
        <Col className="text-center">
            <LoadingIcon large />
        </Col>
    </Row>);
};

export default Login;
