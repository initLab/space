import { getHvacActions } from '../utils/device.js';
import Devices from './Devices.jsx';

const Hvac = () => {
    return (<Devices deviceGroup="hvac" deviceActionMapper={getHvacActions} />);
};

export default Hvac;
