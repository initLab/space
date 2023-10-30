import { Card, Col, Row } from 'react-bootstrap';
import React, { useMemo } from 'react';
import { useGetDevicesQuery } from '../features/apiSlice.js';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import DeviceActionButton from '../widgets/DeviceActionButton/DeviceActionButton.jsx';
import { getDoorActions } from '../utils/device.js';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../widgets/ErrorMessage.jsx';
import { useVariant } from '../hooks/useVariant.js';

const Doors = () => {
    const { t } = useTranslation();
    const {
        data: devices,
        error,
        isLoading,
        isSuccess,
        isError,
    } = useGetDevicesQuery();

    const doors = useMemo(() =>
        isSuccess ? devices.filter(device => device.type === 'door') : [], [devices, isSuccess]);

    const variant = useVariant();
    const isInitLab = variant === 'initlab';

    return (<Row className="row-cols row-cols-1 gap-4">
        {isLoading && <Col className="text-center">
            <LoadingIcon large />
        </Col>}
        {isSuccess && <>
            {doors.length > 0 ? doors.map(door => {
                const doorActions = getDoorActions(door);

                return (<Col key={door.id}>
                    <Card>
                        <Card.Header className={'text-start' + (isInitLab ? ' bg-primary text-light' : '')}>{door.name}</Card.Header>
                        <Card.Body
                            className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4">
                            {doorActions.map(action => <DeviceActionButton key={action} deviceId={door.id} action={action} />)}
                            {doorActions.length === 0 && <LoadingIcon large />}
                        </Card.Body>
                    </Card>
                </Col>);
            }) : <Col>
                <Card>
                    <Card.Body className="d-flex flex-column flex-lg-row gap-4">{t('views.doors.no_access')}</Card.Body>
                </Card>
            </Col>}
        </>}
        {isError && <Col>
            <ErrorMessage error={error} />
        </Col>}
    </Row>);
};

export default Doors;
