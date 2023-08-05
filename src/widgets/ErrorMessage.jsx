const ErrorMessage = ({
    error,
}) => {
    return (<>
        <strong>{error.status}</strong>{' '}
        <span>{error.error}</span>
    </>);
};

export default ErrorMessage;
