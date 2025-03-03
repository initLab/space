import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useDeviceAction from '../../hooks/useDeviceAction.js';
import { sleep } from '../../utils/time.js';

import './DeviceActionButton.scss';

const types = {
    door: {
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
    },
    light: {
        turn_off: {
            variant: 'danger',
            icon: 'fa-regular fa-lightbulb',
        },
        turn_on: {
            variant: 'success',
            icon: 'fa-solid fa-lightbulb',
        },
    },
    hvac: {
        turn_off: {
            variant: 'secondary',
            icon: 'fa-solid fa-power-off',
        },
        turn_on_cooling: {
            variant: 'primary',
            icon: 'fa-solid fa-snowflake',
        },
        turn_on_heating: {
            variant: 'danger',
            icon: 'fa-solid fa-sun',
        },
    },
};
const DeviceActionButton = ({
    device,
    action,
    isDoorOpen = false,
}) => {
    const [ disabled, setDisabled ] = useState(false);

    const {
        trigger,
    } = useDeviceAction(device.id, action);

    const {t} = useTranslation();
    const type = types?.[device.type]?.[action] || {
        variant: '',
        icon: '',
    };

    async function handleClick() {
        setDisabled(true);
        await trigger();
        await sleep(3000);
        setDisabled(false);
    }

    const variant = isDoorOpen ? 'warning' : type.variant;
    const icon = (isDoorOpen ? 'fa-solid fa-door-open' : type.icon);
    const label = t(isDoorOpen ? 'views.door.open' : 'views.devices.' + action);

    return (<>
        <Button variant={variant} className="device-action-button" onClick={handleClick} disabled={disabled}>
            <i className={icon} />
            <div>{label}</div>
        </Button>
    </>);
};

DeviceActionButton.propTypes = {
    device: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    action: PropTypes.string.isRequired,
    isDoorOpen: PropTypes.bool,
};

export default DeviceActionButton;
