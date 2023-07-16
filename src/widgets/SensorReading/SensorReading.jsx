import { Card, Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './SensorReading.css';
import { useSelector } from 'react-redux';
import { sensorSelector } from '../../features/sensorSlice';
import LoadingIcon from '../icons/LoadingIcon';

const units = {
    Temperature: ['°C', 1],
    Humidity: ['%', 1],
};

const thresholds = [18, 24, 26, 32];

const SensorReading = ({
    type,
    label,
    topic,
}) => {
    const {
        timestamp,
        value,
    } = useSelector(sensorSelector(topic)) || {};
    const unit = units[type];
    const formattedValue = value && value.toFixed(unit[1]) + unit[0];
    const isCurrent = timestamp && Date.now() - timestamp <= 3_600_000;
    const thermometerState = thresholds.filter(threshold => threshold < value).length;

    return (<Col>
        <Card bg="primary" text={isCurrent ? 'white' : 'secondary'}>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={3}>
                            <i className={'fas fa-5x fa-thermometer-' + thermometerState} />
                        </Col>
                        <Col xs={9} className="text-end">
                            <div className="huge">{formattedValue || <LoadingIcon />}</div>
                            <div>{label}</div>
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
    topic: PropTypes.string.isRequired,
};

export default SensorReading;
