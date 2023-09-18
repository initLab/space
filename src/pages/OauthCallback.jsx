import { useEffect, useRef, useState } from 'react';
import { exchangeForAccessToken } from '../oauth.js';
import { useAuthStorage } from '../hooks/useAuthStorage.js';
import { Col, Row } from 'react-bootstrap';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import { useRememberPage } from '../hooks/useRememberPage.js';

const OauthCallback = () => {
    const flag = useRef(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { updateTokens } = useAuthStorage();
    const { navigateToPreviousPath } = useRememberPage();

    useEffect(() => {
        if (flag.current) {
            return;
        }

        flag.current = true;

        (async () => {
            const tokenResponse = await exchangeForAccessToken();

            try {
                updateTokens(tokenResponse);
                navigateToPreviousPath();
            }
            catch (e) {
                setErrorMessage(e.message);
            }
        })();
    }, [navigateToPreviousPath, updateTokens]);

    return (errorMessage || <Row>
        <Col className="text-center">
            <LoadingIcon large />
        </Col>
    </Row>);
};

export default OauthCallback;
