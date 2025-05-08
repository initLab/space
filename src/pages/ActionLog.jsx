import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useVariant } from '../hooks/useVariant.js';
import { useActionLog } from '../hooks/useActionLog.js';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import ErrorMessage from '../widgets/ErrorMessage.jsx';
import ActionLogEntry from '../widgets/ActionLog/ActionLogEntry.jsx';

const ActionLog = () => {
    const { t } = useTranslation();

    const variant = useVariant();
    const hasAccess = variant === 'initlab';

    const {
        data: actionLog,
        error,
        isLoading,
    } = useActionLog({
        refreshInterval: 60_000,
    });

    if (!hasAccess) {
        return (<Navigate to="/doors" />);
    }

    return (<>
        <Row>
            <Col>
                <h2>{t('views.action_log.title')}</h2>
            </Col>
        </Row>
        <Row className="row-cols row-cols-1">
            <Col>
                {isLoading && <LoadingIcon large />}
                {error && <ErrorMessage error={error} />}
                {actionLog && <>
                    <Row className="row-cols-1 row-cols-lg-5 d-none d-lg-flex fw-bold">
                        <Col>{t('views.action_log.columns.date_time')}</Col>
                        <Col>{t('views.action_log.columns.device')}</Col>
                        <Col>{t('views.action_log.columns.action')}</Col>
                        <Col>{t('views.action_log.columns.user')}</Col>
                        <Col>{t('views.action_log.columns.application')}</Col>
                    </Row>
                    {actionLog.map(entry => <ActionLogEntry key={entry.id} entry={entry} />)}
                </>}
            </Col>
        </Row>
    </>);
};

export default ActionLog;
