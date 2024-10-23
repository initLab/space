import { Card, Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isValid } from 'date-fns';

import { useDateTimeFormatter } from '../../utils/useDateTimeFormatter.js';

import './SensorReading.css';
import { useMemo } from 'react';
import SensorReadingValue from './SensorReadingValue.jsx';

const units = {
    temperature: '°C',
    humidity: '%',
    battery: '%',
};

const thresholds = [18, 24, 26, 32];

const SensorReading = ({
    label,
    values: rawValues,
}) => {
    const {
        formatDefault,
        formatDistanceToNow,
    } = useDateTimeFormatter();

    const values = useMemo(() => Object.fromEntries(Object.entries(rawValues).filter(([type, value]) =>
        Object.prototype.hasOwnProperty.call(units, type) && isValid(value.timestamp) && typeof value.value === 'number'
    ).map(([type, value]) => [type, {
        ...value,
        dt: new Date(value.timestamp),
        thermometerState: type === 'temperature' ? thresholds.filter(threshold => threshold < value).length : 0,
        unit: units[type],
    }]).map(([type, value]) => [type, {
        ...value,
        formattedTimestamp: formatDefault(value.dt) + ' (' + formatDistanceToNow(value.dt) + ')',
        formattedValue: value.value.toFixed() + value.unit,
        readingAge: Date.now() - value.dt,
    }]).map(([type, value]) => [type, {
        ...value,
        isCurrent: value.readingAge <= 7_200_000,
        isVisible: value.readingAge <= 86_400_000,
    }]).filter(([, value]) => value.isVisible)), [formatDefault, formatDistanceToNow, rawValues]);

    if (Object.keys(values).length < 1) {
        return null;
    }

    const isCurrent = values?.temperature?.isCurrent || values?.humidity?.isCurrent;
    const thermometerState = values?.temperature?.thermometerState;

    return (<Col>
        <Card bg="primary" text={isCurrent ? 'white' : 'secondary'}>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={3}>
                            <i className={'fa-solid fa-5x fa-thermometer-' + thermometerState} />
                        </Col>
                        <Col xs={9} className="text-end">
                            <div className="huge">
                                {values?.temperature && <SensorReadingValue {...values.temperature} />}
                                {values?.temperature && values?.humidity && ' '}
                                {values?.humidity && <SensorReadingValue {...values.humidity} />}
                            </div>
                            <div>{label}</div>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    </Col>);
};

SensorReading.propTypes = {
    label: PropTypes.string.isRequired,
    values: PropTypes.objectOf(PropTypes.shape({
        timestamp: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    })).isRequired,
};

export default SensorReading;
