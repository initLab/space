import { Col, Row, Table } from 'react-bootstrap';
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
                {actionLog && <Table>
                    <thead>
                        <tr>
                            <th>{t('views.action_log.columns.date_time')}</th>
                            <th>{t('views.action_log.columns.device')}</th>
                            <th>{t('views.action_log.columns.action')}</th>
                            <th>{t('views.action_log.columns.user')}</th>
                            <th>{t('views.action_log.columns.application')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actionLog.map(entry => <ActionLogEntry key={entry.id} entry={entry} />)}
                    </tbody>
                </Table>}
            </Col>
        </Row>
    </>);
};

export default ActionLog;
