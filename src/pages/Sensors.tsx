import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useMqttHistory} from "../hooks/useEndpoints.ts";
import SensorGraph from "../widgets/SensorReadings/SensorGraph.tsx";

const Sensors = () => {
    const {t} = useTranslation();
    const {data} = useMqttHistory();

    if (!data) return <></>;

    return <>
        <Row>
            <Col>
                <h2>{t('views.sensors.title')}</h2>
            </Col>
        </Row>
        <Row className="row-cols row-cols-1 row-cols-xxl-2">
            {Object.entries(data).map(([sensor, metrics]) =>
                <Col key={sensor}><SensorGraph sensor={sensor} metrics={metrics}/></Col>
            )}
        </Row>
    </>;
};

export default Sensors;
