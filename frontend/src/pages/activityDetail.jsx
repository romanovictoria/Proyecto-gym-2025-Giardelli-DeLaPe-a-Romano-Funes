import "@styles/Home.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
<<<<<<< HEAD
import '../styles/Activities.css';
=======
import { showToast } from "../components/Toast";
import "../styles/Activities.css";
>>>>>>> 9711e85b61875286270a5d2d03b3c6fc2f3f8587

const FitroId = () => {
  const { id } = useParams();
  const [actividades, setActividades] = useState([]);

<<<<<<< HEAD
    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (isAdmin === "false") {
            console.log("Hola");
            fetchActividad();
        }
    }, []);

    const fetchActividad = async () => {
        try {
            const response = await fetch("http://localhost:8080/home");
            const data = await response.json();
            setActividades(data);
        } catch (error) {
            console.error("Error al obtener actividades:", error);
        }
    };
    const actividadesFiltradas = actividades.filter(actividad => actividad.id === parseInt(id));

    return (
        <div>
            <div>
                <h2>¡Bienvenido a la Página de Inicio de Vital Gym!</h2>
                <p>Explora nuestras actividades y planes.</p>
            </div>

            <div className="actividad_caracteristica">
                <h2>Todas las Actividades</h2>
                <ul>
                    {actividadesFiltradas.length > 0 ? (
                        actividadesFiltradas.map((actividad) => (
                            <li key={actividad.id} className="ActivityItem">
                                <p>
                                    <strong>Nombre:</strong> {actividad.nombre}
                                </p>
                                <p>
                                    <strong>Descripcion:</strong> {actividad.descripcion}
                                </p>
                                <p>
                                    <strong>Categoria:</strong> {actividad.categoria}
                                </p>
                                <p>
                                    <strong>Horario:</strong>{" "}
                                    {new Date(actividad.horario * 1000).toLocaleString()}
                                </p>
                                <p>
                                    <strong>Cupo:</strong> {actividad.cupo}
                                </p>
                                <p>
                                    <strong>Profesor:</strong> {actividad.usuario_nombre}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p>No se encontraron actividades.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};
=======
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "false") {
      console.log("Hola");
      fetchActividad();
    }
  }, []);

  const fetchActividad = async () => {
    try {
      const response = await fetch("http://localhost:8080/home");
      const data = await response.json();
      setActividades(data);
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    }
  };
  const actividadesFiltradas = actividades.filter(actividad => actividad.id === parseInt(id));
  const funcionInscripcion = async (actividadId) => {
    try {
      const usuarioId = localStorage.getItem("usuario_id"); // o de donde lo tengas

      const response = await fetch("http://localhost:8080/inscripcion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: parseInt(usuarioId),
          actividad_id: parseInt(actividadId),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al inscribirse");
      }

      const data = await response.json();
      showToast("Inscripcion Aceptada", "success");
      console.log("Inscripción:", data);
    } catch (error) {
      console.error("Error en la inscripción:", error);
      showToast("Inscripcion rechazada", "error");
    }
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
          {actividadesFiltradas.length > 0 ? (
            actividadesFiltradas.map((actividad) => (
              <li key={actividad.id} className="Activity_id" >
                <p>
                  <strong>Nombre:</strong> {actividad.nombre}
                </p>
                <p>
                  <strong>Descripcion:</strong> {actividad.descripcion}
                </p>
                <p>
                  <strong>Categoria:</strong> {actividad.categoria}
                </p>
                <p>
                  <strong>Horario:</strong>{" "}
                  {new Date(actividad.horario * 1000).toLocaleString()}
                </p>
                <p>
                  <strong>Cupo:</strong> {actividad.cupo}
                </p>
                <p>
                  <strong>Profesor:</strong> {actividad.usuario_nombre}
                </p>
                <button onClick={() => funcionInscripcion(actividad.id)} className="button_inscripcion">
                  Inscribirse
                </button>
              </li>
            ))
          ) : (
            <p>No se encontraron actividades.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

>>>>>>> 9711e85b61875286270a5d2d03b3c6fc2f3f8587

export default FitroId;