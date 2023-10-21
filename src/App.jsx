import Dashboard from './pages/Dashboard';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import { Route, Routes } from 'react-router-dom';
import Sensors from './pages/Sensors';
import Doors from './pages/Doors.jsx';
import OauthCallback from './pages/OauthCallback.jsx';
import Logout from './pages/Logout.jsx';
import { Container } from 'react-bootstrap';
import Login from './pages/Login.jsx';
import { RequireLoggedIn } from './widgets/Route/RequireLoggedIn.jsx';
import ActionLog from './pages/ActionLog.jsx';
import Lights from './pages/Lights.jsx';

function App() {
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
