import { getDoorActions } from '../utils/device.js';
import Devices from './Devices.jsx';
import { withAuthenticationRequired } from 'react-oidc-context';

const Doors = () => {
    return (<Devices deviceType="door" deviceActionMapper={getDoorActions} />);
};

const AuthenticatedDoors = withAuthenticationRequired(Doors);

export default AuthenticatedDoors;
