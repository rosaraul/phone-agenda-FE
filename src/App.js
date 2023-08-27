import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from "./components/Landing/LandingPage";
import LoginPage from "./components/Login/LoginPage";
import Navbar from "./components/Shared/Navbar";
import RegisterPage from "./components/Register/RegisterPage";
import MainPage from "./components/Contacts/MainPage";
import ContactsProtectedRoute from "./utils/ContactsProtectedRoute";

function App() {
    return (

            <div className="App">
                <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/contacts" element={<ContactsProtectedRoute><MainPage/></ContactsProtectedRoute>}/>
                </Routes>
                </Router>
            </div>


    );
}

export default App;
