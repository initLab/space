import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './DeviceActionButton.scss';
import { useDeviceActionMutation } from '../../features/apiSlice.js';
import RedirectToLogin from '../RedirectToLogin.jsx';

const types = {
    open: {
        variant: 'success',
        icon: 'fa-solid fa-right-to-bracket',
    },
    open_alternative: {
        variant: '',
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
};
const DeviceActionButton = ({
    deviceId,
    action,
}) => {
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
        return execute({
            deviceId,
            action,
        });
    }

    return (<>
        <Button variant={type.variant} className="device-action-button" onClick={handleClick}>
            <i className={type.icon} />
            <div>{t('views.devices.' + action)}</div>
        </Button>
        {isError && [401, 403].includes(error.status) && <RedirectToLogin />}
    </>);
};

export default DeviceActionButton;
