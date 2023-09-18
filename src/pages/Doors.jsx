import { Card, Col, Row } from 'react-bootstrap';
import React, { useCallback, useMemo } from 'react';
import { useGetDoorsQuery } from '../features/apiSlice.js';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import DoorButton from '../widgets/DoorButton/DoorButton.jsx';
import { useSelector } from 'react-redux';
import { doorLockStatusSelector } from '../features/doorSlice.js';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../widgets/ErrorMessage.jsx';
import { useVariant } from '../hooks/useVariant.js';
import { useAuthStorage } from '../hooks/useAuthStorage.js';
import RedirectToLogin from '../widgets/RedirectToLogin.jsx';

const Doors = () => {
    const { t } = useTranslation();
    const { accessToken } = useAuthStorage();
    const isLoggedIn = !!accessToken;

    const {
        data: doors,
        error,
        isLoading,
        isSuccess,
        isError,
    } = useGetDoorsQuery({
        skip: !isLoggedIn,
    });

    const availableDoors = useMemo(
        () => isSuccess ? doors.filter(door => door.supported_actions.length > 0) : [],
        [doors, isSuccess],
    );

    // TODO: get this from the backend
    const monitoredDoor = 'back_door';
    const doorStatus = useSelector(doorLockStatusSelector());

    const getDoorActions = useCallback(door => {
        const actions = door.supported_actions;

        if (door.id !== monitoredDoor) {
            return actions;
        }

        if (doorStatus === 'unlocked') {
            return actions.filter(action => action !== 'unlock');
        }

        if (doorStatus === 'locked') {
            return actions.filter(action => ['open', 'lock'].indexOf(action) === -1);
        }

        return [];
    }, [monitoredDoor, doorStatus]);

    const variant = useVariant();
    const isInitLab = variant === 'initlab';

    if (!isLoggedIn) {
        return (<RedirectToLogin />);
    }

    return (<Row className="row-cols row-cols-1 gap-4">
        {isLoading && <Col className="text-center">
            <LoadingIcon large />
        </Col>}
        {isSuccess && <>
            {availableDoors.length > 0 ? availableDoors.map(door => {
                const doorActions = getDoorActions(door);

                return (<Col key={door.id}>
                    <Card>
                        <Card.Header className={'text-start' + (isInitLab ? ' bg-primary text-light' : '')}>{door.name}</Card.Header>
                        <Card.Body
                            className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4">
                            {doorActions.map(action => <DoorButton key={action} doorId={door.id} action={action} />)}
                            {door.id === monitoredDoor && doorStatus === 'busy' && <LoadingIcon large />}
                        </Card.Body>
                    </Card>
                </Col>);
            }) : <Col>
                <Card>
                    <Card.Body className="d-flex flex-column flex-lg-row gap-4">{t('views.doors.no_access')}</Card.Body>
                </Card>
            </Col>}
        </>}
        {isError && ([401, 403].includes(error.status) ? <RedirectToLogin /> : <ErrorMessage error={error} />)}
    </Row>);
};

export default Doors;
