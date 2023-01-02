import {Card, Col, Row} from "react-bootstrap";
import React, {useCallback} from "react";
import {useGetDoorsQuery} from "../features/apiSlice.js";
import LoadingIcon from "../widgets/icons/LoadingIcon.jsx";
import DoorButton from "../widgets/DoorButton/DoorButton.jsx";
import {useSelector} from "react-redux";
import {doorStatusSelector} from "../features/doorSlice.js";

const Doors = () => {
    const {
        data: doors,
        error,
        isLoading,
        isSuccess,
        isError,
    } = useGetDoorsQuery();

    const monitoredDoor = 'building_door';
    const doorStatus = useSelector(doorStatusSelector());

    const getDoorActions = useCallback(door => {
        const actions = door.supported_actions;

        if (door.id !== monitoredDoor) {
            return actions;
        }

        if (doorStatus === 'unlocked') {
            return actions.filter(action => action !== 'unlock');
        }

        if (doorStatus === 'locked') {
            return actions.filter(action => ['open', 'lock'].indexOf(action) === -1);
        }

        return [];
    }, [monitoredDoor, doorStatus]);

    return (<Row className="row-cols row-cols-1 gap-4">
        {isLoading && <Col className="text-center">
            <LoadingIcon large />
        </Col>}
        {isSuccess && doors.map(door => {
            const doorActions = getDoorActions(door);

            if (doorActions.length === 0) {
                return;
            }

            return (<Col key={door.id}>
                <Card>
                    <Card.Header className="bg-primary text-light text-start">{door.name}</Card.Header>
                    <Card.Body className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4">
                        {doorActions.map(action => <DoorButton key={action} action={action} />)}
                    </Card.Body>
                </Card>
            </Col>);
        })}
        {isError && <Col>
            Error {error.status} {error.data}
        </Col>}
    </Row>);
};

export default Doors;
