import {useState} from "react";
import api from "../api/axios";

export default function Login({onLogin, onRegister}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [authError, setAuthError] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await api.post("/auth/login", {
                email,
                password
            });
            onLogin(res.data.token);

        } catch (err) {
            if (err.response) {
                if (err.response.data.message === "Wrong email or password") {
                    setAuthError("Неправильний email або пароль");
                } else if (err.response.data.message === "password is required") {
                    setAuthError("Введіть пароль");
                }
            } else {
                console.log(err.response);
            }
        }
    };

    const validateEmail = (email) => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    }

    return <div className="min-h-screen flex flex-col">
        <div className="text-center items-center justify-center">
            <h1 className="text-3xl text-secondary font-bold mt-20">Вітаємо Вас в нашій безпечній соцмережі!</h1>
        </div>

        <div className="flex-1 flex items-center justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
                <legend className="fieldset-legend text-lg">Вхід</legend>

                <label className="label text-lg">Email</label>
                <input type="email"
                       className={`input text-lg w-full ${emailError || authError ? 'input-error' : 'input-neutral'}`}
                       placeholder="email" value={email}
                       onChange={(e) => {
                           if (e.target.value.trim()) setEmailError(false);
                           setEmail(e.target.value);
                           setAuthError("");
                       }}
                       onBlur={(e) => {
                           validateEmail(email)
                       }}
                />
                {emailError && (
                    <p className="text-error text-sm mb-2">Введіть, будь ласка, дійсний email</p>
                )}

                <label className="label text-lg">Пароль</label>
                <input type="password"
                       className={`input text-lg w-full ${authError ? 'input-error' : 'input-neutral'}`}
                       placeholder="password" value={password}
                       onChange={(e) => {
                           setPassword(e.target.value);
                           setAuthError("");
                       }}/>
                {authError && (
                    <p className="text-error text-sm mb-2">{authError}</p>
                )}
                <button className="btn btn-neutral mt-4 text-lg" onClick={handleSubmit}>Увійти</button>
                <p className="text-lg text-base-content/50 mt-5">Не маєте акаунту? <a className="underline" onClick={onRegister}>Зареєструватись</a></p>
            </fieldset>
        </div>
    </div>;
}