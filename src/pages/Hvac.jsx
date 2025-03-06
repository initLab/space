import { getDeviceActions } from '../utils/device.js';
import Devices from './Devices.jsx';

const Hvac = () => {
    return (<Devices deviceType="hvac" deviceActionMapper={getDeviceActions} />);
};

export default Hvac;
