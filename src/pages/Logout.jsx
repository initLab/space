import {Navigate} from "react-router-dom";
import {useEffect} from "react";
import {clearAuth} from "../authStorage.js";

const Logout = () => {
    useEffect(() => {
        clearAuth();
    }, []);

    return (<Navigate replace to="/" />);
};

export default Logout;
