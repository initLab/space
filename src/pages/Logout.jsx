import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { clearTokens } from '../authStorage.js';

const Logout = () => {
    useEffect(() => {
        clearTokens();
    }, []);

    return (<Navigate replace to="/" />);
};

export default Logout;
