import { getLightActions } from '../utils/device.js';
import Devices from './Devices.jsx';

const Lights = () => {
    return (<Devices deviceGroup="light" deviceActionMapper={getLightActions} />);
};

export default Lights;
