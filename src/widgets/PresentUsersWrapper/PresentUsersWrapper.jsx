import {Col, Row} from "react-bootstrap";
import PresentUsers from "../PresentUsers/PresentUsers";
import {useTranslation} from "react-i18next";

const PresentUsersWrapper = () => {
    const { t } = useTranslation();

    return (<>
        <Row as="header" className="row-cols row-cols-1 row-cols-lg-2 mt-2">
            <Col>
                <h2>{t('views.users.whos_in_the_lab')}</h2>
            </Col>
            <Col>
                <h2>
                    <div className="text-end small text-muted">
                        {t('views.users.people_at_about_html.other')}{' '}
                        <time dateTime="2022-05-07T19:02:46+03:00">19:02</time>
                    </div>
                </h2>
            </Col>
        </Row>
        <PresentUsers />
    </>);
};

export default PresentUsersWrapper;
