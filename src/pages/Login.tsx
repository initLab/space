import {useEffect, useRef} from 'react';
import {Col, Row} from 'react-bootstrap';

import LoadingIcon from '../widgets/LoadingIcon.tsx';
import {authorizeUrl} from '../oauth.ts';
import {useRememberPage} from '../hooks/useRememberPage.ts';

const Login = () => {
    const flag = useRef(false);
    const {storePreviousPath} = useRememberPage();

    useEffect(() => {
        if (flag.current) return;
        flag.current = true;

        storePreviousPath();
        window.location.replace(authorizeUrl());
    }, [storePreviousPath]);

    return (<Row>
        <Col className="text-center">
            <LoadingIcon large/>
        </Col>
    </Row>);
};

export default Login;
