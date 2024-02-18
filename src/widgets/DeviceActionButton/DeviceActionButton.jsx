import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './DeviceActionButton.scss';
import { useDeviceActionMutation } from '../../features/apiSlice.js';
import RedirectToLogin from '../RedirectToLogin.jsx';
import { sleep } from '../../utils/time.js';

const types = {
    open: {
        variant: 'success',
        icon: 'fa-solid fa-right-to-bracket',
    },
    open_alternative: {
        variant: 'success',
        icon: 'fa-solid fa-right-to-bracket',
    },
    lock: {
        variant: 'danger',
        icon: 'fa-solid fa-lock',
    },
    unlock: {
        variant: 'info',
        icon: 'fa-solid fa-lock-open',
    },
    turn_on: {
        variant: 'success',
        icon: 'fa-solid fa-lightbulb',
    },
    turn_off: {
        variant: 'danger',
        icon: 'fa-regular fa-lightbulb',
    },
};
const DeviceActionButton = ({
    deviceId,
    action,
    busyActionId,
    setBusyActionId,
    isDoorOpen,
}) => {
    const actionId = deviceId + '/' + action;
    const loading = actionId === busyActionId;
    const disabled = typeof busyActionId === 'string';

    const [ execute, {
        isError,
        error,
    } ] = useDeviceActionMutation();

    const {t} = useTranslation();
    const type = types?.[action] || {
        variant: '',
        icon: '',
    };

    async function handleClick() {
        setBusyActionId && setBusyActionId(actionId);

        await execute({
            deviceId,
            action,
        });

        if (setBusyActionId) {
            await sleep(3000);
            setBusyActionId(null);
        }
    }

    const variant = isDoorOpen ? 'warning' : type.variant;
    const icon = (isDoorOpen ? 'fa-solid fa-door-open' : type.icon) + (loading ? ' fa-fade' : '');
    const label = t(isDoorOpen ? 'views.door.open' : 'views.devices.' + action);

    return (<>
        <Button variant={variant} className="device-action-button" onClick={handleClick} disabled={disabled}>
            <i className={icon} />
            <div>{label}</div>
        </Button>
        {isError && [401, 403].includes(error.status) && <RedirectToLogin />}
    </>);
};

DeviceActionButton.defaultProps = {
    isDoorOpen: false,
};

export default DeviceActionButton;
