import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useVariant } from '../hooks/useVariant.js';
import { useActionLog } from '../hooks/useActionLog.js';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import ErrorMessage from '../widgets/ErrorMessage.jsx';
import ActionLogEntry from '../widgets/ActionLog/ActionLogEntry.jsx';
import { withAuthenticationRequired } from 'react-oidc-context';

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
        return (<Navigate to="/" />);
    }

    return (<>
        <Row>
            <Col>
                <h2>{t('views.action_log.title')}</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                {isLoading && <LoadingIcon large />}
                {error && <ErrorMessage error={error} />}
                {actionLog && <>
                    <Row className="row-cols-1">
                        <Col lg={4} className="d-none d-lg-block fw-bold">{t('views.action_log.columns.date_time')}</Col>
                        <Col lg={2} className="d-none d-lg-block fw-bold">{t('views.action_log.columns.device')}</Col>
                        <Col lg={1} className="d-none d-lg-block fw-bold">{t('views.action_log.columns.action')}</Col>
                        <Col lg={3} className="d-none d-lg-block fw-bold">{t('views.action_log.columns.user')}</Col>
                        <Col lg={2} className="d-none d-lg-block fw-bold">{t('views.action_log.columns.application')}</Col>
                        {actionLog.map(entry => <ActionLogEntry key={entry.id} entry={entry} />)}
                    </Row>
                </>}
            </Col>
        </Row>
    </>);
};

export default withAuthenticationRequired(ActionLog);
