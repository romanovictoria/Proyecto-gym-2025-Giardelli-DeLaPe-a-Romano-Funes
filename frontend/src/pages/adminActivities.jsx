import React, { useState, useEffect } from 'react';
import '@styles/Activities.css'
import { showToast } from '../components/Toast';
import NavBar from "../components/NavBar";

const AdminActivities = () => {
    const [actividades, setActividades] = useState([]);
    const [crearActividad, setCrearActividad] = useState(false);
    const [editarActividad, setEditarActividad] = useState(null);
    const [nombre, setNombre] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [contenidoActividad, setContenidoActividad] = useState({
        nombre: '',
        descripcion: '',
        cupo: 0,
        categoria: '',
        horarios: []
    });

    useEffect(() => {
        fetchActividades();
    }, []);

    function fetchActividades() {
        fetch('http://localhost:8080/actividad')
            .then((res) => res.json())
            .then((data) => setActividades(data))
            .catch((err) => console.error('Error fetching actividades:', err));
    }

    const handleDelete = async (activityId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
            try {
                const response = await fetch(`http://localhost:8080/actividad/${activityId}`, {
                    method: 'DELETE',
                    headers: {}
                });

                if (response.ok) {
                    showToast('Actividad eliminada exitosamente');
                    fetchActividades();
                } else {
                    showToast('Error al eliminar la actividad', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showToast('Error al eliminar la actividad', 'error');
            }
        }
    };

    const handleEdit = (activity) => {
        setEditarActividad(activity);
        setContenidoActividad({
            nombre: activity.nombre,
            descripcion: activity.descripcion,
            cupo: activity.cupo,
            categoria: activity.categoria || '',
            horarios: activity.horarios || []
        });
        setCrearActividad(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bodyActividad = {
            actividad: {
            nombre: contenidoActividad.nombre,
            descripcion: contenidoActividad.descripcion,
            cupo: parseInt(contenidoActividad.cupo),
            categoria: parseInt(contenidoActividad.categoria),
            horarios: contenidoActividad.horarios
            },
            verificar: false,
            token: localStorage.getItem("token"),
        };
        if (localStorage.getItem("isAdmin") == "true") {
            bodyActividad.verificar = true
        }
        console.log(bodyActividad)
        const url = editarActividad
            ? `http://localhost:8080/actividad/${editarActividad.id}`
            : 'http://localhost:8080/actividad';

        const method = editarActividad ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyActividad)
            });

            if (response.ok) {
                showToast(editarActividad ? 'Actividad actualizada' : 'Actividad creada');
                setCrearActividad(false);
                setEditarActividad(null);
                setContenidoActividad({ nombre: '', descripcion: '', cupo: '', categoria: '', horarios: [] });
                fetchActividades();
            } else {
                showToast('Error al guardar la actividad', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Error al guardar la actividad', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContenidoActividad(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    return (
        <div className="activities-container">
            <div className="admin-header">
                <h2>Gestión de Actividades - Admin</h2>
                <button
                    className="create-button"
                    onClick={() => setCrearActividad(!crearActividad)}
                >
                    {crearActividad ? 'Cancelar' : 'Nueva Actividad'}
                </button>
            </div>

            {crearActividad && (
                <div className="create-form-container">
                    <form onSubmit={handleSubmit} className="activity-form">
                        <h3>{editarActividad ? 'Editar Actividad' : 'Crear Nueva Actividad'}</h3>

                        <input type="text" name="nombre"
                            placeholder="Nombre de la actividad" value={contenidoActividad.nombre} onChange={handleInputChange} required />

                        <textarea name="descripcion" placeholder="Descripción" value={contenidoActividad.descripcion} onChange={handleInputChange} required />

                        <input
                            type="number" name="cupo" placeholder="Cupo máximo" value={contenidoActividad.cupo} onChange={handleInputChange} required />
                        <select
                            value={categoriaSeleccionada}
                            onChange={e => setCategoriaSeleccionada(e.target.value)}
                        >
                            <option value="">Todas las categorías</option></select>
                        <div className="form-buttons">
                            <button type="submit">
                                {editarActividad ? 'Actualizar' : 'Crear'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setCrearActividad(false);
                                    setEditarActividad(null);
                                    setContenidoActividad({ nombre: '', descripcion: '', cupo: '', categoria: '', horarios: [] });
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="activities-grid">
                {actividades.map((activity, index) => (
                    <div className="activity-card admin-card" key={index}>
                        <h3>{activity.nombre}</h3>
                        <p>{activity.descripcion}</p>
                        <p><strong>Cupo:</strong> {activity.cupo}</p>

                        <ul>
                            {activity.horarios && activity.horarios.map((horario, i) => (
                                <li key={i}>
                                    Dia: {diasSemana[horario.dia]} - Hora de Inicio: {horario["hora-inicio"]} - Hora de fin: {horario["hora-fin"]}
                                </li>
                            ))}
                        </ul>

                        <div className="admin-buttons">
                            <button className="edit-button" onClick={() => handleEdit(activity)}  >
                                Editar
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(activity.id)} >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminActivities;