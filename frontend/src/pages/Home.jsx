import "@styles/Home.css";
import { useState, useEffect } from "react";
const Home = () => {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    // Verificar si el usuario es un administrador al cargar la página
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "false") {
      console.log("Hola");
      fetchActividad();
    }
  }, []);

 const fetchActividad = async () => {
  try {
    const response = await fetch("http://localhost:8080/actividad");
    const data = await response.json();
    setActividades(data);
  } catch (error) {
    console.error("Error al obtener actividades:", error);
  }
};
  console.log(actividades);
  return (
    <div>
      <div>
        <h2>¡Bienvenido a la Página de Inicio de Vital Gym!</h2>
        <p>Explora nuestras actividades y planes.</p>
      </div>
      <div className="actividad_caracteristica">
        <h2>Todas las Actividades</h2>
        <ul>
          {actividades.map((actividad) => (
            <li key={actividad.id}>
              {" "}
              {/* es un clasificador pero es un identificador que basicamente es un numero */}
              {/* Mostrar los detalles de la actividad */}
              <p>Titulo: {actividad.nombre}</p>
              <p>Horario: {actividad.horario}</p>
              {/* <p>Profesor: {actividad.usuario.nombre}</p> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
