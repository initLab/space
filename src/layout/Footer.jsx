import {Col, Container, Row} from "react-bootstrap";
import './Footer.scss';

const Footer = () => {
    return (<footer>
        <Container>
            <Row>
                <Col xs={12} sm={6}>
                    <p className="my-4">init Lab Fauna is licensed under <a href="https://github.com/initLab/fauna/blob/master/LICENSE">MIT License</a></p>
                </Col>
                <Col xs={12} sm={6}>
                    <p className="my-4 right">The source code is available in <a
                        href="https://github.com/initLab/fauna/">GitHub</a></p>
                </Col>
            </Row>
        </Container>
    </footer>);
};

export default Footer;
