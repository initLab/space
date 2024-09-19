import PropTypes from 'prop-types';

const ErrorMessage = ({
    error,
}) => {
    return (<>
        <strong>{error.status}</strong>{' '}
        <span>{error.error}</span>
    </>);
};

ErrorMessage.propTypes = {
    error: PropTypes.shape({
        status: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
    }).isRequired,
};

export default ErrorMessage;
