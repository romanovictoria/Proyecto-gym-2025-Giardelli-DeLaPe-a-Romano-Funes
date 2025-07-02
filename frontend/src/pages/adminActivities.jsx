import React, { useState, useEffect } from 'react';
import '@styles/Activities.css'
import { showToast } from '../components/Toast';
import NavBar from "../components/NavBar";

const AdminActivities = () => {
    const [actividades, setActividades] = useState([]);
    const [crearActividad, setCrearActividad] = useState(false);
    const [editarActividad, setEditarActividad] = useState(null);
    const [categorias, setCategoria] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [contenidoActividad, setContenidoActividad] = useState({
        nombre: '',
        descripcion: '',
        cupo: '',
        categoria_id: '',
        horarios: [],
        usuario_id: ""
    });

    const buildActividadBody = () => {
    return {
        actividad: {
            nombre: contenidoActividad.nombre,
            descripcion: contenidoActividad.descripcion,
            cupo: parseInt(contenidoActividad.cupo),
            categoria_id: parseInt(contenidoActividad.categoria),
            usuario_id: parseInt(contenidoActividad.usuario_id),
            horarios: contenidoActividad.horarios
        },
        verificar: localStorage.getItem("isAdmin") === "true",
        token: localStorage.getItem("token")
    };};


    useEffect(() => {
        fetchActividades();
        fetchCategoria();
        fetchUsuarios();
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
        categoria: activity.categoria_id?.toString() || '',
        usuario_id: activity.usuario_id?.toString() || '',
        horarios: activity.horarios || []
    });
    setCrearActividad(true);
    };



    const handleSubmit = (e) => {
    e.preventDefault();
    if (editarActividad) {
        editActividad();
    } else {
        newActividad();
    }};

    const editActividad = async () => {
    const bodyActividad = buildActividadBody();

    try {
        const response = await fetch(`http://localhost:8080/actividad/${editarActividad.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Authorization si lo usás:
                // Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(bodyActividad)
        });
        console.log(bodyActividad)
        if (response.ok) {
            showToast('Actividad actualizada');
            setCrearActividad(false);
            setEditarActividad(null);
            setContenidoActividad({ nombre: '', descripcion: '', cupo: '', categoria: '', horarios: [] });
            fetchActividades();
        } else {
            showToast('Error al actualizar la actividad', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al actualizar la actividad', 'error');
    }
};

    const newActividad = async () => {
    const bodyActividad = buildActividadBody();

    try {
        const response = await fetch("http://localhost:8080/actividad", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Si necesitás Authorization en header:
                // Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(bodyActividad)
        });

        if (response.ok) {
            showToast('Actividad creada');
            setCrearActividad(false);
            setContenidoActividad({ nombre: '', descripcion: '', cupo: '', categoria: '', horarios: [] });
            fetchActividades();
        } else {
            const errorData = await response.json();
            console.error("Error al crear actividad:", errorData);
            showToast('Error al crear la actividad', 'error');
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        showToast('Error al crear la actividad', 'error');
    }};
    const fetchCategoria = async () => {
    try {
      const response = await fetch("http://localhost:8080/categoria");
      const data = await response.json();
      setCategoria(data);
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    }
  };
    const fetchUsuarios = async () => {
    try {
        const response = await fetch("http://localhost:8080/usuario");
        const data = await response.json();
        setUsuarios(data);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }};

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
                            name="usuario_id"
                            value={contenidoActividad.usuario_id}
                            onChange={handleInputChange}
                            required
                            >
                            <option value="">Selecciona un profesor</option>
                            {usuarios.map((user) => (
                                <option key={user.id} value={user.id}>
                                {user.nombre} {user.apellido}
                                </option>
                            ))}
                        </select>
                        <select
                            name="categoria"
                            value={contenidoActividad.categoria}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
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