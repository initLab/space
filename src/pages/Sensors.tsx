import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {grafana} from '../config.ts';

const Sensors = () => {
    const {t} = useTranslation();

    return (<>
        <Row>
            <Col>
                <h2>{t('views.sensors.title')}</h2>
            </Col>
        </Row>
        <Row className="row-cols row-cols-1 row-cols-xxl-3">
            {grafana.urls.map(url => <Col key={url}>
                <iframe src={url} className="w-100" height={300}/>
            </Col>)}
        </Row>
    </>);
};

export default Sensors;
