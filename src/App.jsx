import './App.css';
import Dashboard from "./pages/Dashboard";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import {Route, Routes} from "react-router-dom";
import UsersPresent from "./pages/UsersPresent";
import Sensors from "./pages/Sensors";

function App() {
    return (<>
        <NavBar />
        <main>
            <Routes>
                {/*<Route path="/door/status">*/}
                {/*    door status*/}
                {/*</Route>*/}
                <Route path="/users/present" element={<UsersPresent />} />
                <Route path="/sensors" element={<Sensors />} />
                <Route path="*" element={<Dashboard />} />
            </Routes>
        </main>
        <Footer />
    </>);
}

export default App;
