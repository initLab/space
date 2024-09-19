import { getDoorActions } from '../utils/device.js';
import Devices from './Devices.jsx';

const Doors = () => {
    return (<Devices deviceType="door" deviceActionMapper={getDoorActions} />);
};

export default Doors;
