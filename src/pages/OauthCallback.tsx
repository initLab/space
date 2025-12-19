import {useEffect, useRef, useState} from 'react';
import {Col, Row} from 'react-bootstrap';

import {exchangeForAccessToken} from '../oauth.ts';
import {useAuthStorage} from '../hooks/useAuthStorage.ts';
import LoadingIcon from '../widgets/LoadingIcon.tsx';
import {useRememberPage} from '../hooks/useRememberPage.ts';

const OauthCallback = () => {
    const flag = useRef(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const {updateTokens} = useAuthStorage();
    const {navigateToPreviousPath} = useRememberPage();

    useEffect(() => {
        if (flag.current) return;
        flag.current = true;

        (async () => {
            const tokenResponse = await exchangeForAccessToken();

            try {
                updateTokens(tokenResponse);
                navigateToPreviousPath();
            } catch (e: any) {
                setErrorMessage(e.message);
            }
        })();
    }, [navigateToPreviousPath, updateTokens]);

    return (errorMessage || <Row>
        <Col className="text-center">
            <LoadingIcon large/>
        </Col>
    </Row>);
};

export default OauthCallback;
