import { Navigate, useLocation } from 'react-router-dom';

const RedirectToLogin = () => {
    const location = useLocation();

    return (<Navigate to="/login" state={{
        from: location,
    }} />);
};

export default RedirectToLogin;
