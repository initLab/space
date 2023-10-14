import { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { grafana } from '../config';
import { useVariant } from '../hooks/useVariant.js';
import { Navigate } from 'react-router-dom';

const Sensors = () => {
    const { t } = useTranslation();

    const variant = useVariant();

    if (variant === 'colibri') {
        return (<Navigate to="/doors" />);
    }

    return (<>
        <Row>
            <Col>
                <h2>{t('views.sensors.title')}</h2>
            </Col>
        </Row>
        <Row className="row-cols row-cols-1 row-cols-xxl-3">
            {grafana.panels.map(panelId => <Col key={panelId}>
                <iframe src={'https://stats.initlab.org/d-solo/' + grafana.dashboard.id + '/' + grafana.dashboard.name +
                    '?orgId=1&refresh=1m&panelId=' + panelId} className="w-100" height={300} title={panelId} />
            </Col>)}
        </Row>
    </>);
};

export default Sensors;
