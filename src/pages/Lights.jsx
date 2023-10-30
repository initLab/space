import { Card, Col, Row } from 'react-bootstrap';
import React, { useMemo } from 'react';
import { useGetDevicesQuery } from '../features/apiSlice.js';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import DeviceActionButton from '../widgets/DeviceActionButton/DeviceActionButton.jsx';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../widgets/ErrorMessage.jsx';
import { useVariant } from '../hooks/useVariant.js';
import { getLightActions } from '../utils/device.js';

const Lights = () => {
    const { t } = useTranslation();
    const {
        data: devices,
        error,
        isLoading,
        isSuccess,
        isError,
    } = useGetDevicesQuery();

    const lights = useMemo(() => isSuccess ? devices.filter(device =>
        device.type === 'light'
    ) : [], [devices, isSuccess]);

    const variant = useVariant();
    const isInitLab = variant === 'initlab';

    return (<Row className="row-cols row-cols-1 gap-4">
        {isLoading && <Col className="text-center">
            <LoadingIcon large />
        </Col>}
        {isSuccess && <>
            {lights.length > 0 ? lights.map(light => {
                const lightActions = getLightActions(light);

                return (<Col key={light.id}>
                    <Card>
                        <Card.Header className={'text-start' + (isInitLab ? ' bg-primary text-light' : '')}>{light.name}</Card.Header>
                        <Card.Body
                            className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4">
                            {lightActions.map(action => <DeviceActionButton key={action} deviceId={light.id} action={action} />)}
                        </Card.Body>
                    </Card>
                </Col>);
            }) : <Col>
                <Card>
                    <Card.Body className="d-flex flex-column flex-lg-row gap-4">{t('views.lights.no_access')}</Card.Body>
                </Card>
            </Col>}
        </>}
        {isError && <Col>
            <ErrorMessage error={error} />
        </Col>}
    </Row>);
};

export default Lights;
