import {Col, Container, Row} from "react-bootstrap";
import PresentUsers from "../widgets/PresentUsers";

const Dashboard = () => {
    return (<>
        <div>whos_in_the_lab</div>
        <Container as="section">
            <Row as="header">
                <Col sm={12}>
                    <h2>
                        whos_in_the_lab
                        <div className="float-end">
                            <span className="small">
                                people_at_about_html
                                <time dateTime="2022-05-07T19:02:46+03:00">19:02</time>
                            </span>
                        </div>
                    </h2>
                </Col>
            </Row>
            <PresentUsers users={[]} />
            <Row>
                <Col>
                    <h3>sensor_readings</h3>
                </Col>
            </Row>
            <Row>
                {/* foreach */}
                <Col sm={4}>
                    <div data-label="label" data-label-type="Temperature" data-mqtt-topic="topic">Loading...</div>
                </Col>
                {/* endforeach */}
            </Row>
        </Container>
    </>);
};

export default Dashboard;
