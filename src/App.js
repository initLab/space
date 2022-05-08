import './App.css';
import Dashboard from "./pages/Dashboard";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";

function App() {
    return (<>
        <NavBar />
        <main>
            <Dashboard />
        </main>
        <Footer />
    </>);
}

export default App;
