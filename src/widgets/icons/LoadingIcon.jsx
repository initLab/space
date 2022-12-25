import React from 'react';
import PropTypes from "prop-types";
import {Spinner} from "react-bootstrap";

const LoadingIcon = ({
    large,
}) => {
    return (
        <Spinner size={large ? null : 'sm'} />
    );
};

LoadingIcon.defaultProps = {
    large: false,
};

LoadingIcon.propTypes = {
    large: PropTypes.bool,
};

export default LoadingIcon;
