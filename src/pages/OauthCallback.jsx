import {Navigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {setAuth} from "../authStorage.js";

const OauthCallback = () => {
    const { hash } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(hash.substr(1));

        if (
            params.get('token_type') === 'Bearer' &&
            params.has('access_token') &&
            params.has('expires_in')
        ) {
            setAuth(params.get('access_token'), parseInt(params.get('expires_in'), 10));
        }
    }, [hash]);

    return (<Navigate replace to="/" />);
};

export default OauthCallback;
