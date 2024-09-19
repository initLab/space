import { Card, Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isValid } from 'date-fns';

import { useDateTimeFormatter } from '../../utils/useDateTimeFormatter.js';

import './SensorReading.css';

const units = {
    Temperature: ['°C', 1],
    Humidity: ['%', 1],
};

const thresholds = [18, 24, 26, 32];

const SensorReading = ({
    type,
    label,
    timestamp,
    value,
}) => {
    const {
        formatDefault,
        formatDistanceToNow,
    } = useDateTimeFormatter();

    if (!isValid(timestamp) || typeof value !== 'number') {
        return null;
    }

    const lastUpdate = new Date(timestamp);
    const formattedTimestamp = formatDefault(lastUpdate) + ' (' + formatDistanceToNow(lastUpdate) + ')';
    const unit = units[type];
    const formattedValue = value.toFixed(unit[1]) + unit[0];
    const readingAge = Date.now() - timestamp;
    const isCurrent = readingAge <= 7_200_000;
    const isVisible = readingAge <= 86_400_000;
    // TODO: only for type === Temperature
    const thermometerState = thresholds.filter(threshold => threshold < value).length;

    if (!isVisible) {
        return null;
    }

    return (<Col>
        <Card bg="primary" text={isCurrent ? 'white' : 'secondary'}>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={3}>
                            <i className={'fa-solid fa-5x fa-thermometer-' + thermometerState} />
                        </Col>
                        <Col xs={9} className="text-end">
                            <div className={'huge' + (isCurrent ? '' : ' text-decoration-line-through')}>
                                {formattedValue}
                            </div>
                            <div title={formattedTimestamp}>{label}</div>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    </Col>);
};

SensorReading.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default SensorReading;
