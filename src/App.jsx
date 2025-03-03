import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard.jsx';
import NavBar from './layout/NavBar.jsx';
import Footer from './layout/Footer.jsx';
import Sensors from './pages/Sensors.jsx';
import Doors from './pages/Doors.jsx';
import ActionLog from './pages/ActionLog.jsx';
import Lights from './pages/Lights.jsx';
import Hvac from './pages/Hvac.jsx';
import { useVariant } from './hooks/useVariant.js';
import { useAuth } from 'react-oidc-context';
import i18n from './i18n.js';

function App() {
    const variant = useVariant();

    useEffect(() => {
        if (variant === 'colibri') {
            document.title = 'Casa Libri';
        }
    }, [variant]);

    const auth = useAuth();

    useEffect(function() {
        if (!auth.isAuthenticated) {
            return ;
        }

        (async () => {
            await i18n.changeLanguage(auth.user.profile?.locale ?? 'bg');
        })();
    }, [auth]);

    return (<>
        <NavBar />
        <main>
            <Container as="section" className="mt-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/doors" element={<Doors />} />
                    <Route path="/lights" element={<Lights />} />
                    <Route path="/hvac" element={<Hvac />} />
                    <Route path="/sensors" element={<Sensors />} />
                    <Route path="/action-log" element={<ActionLog />} />
                </Routes>
            </Container>
        </main>
        <Footer />
    </>);
}

export default App;
