import './App.css'
import {useEffect, useState} from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Welcome from "./components/Welcome.jsx";
import MainPage from "./components/MainPage.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [authMode, setAuthMode] = useState("login");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const path = window.location.pathname;

        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload);
            setIsAuth(true);
        }
    }, []);


    const handleLogin = (token) => {
        localStorage.setItem("token", token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log(payload);
        setUser(payload);
        setIsAuth(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        setUser(null);
    };

    if (!isAuth) {
        if (authMode === "login") {
            return <Login
                onLogin={handleLogin}
                onRegister={() => setAuthMode("register")}
            />;
        } else if (authMode === "register") {
            return <Register
                onBack={() => setAuthMode("login")}
                onForward={() => setAuthMode("welcome")}
            />;
        } else if (authMode === "welcome") {
            return <Welcome />;
        }
    }
    console.log(user);

    return (
        <>
            <NavBar user={user}
                    onLogout={handleLogout}/>
            <MainPage user={user}/>
        </>
    )
}

export default App
