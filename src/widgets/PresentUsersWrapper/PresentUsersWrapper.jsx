import {Col, Row} from "react-bootstrap";
import PresentUsers from "../PresentUsers/PresentUsers";
import {useTranslation} from "react-i18next";

const PresentUsersWrapper = () => {
    const { t } = useTranslation();

    return (<>
        <Row as="header">
            <Col>
                <h2 className="my-4">
                    {t('views.users.whos_in_the_lab')}
                    <div className="float-end">
                        <span className="small">
                            {t('views.users.people_at_about_html.other')}{' '}
                            <time dateTime="2022-05-07T19:02:46+03:00">19:02</time>
                        </span>
                    </div>
                </h2>
            </Col>
        </Row>
        <PresentUsers />
    </>);
};

export default PresentUsersWrapper;
