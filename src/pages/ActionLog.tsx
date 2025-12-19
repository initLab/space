import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Navigate} from 'react-router-dom';

import {useActionLog, useCurrentUser} from '../hooks/useEndpoints.ts';
import LoadingIcon from '../widgets/LoadingIcon.tsx';
import ErrorMessage from '../widgets/ErrorMessage.tsx';
import {hasRole} from "../helpers.ts";
import ActionLogTable from "../widgets/ActionLog/ActionLogTable.tsx";

const ActionLog = () => {
    const {t} = useTranslation();
    const {data: user} = useCurrentUser();
    const {data: actionLog, error, isLoading} = useActionLog({refreshInterval: 60_000,});

    if (!hasRole(user, 'board_member')) {
        return <Navigate to="/doors"/>;
    }

    return <>
        <Row>
            <Col>
                <h2>{t('views.action_log.title')}</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                {isLoading && <LoadingIcon large/>}
                {error && <ErrorMessage error={error}/>}
                {actionLog && <ActionLogTable log={actionLog}/>}
            </Col>
        </Row>
    </>;
};

export default ActionLog;
