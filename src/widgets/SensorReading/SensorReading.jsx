import {Card, Col, Container, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import './SensorReading.css';

const SensorReading = ({
    label,
    topic,
}) => {
    return (<Col>
        <Card bg="primary" text="white">
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={3}>
                            <i className="fa fa-thermometer-half fa-5x" />
                        </Col>
                        <Col xs={9} className="text-end">
                            <div className="huge">21.9°C</div>
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
