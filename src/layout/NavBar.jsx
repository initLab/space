import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './NavBar.css';
import logo from '../assets/logo.svg';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doorLockStatusSelector, doorStateSelector } from '../features/doorSlice.js';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import WarningIcon from '../widgets/icons/WarningIcon.jsx';
import LockIcon from '../widgets/icons/LockIcon.jsx';
import UnlockIcon from '../widgets/icons/UnlockIcon.jsx';
import BusyIcon from '../widgets/icons/BusyIcon.jsx';
import { getToken } from '../authStorage.js';
import DoorClosedIcon from '../widgets/icons/DoorClosedIcon.jsx';
import DoorOpenIcon from '../widgets/icons/DoorOpenIcon.jsx';
import { useGetCurrentUserQuery } from '../features/apiSlice.js';

const NavBar = () => {
    const {t} = useTranslation();
    const doorClosed = useSelector(doorStateSelector('closed'));
    const doorLockStatus = useSelector(doorLockStatusSelector());
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const isLoggedIn = getToken() !== null;
    const {
        data,
        isSuccess,
    } = useGetCurrentUserQuery(undefined, {
        skip: !isLoggedIn,
    });
    const isBoardMember = isSuccess && data.roles.includes('board_member');

    return (<Navbar bg="primary" variant="dark" expand="lg" className="py-0">
        <Container>
            <Navbar.Brand as={NavLink} to="/">
                <Image src={logo} className="logo" alt="Fauna" />
            </Navbar.Brand>
            <Navbar.Text className="flex-grow-1 flex-lg-grow-0 text-end pe-3 pe-lg-0">
                {doorClosed ? <DoorClosedIcon /> : <DoorOpenIcon />}
            </Navbar.Text>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="flex-grow-1">
                    <Nav.Link as={NavLink} to="/doors">
                        {doorLockStatus === 'uninitialized' && <>
                            <LoadingIcon /> ...
                        </>}
                        {doorLockStatus === 'locked' && <>
                            <LockIcon /> {t('views.doors.locked')}
                        </>}
                        {doorLockStatus === 'unlocked' && <>
                            <UnlockIcon /> {t('views.doors.unlocked')}
                        </>}
                        {doorLockStatus === 'busy' && <>
                            <BusyIcon /> ...
                        </>}
                        {doorLockStatus === 'invalid' && <>
                            <WarningIcon /> {t('views.doors.unknown')}
                        </>}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/users/present">
                        <i className="fas fa-street-view" />{' '}
                        {t('views.navigation.presence')}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/sensors">
                        <i className="fas fa-chart-line" />{' '}
                        {t('views.navigation.sensors')}
                    </Nav.Link>
                    {isBoardMember && <Nav.Link href={backendUrl + 'fauna/users'}>
                        <i className="fas fa-users" />{' '}
                        {t('views.navigation.labbers')}
                    </Nav.Link>}
                    {isLoggedIn ? <NavDropdown title={<>
                            <i className="fas fa-user" />{' '}
                            {t('views.navigation.account')}
                        </>} className="ms-0 ms-lg-auto">
                        <NavDropdown.Item href={backendUrl + 'users/edit'}>
                            {t('views.navigation.view_edit')}
                        </NavDropdown.Item>
                        <NavDropdown.Item href={backendUrl + 'user/network_devices'}>
                            {t('views.navigation.network_devices')}
                        </NavDropdown.Item>
                        <NavDropdown.Item href={backendUrl + 'oauth/applications'}>
                            {t('views.navigation.oauth_application_management')}
                        </NavDropdown.Item>
                        <NavDropdown.Item href={backendUrl + 'oauth/authorized_applications'}>
                            {t('views.navigation.oauth_token_management')}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={NavLink} to="/logout">
                            {t('views.navigation.sign_out')}
                        </NavDropdown.Item>
                    </NavDropdown> : <Nav.Link as={NavLink} to="/login" className="ms-0 ms-lg-auto">
                        <i className="fas fa-sign-in" />{' '}
                        {t('views.navigation.sign_in')}
                    </Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
};

export default NavBar;
