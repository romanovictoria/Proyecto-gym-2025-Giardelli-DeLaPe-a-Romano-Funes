import { useNavigate } from "react-router-dom";
import './App.css'

const App = () => {

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/")
  }

  return (
    <div>

      <h2>¡Bienvenido a la Página de Inicio de Vital Gym!</h2>
      <p>Explora nuestras actividades y planes.</p>

    </div>
  );
};

export default App;