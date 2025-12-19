import {Col, Row} from "react-bootstrap";
import ActionLogEntry from "./ActionLogEntry.tsx";
import {useTranslation} from "react-i18next";
import type {PortierActionLogEntry} from "../../portier-types";

const ActionLogTable = ({log}: { log: PortierActionLogEntry[] }) => {
    const {t} = useTranslation();

    return <Row className="row-cols-1">
        <Col lg={4} className="d-none d-lg-block fw-bold">
            {t('views.action_log.columns.date_time')}
        </Col>
        <Col lg={2} className="d-none d-lg-block fw-bold">
            {t('views.action_log.columns.device')}
        </Col>
        <Col lg={1} className="d-none d-lg-block fw-bold">
            {t('views.action_log.columns.action')}
        </Col>
        <Col lg={3} className="d-none d-lg-block fw-bold">
            {t('views.action_log.columns.user')}
        </Col>
        <Col lg={2} className="d-none d-lg-block fw-bold">
            {t('views.action_log.columns.application')}
        </Col>
        {log.map(entry => <ActionLogEntry key={entry.id} entry={entry}/>)}
    </Row>
}

export default ActionLogTable;