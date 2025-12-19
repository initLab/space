import {useState} from 'react';
import {Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import useDeviceAction from '../../hooks/useDeviceAction.ts';
import RedirectToLogin from '../RedirectToLogin.tsx';

import './DeviceActionButton.scss';
import type {PortierDevice} from "../../portier-types";

const DEFAULT_ACTION = {variant: '', icon: ''};
const sleep = (delayMs: number) => new Promise(resolve => setTimeout(resolve, delayMs));

type EntityTypes = { [entity: string]: { [action: string]: { variant: string, icon: string } } };

const types: EntityTypes = {
    door: {
        open: {variant: 'success', icon: 'fa-solid fa-right-to-bracket',},
        open_alternative: {variant: 'success', icon: 'fa-solid fa-right-to-bracket',},
        lock: {variant: 'danger', icon: 'fa-solid fa-lock',},
        unlock: {variant: 'info', icon: 'fa-solid fa-lock-open',},
    },
    light: {
        turn_off: {variant: 'danger', icon: 'fa-regular fa-lightbulb',},
        turn_on: {variant: 'success', icon: 'fa-solid fa-lightbulb',},
    },
    fan: {
        turn_off: {variant: 'danger', icon: 'fa-solid fa-power-off',},
        turn_on: {variant: 'success', icon: 'fa-solid fa-fan',},
    },
    hvac: {
        turn_off: {variant: 'secondary', icon: 'fa-solid fa-power-off',},
        turn_on_cooling: {variant: 'primary', icon: 'fa-solid fa-snowflake',},
        turn_on_heating: {variant: 'danger', icon: 'fa-solid fa-sun',},
    },
};

const DeviceActionButton = (
    {device, action, isDoorOpen = false,}: { device: PortierDevice, action: string, isDoorOpen: boolean }) => {
    const [disabled, setDisabled] = useState(false);

    const {execute, error} = useDeviceAction(device.id, action);

    const {t} = useTranslation();
    const type = types?.[device.type]?.[action] || DEFAULT_ACTION

    async function handleClick() {
        setDisabled(true);
        await execute();
        await sleep(3000);
        setDisabled(false);
    }

    const variant = isDoorOpen ? 'warning' : type.variant;
    const icon = isDoorOpen ? 'fa-solid fa-door-open' : type.icon;
    const label = t(isDoorOpen ? 'views.door.open' : 'views.devices.' + action);

    return (<>
        <Button variant={variant} className="device-action-button" onClick={handleClick} disabled={disabled}>
            <i className={icon}/>
            <div>{label}</div>
        </Button>
        {error?.status && [401, 403].includes(error.status) && <RedirectToLogin/>}
    </>);
};

export default DeviceActionButton;
