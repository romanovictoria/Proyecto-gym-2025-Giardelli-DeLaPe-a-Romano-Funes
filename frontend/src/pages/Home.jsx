import "@styles/Home.css";
import React, { useEffect, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";

const Home = () => {
  const [actividades, setActividades] = useState([]);
  const {
    data: loginResponse,
    error,
    request: fetchActividad,
  } = useApiRequest();

  useEffect(() => {
    // Verificar si el usuario es un administrador al cargar la página
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      console.log("Hola");
      fetchActividad();
    } else {
      //redirigir a otra página o mostrar un mensaje de acceso denegado
    }
  }, []);

  /* fetchActividad = async () => {
    try {
      // Realizar la solicitud para obtener las actividades de todos los usuarios
      const response = await fetch("http://localhost:8080/actividad");
      const data = await response.json();

      // Almacenar las actividades en el estado
      console.log(data.actividades);
      setActividades(data.actividades);
    } catch (error) {
      console.log("Error al obtener las actividades:", error);
    }
  };
 */
  const handleLogin = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      nombre: nombre,
      descripcion: descripcion,
      id: id,
      categoriaId: categoriaId,
      cupo: cupo,
      horario: horario,
    });

    // Hacer la petición login y obtener la respuesta
    await fetchActividad("http://localhost:8080/actividad", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    console.log(body);
  };

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
              <p>Profesor: {actividad.usuario.nombre}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
