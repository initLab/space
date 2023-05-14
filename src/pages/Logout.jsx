import { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import { logout } from '../authStorage.js';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const flag = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (flag.current) {
            return;
        }

        flag.current = true;

        (async () => {
            await logout();
            navigate('/');
        })();
    }, []);

    return (<Row>
        <Col className="text-center">
            <LoadingIcon large/>
        </Col>
    </Row>);
};

export default Logout;
