import {Col, Row} from "react-bootstrap";
import "./PresentUsers.scss";
import {useTranslation} from "react-i18next";
import {useGetPresentUsersQuery} from "../../features/apiSlice";
import LoadingIcon from "../icons/LoadingIcon";

const PresentUsers = () => {
    const { t } = useTranslation();
    const {
        data: users,
        error,
        isLoading,
        isSuccess,
        isError,
    } = useGetPresentUsersQuery();

    return (<Row>
        {isLoading && <Col>
            <LoadingIcon large />
        </Col>}
        {isError && error}
        {isSuccess && (users.length === 0 ? (<Col className="no_users">
                <i className="far fa-frown" />
                <h5>{t('views.users.everybodys_gone')}</h5>
            </Col>
        ) : users.map(user => <Col>
            {user.username}
        </Col>))}
    </Row>);
};

export default PresentUsers;
