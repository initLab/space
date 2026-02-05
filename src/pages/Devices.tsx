import {Card, Col, Row} from 'react-bootstrap';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {useDevices} from '../hooks/useEndpoints.ts';
import LoadingIcon from '../widgets/LoadingIcon.tsx';
import DeviceActionButton from '../widgets/DeviceActionButton/DeviceActionButton.tsx';
import ErrorMessage from '../widgets/ErrorMessage.tsx';
import {useVariantName} from '../hooks/useVariant.ts';
import type {PortierDevice} from "../portier-types";

const Devices = ({
                     deviceGroup,
                     deviceActionMapper,
                 }: { deviceGroup: string, deviceActionMapper: (d: PortierDevice) => string[] }) => {
    const {t} = useTranslation();

    const {
        data: devices,
        error,
        isLoading,
    } = useDevices({
        refreshInterval: 2_000,
    });

    const filteredDevices = useMemo(() =>
        devices ? devices.filter(x => x.group === deviceGroup) : [], [deviceGroup, devices]);

    // const variant = useVariant();
    const variantName = useVariantName();

    return (<Row className="row-cols row-cols-1 row-cols-xl-2 gy-4 justify-content-center">
        {isLoading && <Col className="text-center">
            <LoadingIcon large/>
        </Col>}
        {devices && <>
            {filteredDevices.length > 0 ? filteredDevices.map(device => {
                const deviceActions = deviceActionMapper(device);
                const isUnavailable = device?.statuses?.available === false;
                const isOpen = !!device?.statuses?.open;

                return (<Col key={device.id} className={`col-xl-${2 * deviceActions.length}`}>
                    <Card border="secondary">
                        <Card.Header
                            className={'text-start' + (variantName === "initlab" ? ' bg-primary text-light' : '')}>
                            {device.name}
                        </Card.Header>
                        <Card.Body
                            className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4">
                            {isUnavailable ? t('views.devices.offline') : <>
                                {deviceActions.map(action =>
                                    <DeviceActionButton key={action} device={device} action={action}
                                                        isDoorOpen={action === 'open' && isOpen}/>)}
                                {deviceActions.length === 0 && <LoadingIcon large/>}
                            </>}
                        </Card.Body>
                    </Card>
                </Col>);
            }) : <Col>
                <Card>
                    <Card.Body className="d-flex flex-column flex-lg-row gap-4">
                        {t('views.' + deviceGroup + '.no_access')}
                    </Card.Body>
                </Card>
            </Col>}
        </>}
        {error && <Col>
            <ErrorMessage error={error}/>
        </Col>}
    </Row>);
};

export default Devices;
