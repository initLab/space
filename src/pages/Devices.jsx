import { Card, Col, Row } from 'react-bootstrap';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { useDevices } from '../hooks/useDevices.js';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import DeviceActionButton from '../widgets/DeviceActionButton/DeviceActionButton.jsx';
import ErrorMessage from '../widgets/ErrorMessage.jsx';
import { useVariant } from '../hooks/useVariant.js';

const Devices = ({
    deviceType,
    deviceActionMapper,
}) => {
    const { t } = useTranslation();

    const {
        data: devices,
        error,
        isLoading,
    } = useDevices({
        refreshInterval: 2_000,
    });

    const filteredDevices = useMemo(() =>
        devices ? devices.filter(device => device.type === deviceType) : [], [deviceType, devices]);

    const variant = useVariant();
    const isInitLab = variant === 'initlab';

    return (<Row className="row-cols row-cols-1 gap-4">
        {isLoading && <Col className="text-center">
            <LoadingIcon large />
        </Col>}
        {devices && <>
            {filteredDevices.length > 0 ? filteredDevices.map(device => {
                const deviceActions = deviceActionMapper(device);
                const isUnavailable = device?.statuses?.available === false;
                const isOpen = device?.statuses?.open === true;

                return (<Col key={device.id}>
                    <Card>
                        <Card.Header className={'text-start' + (isInitLab ? ' bg-primary text-light' : '')}>
                            {device.name}
                        </Card.Header>
                        <Card.Body
                            className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4">
                            {isUnavailable ? t('views.devices.offline') : <>
                                {deviceActions.map(action =>
                                    <DeviceActionButton key={action} device={device} action={action}
                                        isDoorOpen={action === 'open' && isOpen} />)}
                                {deviceActions.length === 0 && <LoadingIcon large />}
                            </>}
                        </Card.Body>
                    </Card>
                </Col>);
            }) : <Col>
                <Card>
                    <Card.Body className="d-flex flex-column flex-lg-row gap-4">
                        {t(`views.${deviceType}.no_access`)}
                    </Card.Body>
                </Card>
            </Col>}
        </>}
        {error && <Col>
            <ErrorMessage error={error} />
        </Col>}
    </Row>);
};

Devices.propTypes = {
    deviceType: PropTypes.string.isRequired,
    deviceActionMapper: PropTypes.func.isRequired,
};

export default Devices;
