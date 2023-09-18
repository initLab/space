import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { exchangeForAccessToken } from '../oauth.js';
import { useAuthStorage } from '../hooks/useAuthStorage.js';
import { Col, Row } from 'react-bootstrap';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';

const OauthCallback = () => {
    const flag = useRef(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { updateTokens } = useAuthStorage();

    useEffect(() => {
        if (flag.current) {
            return;
        }

        flag.current = true;

        (async () => {
            const tokenResponse = await exchangeForAccessToken();

            try {
                updateTokens(tokenResponse);

                let returnPath = '/';
                const redirectInfo = localStorage.getItem('redirectAfterLogin');

                if (redirectInfo) {
                    const {
                        path,
                        expiresAt,
                    } = JSON.parse(redirectInfo);

                    if (expiresAt > Date.now()) {
                        returnPath = path;
                    }

                    localStorage.removeItem('redirectAfterLogin');
                }

                navigate(returnPath, {
                    replace: true,
                });
            }
            catch (e) {
                setErrorMessage(e.message);
            }
        })();
    }, [navigate, updateTokens]);

    return (errorMessage || <Row>
        <Col className="text-center">
            <LoadingIcon large />
        </Col>
    </Row>);
};

export default OauthCallback;
