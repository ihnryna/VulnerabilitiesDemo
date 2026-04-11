import './App.css'
import {useEffect, useState} from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

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
            return <div className="min-h-screen flex flex-col">
                <div className="text-center items-center justify-center">
                    <h1 className="text-3xl text-secondary font-bold mt-20">Вітаємо Вас в нашій безпечній соцмережі!</h1>
                    <h3 className="text-2xl font-bold mt-20">Ваш акаунт створено. Перезавантажте сторінку та увійдіть</h3>
                </div>
            </div>;
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
        </>
    )
}

export default App
