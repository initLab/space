import { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import { useAuthStorage } from '../hooks/useAuthStorage.js';
import { useRememberPage } from '../hooks/useRememberPage.js';
import { useNavigate } from 'react-router-dom';

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
            // TODO
            // await revokeToken(getRefreshToken());
            // await revokeToken(getToken());
            await clearTokens();
            navigate(getPreviousPath, {
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
