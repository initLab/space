import {Col, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import "./PresentUsers.scss";
import {useTranslation} from "react-i18next";

const PresentUsers = ({
    users,
}) => {
    const { t } = useTranslation();

    if (users.length === 0) {
        return (<Row>
            <Col className="no_users">
                <i className="far fa-frown" />
                <h5>{t('views.users.everybodys_gone')}</h5>
            </Col>
        </Row>);
    }

    return (<Row>
        present_user
    </Row>);
};

PresentUsers.propTypes = {
    users: PropTypes.array.isRequired,
};

export default PresentUsers;
