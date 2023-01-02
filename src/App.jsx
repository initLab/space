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

function App() {
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [location]);

    return (<>
        <NavBar />
        <main>
            <Routes>
                <Route path="/doors" element={<Doors />} />
                <Route path="/users/present" element={<UsersPresent />} />
                <Route path="/sensors" element={<Sensors />} />
                <Route path="/oauth-callback" element={<OauthCallback />} />
                <Route path="*" element={<Dashboard />} />
            </Routes>
        </main>
        <Footer />
    </>);
}

export default App;
