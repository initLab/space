import {Col, Row} from "react-bootstrap";
import {mqtt} from "../../config";
import SensorReading from "../SensorReading/SensorReading";
import {useTranslation} from "react-i18next";

const SensorReadingsWrapper = () => {
    const { t } = useTranslation();

    return (<>
        <Row>
            <Col>
                <h3>{t('views.dashboard.sensor_readings')}</h3>
            </Col>
        </Row>
        <Row className="row-cols row-cols-sm-2 row-cols-lg-3 g-3">
            {mqtt.sensors.map((sensor, idx) =>
                <SensorReading key={idx} {...sensor} />
            )}
        </Row>
    </>);
};

export default SensorReadingsWrapper;
