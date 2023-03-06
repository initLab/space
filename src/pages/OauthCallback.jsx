import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { pkce, scopes } from '../oauth.js';
import { setAuth } from '../authStorage.js';
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

            if (tokenResponse.hasOwnProperty('error') && tokenResponse.hasOwnProperty('error_description')) {
                setErrorMessage(tokenResponse.error_description);
            }
            else {
                if (
                    tokenResponse.hasOwnProperty('access_token') &&
                    tokenResponse.hasOwnProperty('created_at') &&
                    tokenResponse.hasOwnProperty('expires_in') &&
                    tokenResponse.hasOwnProperty('refresh_token') &&
                    tokenResponse.hasOwnProperty('scope') &&
                    tokenResponse.hasOwnProperty('token_type') &&
                    tokenResponse.token_type === 'Bearer' &&
                    tokenResponse.scope === scopes
                ) {
                    setAuth(
                        tokenResponse.access_token,
                        tokenResponse.created_at + tokenResponse.expires_in,
                        tokenResponse.refresh_token,
                    );
                }

                navigate('/', {
                    replace: true,
                });
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
