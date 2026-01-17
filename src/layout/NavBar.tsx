import {NavLink, useLocation} from 'react-router-dom';
import {Container, Image, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import './NavBar.css';
import {useVariant} from '../hooks/useVariant.ts';
import {useCurrentUser} from '../hooks/useEndpoints.ts';
import {useTheme} from '../hooks/useTheme.ts';
import RequireRole from '../widgets/RequireRole.tsx';
import RequireVariant from "../widgets/RequireVariant.tsx";
import {useLocale} from '../hooks/useLocale.ts';

const NavBar = () => {
    const {t} = useTranslation();
    const [locale, setLocale] = useLocale();
    const backendUrl = import.meta.env.OIDC_AUTHORITY_URL;
    const {
        data: user,
    } = useCurrentUser();
    const variant = useVariant();

    const [theme, setTheme] = useTheme();
    const changeLanguage = async () =>
        setLocale((!locale || locale == 'bg') ? 'en' : 'bg');

    const changeTheme = () => setTheme(theme == 'light' ? 'dark' : 'light');

//    useEffect(function () {
//       if (user?.locale) {
//            i18n.changeLanguage(user.locale).then(() => {
//            });
//        }
//    }, [user]);

    const location = useLocation();

    return (<Navbar {...variant.navbar} expand="lg" className="py-0">
        <Container>
            <Navbar.Brand as={NavLink} to="/">
                <Image src={variant.logo.url} className="logo" alt={variant.logo.alt}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="flex-grow-1">
                    <RequireRole roles={['board_member', 'infra', 'trusted_member', 'landlord', 'tenant']}>
                        <Nav.Link as={NavLink} to="/doors">
                            <i className="fa-solid fa-door-closed"/>
                            {t('views.navigation.door_access')}
                        </Nav.Link>
                    </RequireRole>
                    <RequireRole roles={['board_member', 'infra', 'landlord', 'tenant']}>
                        <Nav.Link as={NavLink} to="/lights">
                            <i className="fa-solid fa-lightbulb"/>{' '}
                            {t('views.navigation.lights')}
                        </Nav.Link>
                    </RequireRole>
                    <RequireRole roles={['trusted_member', 'board_member', 'infra']}>
                        <Nav.Link as={NavLink} to="/hvac">
                            <i className="fa-solid fa-fan"/>{' '}
                            {t('views.navigation.hvac')}
                        </Nav.Link>
                    </RequireRole>
                    <RequireVariant variant="initlab">
                        <Nav.Link as={NavLink} to="/sensors">
                            <i className="fa-solid fa-chart-line"/>{' '}
                            {t('views.navigation.sensors')}
                        </Nav.Link>
                    </RequireVariant>
                    <RequireRole roles={['board_member', 'infra']}>
                        <Nav.Link as={NavLink} to="/action-log">
                            <i className="fa-solid fa-book"/>{' '}
                            {t('views.navigation.action_log')}
                        </Nav.Link>
                    </RequireRole>
                    <RequireRole roles={['board_member']}>
                        <Nav.Link href={backendUrl + 'fauna/users'}>
                            <i className="fa-solid fa-users"/>{' '}
                            {t('views.navigation.labbers')}
                        </Nav.Link>
                    </RequireRole>
                </Nav>
                <Nav>
                    <Nav.Link onClick={changeLanguage}><i className="fa-solid fa-language"/>{' '}<span
                        className={'d-lg-none'}>{t('views.navigation.language')}</span></Nav.Link>
                    <Nav.Link onClick={changeTheme}><i className="fa-solid fa-circle-half-stroke"/>{' '}<span
                        className={'d-lg-none'}>{t('views.navigation.dark_mode')}</span></Nav.Link>
                    {user ? <NavDropdown title={<>
                        <i className="fa-solid fa-user"/>{' '}
                        {t('views.navigation.account')}
                    </>} className="ms-0 ms-lg-auto">
                        <NavDropdown.Item href={backendUrl + 'users/edit'}>
                            {t('views.navigation.view_edit')}
                        </NavDropdown.Item>
                        <RequireVariant variant="initlab">
                            <NavDropdown.Item href={backendUrl + 'user/network_devices'}>
                                {t('views.navigation.network_devices')}
                            </NavDropdown.Item>
                            <NavDropdown.Item href={backendUrl + 'oauth/applications'}>
                                {t('views.navigation.oauth_application_management')}
                            </NavDropdown.Item>
                            <NavDropdown.Item href={backendUrl + 'oauth/authorized_applications'}>
                                {t('views.navigation.oauth_token_management')}
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                        </RequireVariant>
                        <NavDropdown.Item as={NavLink} to="/logout" state={{
                            from: location.pathname === '/doors' ? null : location,
                        }}>
                            {t('views.navigation.sign_out')}
                        </NavDropdown.Item>
                    </NavDropdown> : <Nav.Link as={NavLink} to="/login" state={{
                        from: location,
                    }} className="ms-0 ms-lg-auto">
                        <i className="fa-solid fa-right-to-bracket"/>{' '}
                        {t('views.navigation.sign_in')}
                    </Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
};

export default NavBar;
