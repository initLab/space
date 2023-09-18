import { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import { useAuthStorage } from '../hooks/useAuthStorage.js';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const flag = useRef(false);
    const navigate = useNavigate();
    const { clearTokens } = useAuthStorage();

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
            navigate('/');
        })();
    }, [clearTokens, navigate]);

    return (<Row>
        <Col className="text-center">
            <LoadingIcon large/>
        </Col>
    </Row>);
};

export default Logout;
