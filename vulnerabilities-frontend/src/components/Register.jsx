import {useState} from "react";
import api from "../api/axios";

export default function Register({onBack, onForward}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [authError, setAuthError] = useState("");

    const handleSubmit = async () => {
        try {
            if (name?.trim().length === 0) {
                setNameError("Будь ласка введіть ім'я");
            }
            if (email?.trim().length === 0) {
                setEmailError("Будь ласка введіть email");
            }
            if (password?.trim().length === 0) {
                setPassError("Будь ласка введіть пароль");
            }
            if (name?.trim().length === 0 || email?.trim().length === 0 || password?.trim().length === 0) {
                return;
            }
            const res = await api.post("/auth/register", {
                name,
                email,
                password
            });
            if (res.status === 200) {
                onForward();
            }

        } catch (err) {
            if (err.response) {
                if (err.response.data.message === "User email already exists") {
                    setEmailError("Користувач з таким email вже існує");
                } else if (err.response.data.message === "User name already exists") {
                    setNameError("Користувач з таким ім'ям вже існує");
                }
            } else {
                console.log(err.response);
            }
        }
    };

    const validateEmail = (email) => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("");
        } else {
            setEmailError("Введіть, будь ласка, дійсний email");
        }
    }

    return <div className="min-h-screen flex flex-col">
        <div className="text-center items-center justify-center">
            <h1 className="text-3xl text-secondary font-bold mt-20">Вітаємо Вас в бібліотеці!</h1>
        </div>

        <div className="flex-1 flex items-center justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
                <legend className="fieldset-legend text-lg">Реєстрація</legend>

                <label className="label text-lg">Ім'я</label>
                <input type="text"
                       className={`input text-lg w-full ${nameError || authError ? 'input-error' : 'input-neutral'}`}
                       placeholder="username" value={name}
                       onChange={(e) => {
                           if (e.target.value.trim()) setNameError("");
                           setName(e.target.value);
                           setAuthError("");
                       }}
                />
                {nameError && (
                    <p className="text-error text-sm mb-2">{nameError}</p>
                )}

                <label className="label text-lg">Email</label>
                <input type="email"
                       className={`input text-lg w-full ${emailError || authError ? 'input-error' : 'input-neutral'}`}
                       placeholder="email" value={email}
                       onChange={(e) => {
                           if (e.target.value.trim()) setEmailError("");
                           setEmail(e.target.value);
                           setAuthError("");
                       }}
                       onBlur={(e) => {
                           validateEmail(email)
                       }}
                />
                {emailError && (
                    <p className="text-error text-sm mb-2">{emailError}</p>
                )}

                <label className="label text-lg">Пароль</label>
                <input type="password"
                       className={`input text-lg w-full ${passError || authError ? 'input-error' : 'input-neutral'}`}
                       placeholder="password" value={password}
                       onChange={(e) => {
                           if (e.target.value.trim()) setPassError("");
                           setPassword(e.target.value);
                           setAuthError("");
                       }}/>
                {passError && (
                    <p className="text-error text-sm mb-2">{passError}</p>
                )}
                {authError && (
                    <p className="text-error text-sm mb-2">{authError}</p>
                )}
                <button className="btn btn-neutral mt-4 text-lg" onClick={handleSubmit}>Зареєструватись</button>
                <p className="text-lg text-base-content/50 mt-5">Вже маєте акаунт? <a className="underline" onClick={onBack}>Увійти</a></p>
            </fieldset>
        </div>
    </div>;
}