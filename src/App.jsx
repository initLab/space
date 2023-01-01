import './App.css';
import Dashboard from './pages/Dashboard';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import {Route, Routes, useLocation} from 'react-router-dom';
import UsersPresent from './pages/UsersPresent';
import Sensors from './pages/Sensors';
import Doors from './pages/Doors.jsx';
import {useEffect} from 'react';
import {setToken} from "./authStorage.js";

function App() {
    const { hash } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(hash);

        if (params.get('token_type') === 'Bearer' && params.has('access_token')) {
            setToken(params.get('access_token'));
        }
    }, [hash]);

    return (<>
        <NavBar />
        <main>
            <Routes>
                <Route path="/doors" element={<Doors />} />
                <Route path="/users/present" element={<UsersPresent />} />
                <Route path="/sensors" element={<Sensors />} />
                <Route path="*" element={<Dashboard />} />
            </Routes>
        </main>
        <Footer />
    </>);
}

export default App;
