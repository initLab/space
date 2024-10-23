import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { sensors } from '../../config.js';
import SensorReading from '../SensorReading/SensorReading.jsx';
import { useMqttStatus } from '../../hooks/useMqttStatus.js';
import LoadingIcon from '../icons/LoadingIcon.jsx';
import ErrorMessage from '../ErrorMessage.jsx';
import { useMemo } from 'react';

const SensorReadingsWrapper = () => {
    const { t } = useTranslation();

    const {
        data: mqttStatus = {},
        error,
        isLoading,
    } = useMqttStatus({
        refreshInterval: 60_000,
    });

    const sensorReadings = useMemo(() => Object.entries(sensors).map(([topicPrefix, config]) => ({
        label: config.label,
        values: Object.fromEntries(Object.entries(mqttStatus).filter(([topic]) => topic.startsWith(topicPrefix)).map(([topic, reading]) => [
            topic.substring(topicPrefix.length + 1),
            reading,
        ])),
    })), [mqttStatus]);

    return (<>
        <Row>
            <Col>
                <h3>{t('views.dashboard.sensor_readings')}</h3>
            </Col>
        </Row>
        {isLoading && <Row>
            <Col className="text-center">
                <LoadingIcon large />
            </Col>
        </Row>}
        {error && <Row>
            <Col>
                <ErrorMessage error={error} />
            </Col>
        </Row>}
        {mqttStatus && <Row className="row-cols-1 row-cols-lg-3 g-3">
            {sensorReadings.map(sensorReading =>
                <SensorReading key={sensorReading.label} {...sensorReading} />
            )}
        </Row>}
    </>);
};

export default SensorReadingsWrapper;
