import { parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { useDateTimeFormatter } from '../../utils/useDateTimeFormatter.js';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ActionLogEntry = ({
    entry,
}) => {
    const { t } = useTranslation();

    const {
        formatDefault,
        formatDistanceToNow,
    } = useDateTimeFormatter();

    const dateTime = parseISO(entry.createdAt);

    return (<>
        <div className="w-100 border-top my-1" />
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
            {entry.User.name} ({entry.User.username})
        </Col>
        <Col lg={2}>
            <strong className="d-lg-none">{t('views.action_log.columns.application')}: </strong>
            {entry.Application.name}
        </Col>
    </>);
};

ActionLogEntry.propTypes = {
    entry: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        deviceId: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        User: PropTypes.shape({
            name: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }).isRequired,
        Application: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default ActionLogEntry;
