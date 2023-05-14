import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { pkce } from '../oauth.js';
import { setTokens } from '../authStorage.js';
import { Col, Row } from 'react-bootstrap';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';

const OauthCallback = () => {
    const flag = useRef(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (flag.current) {
            return;
        }

        flag.current = true;

        (async () => {
            const tokenResponse = await pkce.exchangeForAccessToken(window.location.href);

            try {
                setTokens(tokenResponse);

                navigate('/', {
                    replace: true,
                });
            }
            catch (e) {
                setErrorMessage(e.message);
            }
        })();
    }, [navigate]);

    return (errorMessage || <Row>
        <Col className="text-center">
            <LoadingIcon large />
        </Col>
    </Row>);
};

export default OauthCallback;
