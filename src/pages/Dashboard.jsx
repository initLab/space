import {Col, Container, Row} from "react-bootstrap";
import PresentUsers from "../widgets/PresentUsers/PresentUsers";
import {useTranslation} from "react-i18next";
import {mqtt} from "../config";
import SensorReading from "../widgets/SensorReading/SensorReading";

const Dashboard = () => {
    const { t } = useTranslation();

    return (<>
        <Container as="section">
            <Row as="header">
                <Col sm={12}>
                    <h2>
                        {t('views.users.whos_in_the_lab')}
                        <div className="float-end">
                            <span className="small">
                                {t('views.users.people_at_about_html.few')}{' '}
                                <time dateTime="2022-05-07T19:02:46+03:00">19:02</time>
                            </span>
                        </div>
                    </h2>
                </Col>
            </Row>
            <PresentUsers users={[]} />
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
