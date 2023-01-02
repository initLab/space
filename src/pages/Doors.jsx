import {Card, Col, Row} from "react-bootstrap";
import React from "react";
import {useGetDoorsQuery} from "../features/apiSlice.js";
import LoadingIcon from "../widgets/icons/LoadingIcon.jsx";
import DoorButton from "../widgets/DoorButton/DoorButton.jsx";

const Doors = () => {
    const {
        data: doors,
        error,
        isLoading,
        isSuccess,
        isError,
    } = useGetDoorsQuery();

    return (<Row className="row-cols row-cols-1">
        {isLoading && <Col className="text-center">
            <LoadingIcon large />
        </Col>}
        {isSuccess && doors.map(door => <Col key={door.id}>
            <Card>
                <Card.Header className="bg-primary text-light text-start">{door.name}</Card.Header>
                <Card.Body className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4">
                    {door.supported_actions.map(action => <DoorButton key={action} action={action} />)}
                </Card.Body>
            </Card>
        </Col>)}
        {isError && <Col>
            Error {error.status} {error.data}
        </Col>}
    </Row>);
};

export default Doors;
