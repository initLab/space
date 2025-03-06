import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard.jsx';
import NavBar from './layout/NavBar.jsx';
import Footer from './layout/Footer.jsx';
import Sensors from './pages/Sensors.jsx';
import Doors from './pages/Doors.jsx';
import OauthCallback from './pages/OauthCallback.jsx';
import Logout from './pages/Logout.jsx';
import Login from './pages/Login.jsx';
import RequireLoggedIn from './widgets/Route/RequireLoggedIn.jsx';
import ActionLog from './pages/ActionLog.jsx';
import Lights from './pages/Lights.jsx';
import Hvac from './pages/Hvac.jsx';
import { useVariant } from './hooks/useVariant.js';

function App() {
    const variant = useVariant();

    useEffect(() => {
        if (variant === 'colibri') {
            document.title = 'Casa Libri';
        }
    }, [variant]);

    return (<>
        <NavBar />
        <main>
            <Container as="section" className="mt-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/doors" element={<RequireLoggedIn>
                        <Doors />
                    </RequireLoggedIn>} />
                    <Route path="/lights" element={<RequireLoggedIn>
                        <Lights />
                    </RequireLoggedIn>} />
                    <Route path="/hvac" element={<RequireLoggedIn>
                        <Hvac />
                    </RequireLoggedIn>} />
                    <Route path="/sensors" element={<Sensors />} />
                    <Route path="/action-log" element={<ActionLog />} />
                    <Route path="/oauth-callback" element={<OauthCallback />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Container>
        </main>
        <Footer />
    </>);
}

export default App;
