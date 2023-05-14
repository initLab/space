import Dashboard from './pages/Dashboard';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import { Route, Routes } from 'react-router-dom';
import Sensors from './pages/Sensors';
import Doors from './pages/Doors.jsx';
import OauthCallback from './pages/OauthCallback.jsx';
import Logout from './pages/Logout.jsx';
import { Container } from 'react-bootstrap';
import PresentUsersWrapper from './widgets/PresentUsersWrapper/PresentUsersWrapper.jsx';
import Login from './pages/Login.jsx';

function App() {
    return (<>
        <NavBar />
        <main>
            <Container as="section" className="mt-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/doors" element={<Doors />} />
                    <Route path="/users/present" element={<PresentUsersWrapper />} />
                    <Route path="/sensors" element={<Sensors />} />
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
