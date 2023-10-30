import React from 'react';
import { getLightActions } from '../utils/device.js';
import Devices from './Devices.jsx';

const Lights = () => {
    return (<Devices deviceType="light" deviceActionMapper={getLightActions} />);
};

export default Lights;
