import { Button, ButtonGroup, Card, Col, Image, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './PresentUsers.scss';

const PresentUsers = ({
    users,
}) => {
    const {t} = useTranslation();

    if (users.length > 0) {
        return (<Row className="mb-3 row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-3">
            {users.map(user => <Col key={user.picture}>
                <Card className="h-100">
                    <Card.Header>
                        {user.picture &&
                            <Image fluid src={user.picture.replace('s=128', 's=242')} alt="avatar" className="w-100" />}
                    </Card.Header>
                    <Card.Body className="text-center">
                        <h5 className="mb-4">
                            {user.username}
                        </h5>
                        <ButtonGroup>
                            {user.twitter && <Button href={`https://twitter.com/${user.twitter}`} target="_blank">
                                <i className="fab fa-twitter fa-2x"></i>
                            </Button>}
                            {user.github &&
                                <Button variant="default" href={`https://github.com/${user.github}`} target="_blank">
                                    <i className="fab fa-github fa-2x"></i>
                                </Button>}
                            {user.url && <Button variant="info" href={user.url} target="_blank">
                                <i className="fa-solid fa-link fa-2x"></i>
                            </Button>}
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </Col>)}
        </Row>);
    }

    return (<Row className="mb-3">
        <Col className="text-center no_users">
            <i className="fa-regular fa-frown" />
            <h5 className="mt-2">{t('views.users.everybodys_gone')}</h5>
        </Col>
    </Row>);
};

PresentUsers.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        twitter: PropTypes.string,
        github: PropTypes.string,
        url: PropTypes.string,
    }).isRequired).isRequired,
};

export default PresentUsers;
