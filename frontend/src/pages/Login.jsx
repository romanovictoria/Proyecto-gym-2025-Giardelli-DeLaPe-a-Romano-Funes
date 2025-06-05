import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "@styles/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username == "admin" && password == "admin") {
            console.log("Login OK");
            localStorage.setItem("isLoggedIn", "true");
            Navigate("/actividades");
        } else {
            console.log("Login Incorrecto");
        }
    }


    return (
        <div className="login-container">
            <div>
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>
                        Iniciar sesión
                    </h2>
                    <input
                        type="text"
                        placeholder="Usuario"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;