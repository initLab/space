import './App.css';
import Dashboard from "./pages/Dashboard";
import NavBar from "./layout/NavBar";

function App() {
    return (<>
        <NavBar />
        <main>
            <Dashboard />
        </main>
        <div>footer</div>
    </>);
}

export default App;
