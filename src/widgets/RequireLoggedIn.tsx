import {Col, Row} from 'react-bootstrap';

import {useCurrentUser} from '../hooks/useEndpoints.ts';
import LoadingIcon from './LoadingIcon.tsx';
import RedirectToLogin from './RedirectToLogin.tsx';
import type {ReactNode} from "react";

const RequireLoggedIn = ({children} : {children: ReactNode}) => {
    const {data: user, isLoading} = useCurrentUser();

    if (isLoading) return <Row className="row-cols row-cols-1">
        <Col className="text-center">
            <LoadingIcon large/>
        </Col>
    </Row>;

    if (!user) return <RedirectToLogin/>;

    return children;
};

export default RequireLoggedIn;
