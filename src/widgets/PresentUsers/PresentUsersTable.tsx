import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import './PresentUsersTable.css';
import PresentUserCard from "./PresentUserCard.js";
import type {FaunaPresentUser} from "../../fauna-types";

const PresentUsersTable = ({users}: { users: FaunaPresentUser[] }) => {
    const {t} = useTranslation();

    if (users.length > 0) return <Row className="mb-3 row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-3">
        {users.map(user => <PresentUserCard key={user.id} user={user}/>)}
    </Row>;

    return <Row className="mb-3">
        <Col className="text-center no_users">
            <i className="fa-regular fa-frown"/>
            <h5 className="mt-2">{t('views.users.everybodys_gone')}</h5>
        </Col>
    </Row>;
};

export default PresentUsersTable;
