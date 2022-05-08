import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import './NavBar.css';
import logo from '../assets/logo.svg';
import {useTranslation} from "react-i18next";
import {useGetDoorStatusQuery} from "../features/apiSlice";
import LoadingIcon from "../widgets/icons/LoadingIcon";
import {useMemo} from "react";
import {NavLink} from "react-router-dom";

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
            <Navbar.Brand as={NavLink} to="/">
                <Image src={logo} className="logo" alt="Fauna" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="flex-grow-1">
                    <Nav.Link as={NavLink} to="/door/status">
                        {isLoading && <LoadingIcon />}
                        {isError && <i className="fas fa-lock" />}
                        {isSuccess && <i className={isUnlocked ?
                            'fas fa-unlock' :
                            'fas fa-lock'
                        } />}
                        {' '}
                        {(isLoading || isError) && t('views.door_status.unknown')}
                        {isSuccess && t(isUnlocked ? 'views.door_status.unlocked' : 'views.door_status.locked')}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/users/present">
                        <i className="fas fa-street-view" />{' '}
                        {t('views.navigation.presence')}
                    </Nav.Link>
                    {/*<Nav.Link href="#">*/}
                    {/*    <i className="far fa-lightbulb" />{' '}*/}
                    {/*    {t('views.navigation.lights')}*/}
                    {/*</Nav.Link>*/}
                    <Nav.Link as={NavLink} to="/sensors">
                        <i className="fas fa-chart-line" />{' '}
                        {t('views.navigation.sensors')}
                    </Nav.Link>
                    <NavDropdown title={<>
                        <i className="fas fa-users" />{' '}
                        {t('views.navigation.labbers')}
                    </>}>
                        <NavDropdown.Item as={NavLink} to="/fauna/users">
                            {t('views.navigation.management')}
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={<>
                        <i className="fas fa-user" />{' '}
                        {t('views.navigation.account')}
                    </>} className="ms-0 ms-lg-auto">
                        <NavDropdown.Item as={NavLink} to="/users/edit">
                            {t('views.navigation.view_edit')}
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/user/network_devices">
                            {t('views.navigation.network_devices')}
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/oauth/applications">
                            {t('views.navigation.oauth_application_management')}
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/authorized_applications">
                            {t('views.navigation.oauth_token_management')}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={NavLink} to="/users/sign_out">
                            {t('views.navigation.sign_out')}
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
};

export default NavBar;
