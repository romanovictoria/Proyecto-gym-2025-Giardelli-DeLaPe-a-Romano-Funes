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
<<<<<<< HEAD
          usuario_id: parseInt(usuarioId),
          actividad_id: parseInt(actividadId),
=======
          inscripcion: {
            usuario_id: parseInt(usuarioId),
            actividad_id: parseInt(actividadId),
          },
          token: localStorage.getItem("token"),
>>>>>>> 9711e85b61875286270a5d2d03b3c6fc2f3f8587
        }),
      });

      if (!response.ok) {
        throw new Error("Error al inscribirse");
      }

      const data = await response.json();
<<<<<<< HEAD
      alert("¡Inscripción exitosa!"); // TODO TOASTADA
      console.log("Inscripción:", data);
    } catch (error) {
      console.error("Error en la inscripción:", error);
      alert("Hubo un problema con la inscripción.");
    }
  };
=======
      showToast("Inscripcion Aceptada", "success");
      console.log("Inscripción:", data);
    } catch (error) {
      console.error("Error en la inscripción:", error);
      showToast("Inscripcion rechazada", "error");
    }
  };


>>>>>>> 9711e85b61875286270a5d2d03b3c6fc2f3f8587


  return (
    <div>
      <div>
        <h2>¡Bienvenido a la Página de Inicio de Vital Gym!</h2>
        <p>Explora nuestras actividades y planes.</p>
      </div>

<<<<<<< HEAD
      {/* Barra de búsqueda con botones */}
      <div className="actividad_filtros" >
=======
      <div className="actividad_filtros">
>>>>>>> 9711e85b61875286270a5d2d03b3c6fc2f3f8587
        {/* Filtro por nombre */}
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="filtro_input"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
<<<<<<< HEAD
        <button className="buscarButton" onClick={() => window.location.href = `/home/${document.getElementById('nombre').value}`} >
          Buscar
        </button>
=======
>>>>>>> 9711e85b61875286270a5d2d03b3c6fc2f3f8587

        {/* Filtro por categoría*/}
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="filtro_input"
          id="categoriaInput"
<<<<<<< HEAD

=======
>>>>>>> 9711e85b61875286270a5d2d03b3c6fc2f3f8587
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.nombre}>
              {categoria.nombre}
            </option>
<<<<<<< HEAD
          ))
          }
        </select>
        <button className="buscarButton" onClick={() => window.location.href = `/home/categoria/${categoriaSeleccionada}`} >
          Buscar
        </button>

=======
          ))}
        </select>
>>>>>>> 9711e85b61875286270a5d2d03b3c6fc2f3f8587

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
<<<<<<< HEAD
              <li key={actividad.id} style={{ marginBottom: '15px' }}>
                <p><strong>Título:</strong> {actividad.nombre}</p>
                <p><strong>Horario:</strong> {new Date(actividad.horario * 1000).toLocaleString()}</p>
                <p>Profesor: {actividad.usuario_nombre}</p>
                <button onClick={() => window.location.href = `/home/id/${actividad.id}`} style={{ padding: '5px 10px' }}>
                  Detalles
                </button>
                <button onClick={() => funcionInscripcion(actividad.id)} style={{ padding: '5px 10px' }}>
                  Inscripción
=======
              <li key={actividad.id} className="acti_filtro">
                <p><strong>Título:</strong> {actividad.nombre}</p>
                <p><strong>Horario:</strong> {new Date(actividad.horario * 1000).toLocaleString()}</p>
                <p>Profesor: {actividad.usuario_nombre}</p>
                <button onClick={() => window.location.href = `/home/id/${actividad.id}`} className="button_detalles">
                  Detalles
                </button>
                <button onClick={() => funcionInscripcion(actividad.id)} className="button_detalles">
                  Inscribirse
>>>>>>> 9711e85b61875286270a5d2d03b3c6fc2f3f8587
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
