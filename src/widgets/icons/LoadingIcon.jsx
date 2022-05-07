import React from 'react';
import PropTypes from "prop-types";

const LoadingIcon = ({
    large,
}) => {
    return (
        <i className={'fas fa-sync-alt fa-spin' + (large ? ' fa-2x' : '')} />
    );
};

LoadingIcon.defaultProps = {
    large: false,
};

LoadingIcon.propTypes = {
    large: PropTypes.bool,
};

export default LoadingIcon;
