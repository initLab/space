import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './DoorButton.scss';

const types = {
    open: {
        variant: 'success',
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
    action,
    onClick,
}) => {
    const {t} = useTranslation();
    const type = types[action];

    return (<Button variant={type.variant} className="door-button" onClick={onClick}>
        <i className={type.icon} />
        <div>{t('views.doors.' + action)}</div>
    </Button>);
};

export default DoorButton;
