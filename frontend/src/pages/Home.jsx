import "@styles/Home.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [actividades, setActividades] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [fechaHora, setFechaHora] = useState('');

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

  return (
    <div>
      <div>
        <h2>¡Bienvenido a la Página de Inicio de Vital Gym!</h2>
        <p>Explora nuestras actividades y planes.</p>
      </div>

      {/* Barra de búsqueda con botones */}
      <div className="actividad_filtros" style={{ marginBottom: '20px' }}>
        {/* Filtro por nombre */}
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="filtro_input_nombre"
          id="nombre"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={() => window.location.href = `/home/${nombre.value}`} style={{ marginRight: '20px', padding: '5px 10px' }}>
          Buscar
        </button>

        {/* Filtro por categoría*/}
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          type="text"
          placeholder="Buscar por categoría"
          className="filtro_input_categoria"
          id="categoriaInput"
          style={{ marginRight: '10px', padding: '5px' }}
        >
        <option value="">Selecciona una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.nombre}>
            {categoria.nombre}
          </option>
        ))
        }
        </select>
        <button onClick={() => window.location.href = `/home/categoria/${categoriaSeleccionada}`} style={{ marginRight: '20px', padding: '5px 10px' }}>
          Buscar
        </button>
        

        {/* Filtro por horario TODO calendar */}
        <input
          type="datetime-local"
          value={fechaHora}
          onChange={(e) => setFechaHora(e.target.value)}
          className="filtro_input_horario"
          style={{ marginRight: '10px', padding: '5px' }}
        />

        <button
          onClick={() => {
            if (!fechaHora) return;
            const horario = Math.floor(new Date(fechaHora).getTime() / 1000); // en segundos
            window.location.href = `/home/horario/${horario}`;
          }}
          style={{ padding: '5px 10px' }}>
          Buscar
          </button>
      </div>

      <div className="actividad_caracteristica">
        <h2>Todas las Actividades</h2>
        <ul>
          {actividades.length > 0 ? (
            actividades.map((actividad) => (
            <li key={actividad.id} style={{ marginBottom: '15px' }}>
              <p><strong>Título:</strong> {actividad.nombre}</p>
              <p><strong>Horario:</strong> {new Date(actividad.horario * 1000).toLocaleString()}</p>
              <p>Profesor: {actividad.usuario_nombre}</p>
              <button onClick={() => window.location.href = `/home/id/${actividad.id}`} style={{ padding: '5px 10px' }}>
                Detalles
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