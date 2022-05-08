import {Col, Container, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {mqtt} from "../config";
import SensorReading from "../widgets/SensorReading/SensorReading";
import PresentUsersWrapper from "../widgets/PresentUsersWrapper/PresentUsersWrapper";

const Dashboard = () => {
    const { t } = useTranslation();

    return (<>
        <Container as="section">
            <PresentUsersWrapper />
            <Row>
                <Col>
                    <h3>{t('views.dashboard.sensor_readings')}</h3>
                </Col>
            </Row>
            <Row>
                {mqtt.sensors.map((sensor, idx) =>
                    <SensorReading key={idx} {...sensor} />
                )}
            </Row>
        </Container>
    </>);
};

export default Dashboard;
