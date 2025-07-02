import React, { useEffect, useState } from "react";
import { showToast } from "../components/Toast";

const MisActividades = () => {
    const [actividades, setActividades] = useState([]);
    const usuarioId = localStorage.getItem("usuario_id");

    useEffect(() => {
        const fetchInscripciones = async () => {
            try {
                const response = await fetch(`http://localhost:8080/usuario/${usuarioId}/inscripcion`);
                if (!response.ok) throw new Error("Error al obtener inscripciones");
                const data = await response.json();
                setActividades(data);
            } catch {
                showToast("error", "No se pudieron cargar tus actividades.");
            }
        };

        fetchInscripciones();
    }, [usuarioId]);

    return (
        <div className="mis-actividades">
            <h2>Mis actividades</h2>
            {actividades.length === 0 ? (
                <p>No estás inscripto en ninguna actividad.</p>
            ) : (
                <ul>
                    {actividades.map((item) => (
                        <li key={item.id}>
                            <strong>{item.actividad_nombre}</strong> — {item.horario} — Instructor: {item.usuario_nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MisActividades;
