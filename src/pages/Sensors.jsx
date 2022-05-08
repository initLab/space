import { Fragment } from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {grafana} from "../config";

const Sensors = () => {
    const { t } = useTranslation();

    return (
        <Container as="section">
            <Row>
                <h2 className="my-4">{t('views.sensors.title')}</h2>
            </Row>
            {Object.entries(grafana).map(([measurement, config]) => <Fragment key={measurement}>
                <Row>
                    <h3>{t('views.sensors.' + measurement)}</h3>
                </Row>
                <Row className="row-cols row-cols-lg-3">
                    {config.panels.map(panelId => <Col key={panelId}>
                        {/* eslint-disable-next-line react/jsx-no-target-blank */}
                        <a href={'https://stats.initlab.org/d/' + config.dashboard.id + '/' + config.dashboard.name}
                           target="_blank">
                            <Image src={'https://stats.initlab.org/render/d-solo/' + config.dashboard.id + '/'+
                                config.dashboard.name + '?orgId=1&panelId=' + panelId +
                                '&width=350&height=200&tz=Europe%2FSofia'} height={200} />
                        </a>
                    </Col>)}
                </Row>
            </Fragment>)}
        </Container>
    );
};

export default Sensors;
