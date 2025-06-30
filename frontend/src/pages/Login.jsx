import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/Login.css";
import { useApiRequest } from "../hooks/useApiRequest";
import { showToast } from "../components/Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { data: loginResponse, error, request: fetchLogin } = useApiRequest();

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      email: email,
      password: password,
    });

    await fetchLogin("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  };

  useEffect(() => {
    if (loginResponse?.token) {
      localStorage.setItem("token", loginResponse?.token);
      const usuarioId = loginResponse?.usuario.id;
      localStorage.setItem("usuario_id", usuarioId);

      const isAdmin = loginResponse?.usuario.rol;
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin));

      showToast("Bienvenido");

      // Redirigir según el rol del usuario
      if (isAdmin) {
        navigate("/admin/home");
      } else {
        navigate("/home");
      }
    }

    if (error) {
      showToast("Credenciales inválidas", "error");
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("token", "");
    }
  }, [loginResponse, error, navigate]);

  return (
    <div className="login-container">
      <div>
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className="login-button" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;