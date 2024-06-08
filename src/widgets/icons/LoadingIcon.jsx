import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const LoadingIcon = ({
    large = false,
}) => {
    return (
        <Spinner size={large ? null : 'sm'} />
    );
};

LoadingIcon.propTypes = {
    large: PropTypes.bool,
};

export default LoadingIcon;
