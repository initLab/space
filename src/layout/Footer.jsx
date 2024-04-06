import { Col, Container, Row } from 'react-bootstrap';
import './Footer.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const {t} = useTranslation();

    return (<footer>
        <Container>
            <Row>
                <Col xs={12} sm={6}>
                    <p className="my-4">
                        {t('views.footer.license')}{' '}
                        <a href="https://github.com/initLab/space/blob/master/LICENSE">MIT License</a>
                    </p>
                </Col>
                <Col xs={12} sm={6}>
                    <p className="my-4 right">
                        {t('views.footer.source_code')}{' '}
                        <a href="https://github.com/initLab/space/">GitHub</a>
                    </p>
                </Col>
            </Row>
        </Container>
    </footer>);
};

export default Footer;
