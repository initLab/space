import {Button, Col, Container, Row} from "react-bootstrap";

const DoorStatus = () => {
    return (<Container as="section" className="text-center">
        <Row>
            <Col>
                <div className="mt-3 mx-auto" style={{
                        width: 200,
                        height: 200,
                    }}>
                    <i className="fa fa-lock" />
                    <br />
                    Locked
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div className="mt-3 mx-auto">
                    <Button variant="danger" className="door_button" style={{
                        width: 200,
                        height: 200,
                    }}>
                        <i className="fa fa-unlock" />
                        <br />
                        <span className="small">unlock</span>
                    </Button>
                </div>
            </Col>
        </Row>
    </Container>);
};

export default DoorStatus;
