import {createElement, useEffect, Suspense} from 'react';
import {Container} from 'react-bootstrap';
import {Route, Routes} from 'react-router-dom';

import LoadingIcon from './widgets/LoadingIcon.tsx';
import NavBar from './layout/NavBar.tsx';
import Footer from './layout/Footer.tsx';
import Sensors from './pages/Sensors.tsx';
import OauthCallback from './pages/OauthCallback.tsx';
import Logout from './pages/Logout.tsx';
import Login from './pages/Login.tsx';
import RequireLoggedIn from './widgets/RequireLoggedIn.tsx';
import ActionLog from './pages/ActionLog.tsx';
import {useVariant} from './hooks/useVariant.ts';
import {getDoorActions, getHvacActions, getLightActions} from "./utils/device.ts";
import Devices from "./pages/Devices.tsx";
import {useDocumentTitle} from '@uidotdev/usehooks';
import {useTheme} from './hooks/useTheme.ts';

function App() {
    const variant = useVariant();
    useDocumentTitle(variant.title);
    const [theme] = useTheme();
    useEffect(() => document.documentElement.setAttribute('data-bs-theme', theme), [theme]);

    return (<Suspense fallback={<LoadingIcon/>}>
        <NavBar/>
        <main>
            <Container as="section" className="mt-4">
                <Routes>
                    <Route path="/" element={createElement(variant.dashboard)}/>
                    <Route path="/doors" element={<RequireLoggedIn>
                        <Devices deviceGroup="door" deviceActionMapper={getDoorActions}/>
                    </RequireLoggedIn>}/>
                    <Route path="/lights" element={<RequireLoggedIn>
                        <Devices deviceGroup="light" deviceActionMapper={getLightActions}/>
                    </RequireLoggedIn>}/>
                    <Route path="/hvac" element={<RequireLoggedIn>
                        <Devices deviceGroup="hvac" deviceActionMapper={getHvacActions}/>
                    </RequireLoggedIn>}/>
                    <Route path="/sensors" element={<Sensors/>}/>
                    <Route path="/action-log" element={<ActionLog/>}/>
                    <Route path="/oauth-callback" element={<OauthCallback/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </Container>
        </main>
        <Footer/>
    </Suspense>);
}

export default App;
