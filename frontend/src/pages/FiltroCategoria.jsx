import "@styles/Home.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../styles/Activities.css';

const FitroCategoria = () => {
    const { categoria } = useParams();
    const [actividades, setActividades] = useState([]);

    useEffect(() => {
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

    const actividadesFiltradas = actividades.filter(actividad =>
        actividad.categoria_descripcion === categoria
    );

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
                                <p><strong>Título:</strong> {actividad.nombre}</p>
                                <p><strong>Horario:</strong> {new Date(actividad.horario * 1000).toLocaleString()}</p>
                                {/* <p>Profesor: {actividad.usuario.nombre}</p> */}
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

export default FitroCategoria;