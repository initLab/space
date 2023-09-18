import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './NavBar.css';
import initLabLogo from '../assets/initlab/logo.svg';
import colibriLogo from '../assets/colibri/logo.png';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doorLockStatusSelector, doorStateSelector } from '../features/doorSlice.js';
import LoadingIcon from '../widgets/icons/LoadingIcon.jsx';
import WarningIcon from '../widgets/icons/WarningIcon.jsx';
import LockIcon from '../widgets/icons/LockIcon.jsx';
import UnlockIcon from '../widgets/icons/UnlockIcon.jsx';
import BusyIcon from '../widgets/icons/BusyIcon.jsx';
import { useAuthStorage } from '../hooks/useAuthStorage.js';
import DoorClosedIcon from '../widgets/icons/DoorClosedIcon.jsx';
import DoorOpenIcon from '../widgets/icons/DoorOpenIcon.jsx';
import { useGetCurrentUserQuery } from '../features/apiSlice.js';
import { useEffect } from 'react';
import i18n from '../i18n.js';
import { useVariant } from '../hooks/useVariant.js';

const NavBar = () => {
    const {t} = useTranslation();
    const doorClosed = useSelector(doorStateSelector('closed'));
    const doorLockStatus = useSelector(doorLockStatusSelector());
    const backendUrl = import.meta.env.BACKEND_URL;
    const { accessToken } = useAuthStorage();
    const isLoggedIn = !!accessToken;
    const {
        data,
        isSuccess,
    } = useGetCurrentUserQuery(undefined, {
        skip: !isLoggedIn,
    });
    const variant = useVariant();
    const isInitLab = variant === 'initlab';
    const isColibri = variant === 'colibri';
    const isBoardMember = isSuccess && data.roles.includes('board_member');

    useEffect(function() {
        if (isSuccess) {
            i18n.changeLanguage(data.locale).then(() => {});
        }
    }, [data?.locale, isSuccess]);

    const location = useLocation();

    return (<Navbar {...({
        ...isInitLab && {
            bg: 'primary',
            variant: 'dark',
        },
        ...isColibri && {
            bg: 'light',
        }
    })} expand="lg" className="py-0">
        <Container>
            {isInitLab && <Navbar.Brand as={NavLink} to="/">
                <Image src={initLabLogo} className="logo" alt="init Lab logo" />
            </Navbar.Brand>}
            {isColibri && <Navbar.Brand as={NavLink} to="/doors">
                <Image src={colibriLogo} className="logo" alt="Colibri logo" />
            </Navbar.Brand>}
            <Navbar.Text className="flex-grow-1 flex-lg-grow-0 text-end pe-3 pe-lg-0">
                {doorClosed === undefined ? <LoadingIcon /> : (
                    doorClosed ? <DoorClosedIcon /> : <DoorOpenIcon />
                )}
            </Navbar.Text>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="flex-grow-1">
                    <Nav.Link as={NavLink} to="/doors">
                        {doorLockStatus === 'uninitialized' && <>
                            <LoadingIcon />
                        </>}
                        {doorLockStatus === 'locked' && <>
                            <LockIcon /> {t('views.doors.locked')}
                        </>}
                        {doorLockStatus === 'unlocked' && <>
                            <UnlockIcon /> {t('views.doors.unlocked')}
                        </>}
                        {doorLockStatus === 'busy' && <>
                            <BusyIcon />
                        </>}
                        {doorLockStatus === 'invalid' && <>
                            <WarningIcon /> {t('views.doors.unknown')}
                        </>}
                    </Nav.Link>
                    {isInitLab && <>
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
                    </>}
                    {isLoggedIn ? <NavDropdown title={<>
                            <i className="fas fa-user" />{' '}
                            {t('views.navigation.account')}
                        </>} className="ms-0 ms-lg-auto">
                        <NavDropdown.Item href={backendUrl + 'users/edit'}>
                            {t('views.navigation.view_edit')}
                        </NavDropdown.Item>
                        {isInitLab && <>
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
                        </>}
                        <NavDropdown.Item as={NavLink} to="/logout" state={{
                            from: location,
                        }}>
                            {t('views.navigation.sign_out')}
                        </NavDropdown.Item>
                    </NavDropdown> : <Nav.Link as={NavLink} to="/login" state={{
                        from: location,
                    }} className="ms-0 ms-lg-auto">
                        <i className="fas fa-sign-in" />{' '}
                        {t('views.navigation.sign_in')}
                    </Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
};

export default NavBar;
