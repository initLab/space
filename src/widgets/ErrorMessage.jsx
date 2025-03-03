import PropTypes from 'prop-types';

const ErrorMessage = ({
    error,
}) => {
    return (<span>
        {error.__proto__.name}: <strong>{error.message}</strong>
    </span>);
};

ErrorMessage.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }).isRequired,
};

export default ErrorMessage;
