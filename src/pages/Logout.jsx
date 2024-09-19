import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import { getAccessToken, getRefreshToken, useAuthStorage } from '../hooks/useAuthStorage.js';
import { useRememberPage } from '../hooks/useRememberPage.js';
import { revokeToken } from '../oauth.js';

const Logout = () => {
    const flag = useRef(false);
    const navigate = useNavigate();
    const { clearTokens } = useAuthStorage();
    const { getPreviousPath } = useRememberPage();

    useEffect(() => {
        if (flag.current) {
            return;
        }

        flag.current = true;

        (async () => {
            await revokeToken(getRefreshToken());
            await revokeToken(getAccessToken());
            clearTokens();
            navigate(getPreviousPath() || '/', {
                replace: true,
            });
        })();
    }, [clearTokens, getPreviousPath, navigate]);

    return (<Row>
        <Col className="text-center">
            <LoadingIcon large/>
        </Col>
    </Row>);
};

export default Logout;
