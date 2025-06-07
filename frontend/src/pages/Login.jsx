import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "@styles/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username == "admin" && password == "admin") {  // aca se tiene que hacer una llamada a la API para validar el usuario y contraseña
            console.log("Login OK");
            localStorage.setItem('isLoggedIn', true);
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
                        Iniciar Sesión
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
                    <button className='login-button' type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;