import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { format, formatISO } from 'date-fns';

import PresentUsers from '../PresentUsers/PresentUsers';
import { usePresentUsers } from '../../hooks/usePresentUsers.js';
import LoadingIcon from '../icons/LoadingIcon.jsx';
import ErrorMessage from '../ErrorMessage.jsx';

const PresentUsersWrapper = () => {
    const { t } = useTranslation();

    const {
        data: users,
        error,
        isLoading,
    } = usePresentUsers({
        refreshInterval: 60_000,
        onSuccess: () => setFulfilledTime(new Date()),
    });

    const [ fulfilledTime, setFulfilledTime ] = useState();

    const usersCount = users ? users.length : 0;

    return (<>
        <Row as="header" className="row-cols row-cols-1 row-cols-lg-2 mt-2">
            <Col>
                <h2>{t('views.users.whos_in_the_lab')}</h2>
            </Col>
            <Col className="text-end">
                {isLoading && <LoadingIcon />}
                {users && fulfilledTime && <h2>
                    <div className="small text-muted">
                        {t('views.users.people_at_about_html.' + (usersCount === 1 ? 'one' : 'other'))
                            .replace('%{count}', usersCount.toString(10))}{' '}
                        <time dateTime={formatISO(fulfilledTime)}>{format(fulfilledTime, 'HH:mm')}</time>
                    </div>
                </h2>}
            </Col>
        </Row>
        {isLoading && <Row className="mb-3">
            <Col className="text-center">
                <LoadingIcon large />
            </Col>
        </Row>}
        {users && <PresentUsers users={users} />}
        {error && <Row className="mb-3">
            <Col>
                <ErrorMessage error={error} />
            </Col>
        </Row>}
    </>);
};

export default PresentUsersWrapper;
