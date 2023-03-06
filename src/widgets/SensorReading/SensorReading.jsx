import { Card, Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './SensorReading.css';
import { useSelector } from 'react-redux';
import { sensorSelector } from '../../features/sensorSlice';
import LoadingIcon from '../icons/LoadingIcon';

const units = {
    'Temperature': ['°C', 1],
    'Humidity': ['%', 1]
};

const SensorReading = ({
    label,
    topic,
}) => {
    const value = useSelector(sensorSelector(topic));
    const unit = units.Temperature; // TODO
    const formattedValue = value?.data && parseFloat(value.data).toFixed(unit[1]) + unit[0];

    return (<Col>
        <Card bg="primary" text="white">
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={3}>
                            <i className="fas fa-thermometer-half fa-5x" />
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
    label: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
};

export default SensorReading;
