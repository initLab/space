import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import './NavBar.css';
import logo from '../assets/logo.svg';
import {useTranslation} from "react-i18next";
import {useGetDoorStatusQuery} from "../features/apiSlice";
import LoadingIcon from "../widgets/icons/LoadingIcon";
import {useMemo} from "react";

const NavBar = () => {
    const {t} = useTranslation();
    const {
        data: doorStatus,
        isLoading,
        isSuccess,
        isError,
    } = useGetDoorStatusQuery(undefined, {
        pollingInterval: 60000,
    });

    const isUnlocked = useMemo(
        () => isSuccess && doorStatus.latch === 'unlocked',
        [isSuccess, doorStatus]
    );

    return (<Navbar bg="primary" variant="dark" expand="lg" className="py-0">
        <Container>
            <Navbar.Brand href="#">
                <Image src={logo} className="logo" alt="Fauna" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#">
                        {isLoading && <LoadingIcon />}
                        {isError && <i className="fa fa-lock" />}
                        {isSuccess && <i className={'fa fa-' +
                            (isUnlocked ? 'unlock' : 'lock')
                        } />}
                        {' '}
                        {(isLoading || isError) && t('views.door_status.unknown')}
                        {isSuccess && t(isUnlocked ? 'views.door_status.unlocked' : 'views.door_status.locked')}
                    </Nav.Link>
                    <Nav.Link href="#">
                        <i className="fa fa-street-view" />{' '}
                        {t('views.navigation.presence')}
                    </Nav.Link>
                    <Nav.Link href="#">
                        <i className="far fa-lightbulb" />{' '}
                        {t('views.navigation.lights')}
                    </Nav.Link>
                    <Nav.Link href="#">
                        <i className="fa fa-line-chart" />{' '}
                        {t('views.navigation.sensors')}
                    </Nav.Link>
                    <NavDropdown title={<>
                        <i className="fas fa-users" />{' '}
                        {t('views.navigation.labbers')}
                    </>}>
                        <NavDropdown.Item href="#">
                            {t('views.navigation.management')}
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
};

export default NavBar;
