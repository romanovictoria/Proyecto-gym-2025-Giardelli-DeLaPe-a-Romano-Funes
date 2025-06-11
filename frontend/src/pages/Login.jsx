import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "@styles/Login.css";
import { useApiRequest } from '../hooks/useApiRequest';
import { showToast } from '../components/Toast';


const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const { data, error, request: fetchLogin } = useApiRequest("https://jsonplaceholder.typicode.com/users")

    const body = JSON.stringify({ userName, password })


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(`login: username ${userName}, password ${password}`)
        showToast(`Bienvenido ${userName}`)
        showToast(`Credenciales invalidas`, "error")
        /* fetchLogin("ENDOPOINT DE LOGIN", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, password }),
        }) */

        /* if (userName == "admin" && password == "admin") {  // aca se tiene que hacer una llamada a la API para validar el usuario y contraseña
            console.log("Login OK");
            localStorage.setItem('isLoggedIn', true);
            Navigate("/actividades");
        } else {
            console.log("Login Incorrecto");
        } */
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
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
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