import "@styles/Home.css";
import { useState, useEffect } from "react";
import { showToast } from "../components/Toast";

const Home = () => {
  const [actividades, setActividades] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [fechaHora, setFechaHora] = useState('');
  const [nombre, setNombre] = useState("");   // Falta definir el estado y función para el filtro por nombre

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "false") {
      console.log("Hola");
      fetchActividad();
      fetchCategoria();
    }
  }, []);

  const fetchActividad = async () => {
    try {
      const response = await fetch("http://localhost:8080/home");
      const data = await response.json();
      console.log(data)
      setActividades(data);
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    }
  };
  const fetchCategoria = async () => {
    try {
      const response = await fetch("http://localhost:8080/categoria");
      const data = await response.json();
      setCategoria(data);
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    }
  };

  const funcionInscripcion = async (actividadId) => {
    try {
      const usuarioId = localStorage.getItem("usuario_id"); // o de donde lo tengas

      const response = await fetch("http://localhost:8080/inscripcion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inscripcion: {
            usuario_id: parseInt(usuarioId),
            actividad_id: parseInt(actividadId),
          },
          token: localStorage.getItem("token"),
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

      <div className="actividad_filtros">
        {/* Filtro por nombre */}
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="filtro_input"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* Filtro por categoría*/}
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="filtro_input"
          id="categoriaInput"
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.nombre}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        {/* Filtro por horario */}
        <input
          type="datetime-local"
          value={fechaHora}
          onChange={(e) => setFechaHora(e.target.value)}
          className="filtro_input"
        />

        {/* Botón único de búsqueda */}
        <button
          onClick={() => {
            if (nombre) {
              window.location.href = `/home/${nombre}`;
            } else if (categoriaSeleccionada) {
              window.location.href = `/home/categoria/${categoriaSeleccionada}`;
            } else if (fechaHora) {
              const horario = Math.floor(new Date(fechaHora).getTime() / 1000);
              window.location.href = `/home/horario/${horario}`;
            } else {
              alert("Por favor, complete al menos un campo para buscar.");
            }
          }}
          className="button_buscar"
        >
          Buscar
        </button>
      </div>

      <div className="actividad_caracteristica">
        <h2>Todas las Actividades</h2>
        <ul>
          {actividades.length > 0 ? (
            actividades.map((actividad) => (
              <li key={actividad.id} className="acti_filtro">
                <p><strong>Título:</strong> {actividad.nombre}</p>
                <p><strong>Horario:</strong> {new Date(actividad.horario * 1000).toLocaleString()}</p>
                <p>Profesor: {actividad.usuario_nombre}</p>
                <button onClick={() => window.location.href = `/home/id/${actividad.id}`} className="button_detalles">
                  Detalles
                </button>
                <button onClick={() => funcionInscripcion(actividad.id)} className="button_detalles">
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

export default Home;
