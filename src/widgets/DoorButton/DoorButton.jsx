import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './DoorButton.scss';
import { useDoorActionMutation } from '../../features/apiSlice.js';
import RedirectToLogin from '../RedirectToLogin.jsx';

const types = {
    open: {
        variant: 'success',
        icon: 'fa fa-sign-in',
    },
    open_alternative: {
        variant: '',
        icon: 'fa fa-sign-in',
    },
    lock: {
        variant: 'danger',
        icon: 'fa fa-lock',
    },
    unlock: {
        variant: 'info',
        icon: 'fa fa-unlock',
    },
};
const DoorButton = ({
    doorId,
    action,
}) => {
    const [ execute, {
        isError,
        error,
    } ] = useDoorActionMutation();

    const {t} = useTranslation();
    const type = types?.[action] || {
        variant: '',
        icon: '',
    };

    async function handleClick() {
        return execute({
            doorId,
            action,
        });
    }

    return (<>
        <Button variant={type.variant} className="door-button" onClick={handleClick}>
            <i className={type.icon} />
            <div>{t('views.doors.' + action)}</div>
        </Button>
        {isError && [401, 403].includes(error.status) && <RedirectToLogin />}
    </>);
};

export default DoorButton;
