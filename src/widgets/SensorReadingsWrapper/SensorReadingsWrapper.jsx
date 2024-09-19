import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { sensors } from '../../config.js';
import SensorReading from '../SensorReading/SensorReading.jsx';
import { useMqttStatus } from '../../hooks/useMqttStatus.js';
import LoadingIcon from '../icons/LoadingIcon.jsx';
import ErrorMessage from '../ErrorMessage.jsx';

const SensorReadingsWrapper = () => {
    const { t } = useTranslation();

    const {
        data,
        error,
        isLoading,
    } = useMqttStatus({
        refreshInterval: 60_000,
    });

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
        {data && <Row className="row-cols-1 row-cols-lg-3 g-3">
            {Object.entries(sensors).filter(([topic]) => Object.prototype.hasOwnProperty.call(data, topic)).map(([topic, sensor]) =>
                <SensorReading key={topic} {...sensor} {...data[topic]} />
            )}
        </Row>}
    </>);
};

export default SensorReadingsWrapper;
