import './App.css';
import Dashboard from "./pages/Dashboard";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import {Route, Switch} from "react-router-dom";
import UsersPresent from "./pages/UsersPresent";

function App() {
    return (<>
        <NavBar />
        <main>
            <Switch>
                <Route path="/users/present">
                    <UsersPresent />
                </Route>
                <Route path="/sensors">
                    sensors
                </Route>
                <Route path="/fauna/users">
                    manage
                </Route>
                <Route path="/">
                    <Dashboard />
                </Route>
            </Switch>
        </main>
        <Footer />
    </>);
}

export default App;
