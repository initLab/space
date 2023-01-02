import './App.css';
import Dashboard from './pages/Dashboard';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import {Route, Routes, useLocation} from 'react-router-dom';
import UsersPresent from './pages/UsersPresent';
import Sensors from './pages/Sensors';
import Doors from './pages/Doors.jsx';
import OauthCallback from "./pages/OauthCallback.jsx";
import {useEffect} from "react";
import {checkAuth} from "./authStorage.js";
import Logout from "./pages/Logout.jsx";

function App() {
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [location]);

    return (<>
        <NavBar />
        <main>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/doors" element={<Doors />} />
                <Route path="/users/present" element={<UsersPresent />} />
                <Route path="/sensors" element={<Sensors />} />
                <Route path="/oauth-callback" element={<OauthCallback />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </main>
        <Footer />
    </>);
}

export default App;
