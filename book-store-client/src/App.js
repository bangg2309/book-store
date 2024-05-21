import "./App.css";
import './index.css';
import Router from "./router/Router";
import {ToastContainer} from "react-toastify";
function App() {
    return (
        <div className="App">
            <ToastContainer/>
            <Router></Router>
        </div>
    );
}

export default App;

