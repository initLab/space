import './App.css';
import Dashboard from "./pages/Dashboard";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import {Route, Switch} from "react-router-dom";
import UsersPresent from "./pages/UsersPresent";
import Sensors from "./pages/Sensors";

function App() {
    return (<>
        <NavBar />
        <main>
            <Switch>
                <Route path="/" exact>
                    <Dashboard />
                </Route>
                <Route path="/door/status">
                    door status
                </Route>
                <Route path="/users/present">
                    <UsersPresent />
                </Route>
                <Route path="/sensors">
                    <Sensors />
                </Route>
                <Route path="/fauna/users">
                    manage
                </Route>
            </Switch>
        </main>
        <Footer />
    </>);
}

export default App;
