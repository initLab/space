type TError = {
    status: string,
    error: string,
};

const ErrorMessage = ({error,}: { error: TError }) => {
    return <>
        <strong>{error.status}</strong>{' '}
        <span>{error.error}</span>
    </>;
};

export default ErrorMessage;
