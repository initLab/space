import {Container} from "react-bootstrap";
import PresentUsersWrapper from "../widgets/PresentUsersWrapper/PresentUsersWrapper";
import SensorReadingsWrapper from "../widgets/SensorReadingsWrapper/SensorReadingsWrapper";

const Dashboard = () => {
    return (<>
        <Container as="section">
            <PresentUsersWrapper />
            <SensorReadingsWrapper />
        </Container>
    </>);
};

export default Dashboard;
