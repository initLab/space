import {Button, Card, Col, Row} from "react-bootstrap";
import '../doors.scss';
import React from "react";
import {useGetDoorsQuery} from "../features/apiSlice.js";

const Doors = () => {
    const {
        data: doors,
        error,
        isLoading,
        isSuccess,
        isError,
    } = useGetDoorsQuery();

    // TODO
    console.log(doors, error, isLoading, isSuccess, isError);

    return (<Row className="row-cols row-cols-1">
        <Col></Col>
        <Col>
            <Card>
                <Card.Header className="bg-primary text-light text-start">Входна врата</Card.Header>
                <Card.Body className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4">
                    <Button variant="success" className="door-button">
                        <i className="fa fa-sign-in" />
                        <div>отвори</div>
                    </Button>
                    <Button variant="danger" className="door-button">
                        <i className="fa fa-unlock" />
                        <div>отключи</div>
                    </Button>
                    <Button variant="info" className="door-button">
                        <i className="fa fa-lock" />
                        <div>заключи</div>
                    </Button>
                </Card.Body>
            </Card>
        </Col>
        <Col></Col>
    </Row>);
};

export default Doors;
