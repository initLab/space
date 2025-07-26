import { getDoorActions } from '../utils/device.js';
import Devices from './Devices.jsx';

const Doors = () => {
    return (<Devices deviceGroup="door" deviceActionMapper={getDoorActions} />);
};

export default Doors;
