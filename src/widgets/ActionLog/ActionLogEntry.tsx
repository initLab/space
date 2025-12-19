import {parseISO} from 'date-fns';

import {useDateTimeFormatter} from '../../utils/useDateTimeFormatter.ts';
import {Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import type {PortierActionLogEntry} from "../../portier-types";

const ActionLogEntry = ({entry,}: { entry: PortierActionLogEntry }) => {
    const {t} = useTranslation();

    const {formatDefault, formatDistanceToNow} = useDateTimeFormatter();

    const dateTime = parseISO(entry.createdAt);

    return (<>
        <div className="w-100 border-top my-1"/>
        <Col lg={4}>
            <strong className="d-lg-none">{t('views.action_log.columns.date_time')}: </strong>
            {formatDefault(dateTime)} ({formatDistanceToNow(dateTime)})
        </Col>
        <Col lg={2}>
            <strong className="d-lg-none">{t('views.action_log.columns.device')}: </strong>
            {entry.deviceId}
        </Col>
        <Col lg={1}>
            <strong className="d-lg-none">{t('views.action_log.columns.action')}: </strong>
            {entry.action}
        </Col>
        <Col lg={3}>
            <strong className="d-lg-none">{t('views.action_log.columns.user')}: </strong>
            {entry.User?.name} ({entry.User?.username})
        </Col>
        <Col lg={2}>
            <strong className="d-lg-none">{t('views.action_log.columns.application')}: </strong>
            {entry.Application?.name}
        </Col>
    </>);
};

export default ActionLogEntry;
