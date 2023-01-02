import {useEffect} from "react";
import {Col, Row} from "react-bootstrap";
import LoadingIcon from "../widgets/icons/LoadingIcon.jsx";

const Login = () => {
    useEffect(() => {
        location.replace(import.meta.env.VITE_BACKEND_URL + 'oauth/authorize?' + (new URLSearchParams({
            client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_OAUTH_CALLBACK_URL,
            response_type: 'token',
            scope: ['public', 'account_data_read', 'door_control'].join(' '),
        })).toString());
    }, []);

    return (<Row>
        <Col className="text-center">
            <LoadingIcon large />
        </Col>
    </Row>);
};

export default Login;
