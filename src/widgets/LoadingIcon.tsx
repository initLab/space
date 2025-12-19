import {Spinner} from 'react-bootstrap';

const LoadingIcon = ({large = false,}: { large?: boolean }) =>
    <Spinner size={large ? undefined : 'sm'}/>;

export default LoadingIcon;
