import React, { useState, useEffect } from 'react';
import '@styles/Activities.css'
import { showToast } from './Toast';

const AdminActivities = () => {
    const [activities, setActivities] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        cupo: '',
        categoria: '',
        horarios: []
    });

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = () => {
        fetch('http://localhost:8080/actividad')
            .then((res) => res.json())
            .then((data) => setActivities(data))
            .catch((err) => console.error('Error fetching activities:', err));
    };

    const handleDelete = async (activityId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
            try {
                const response = await fetch(`http://localhost:8080/actividad/${activityId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    showToast('Actividad eliminada exitosamente');
                    fetchActivities();
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
        setEditingActivity(activity);
        setFormData({
            nombre: activity.nombre,
            descripcion: activity.descripcion,
            cupo: activity.cupo,
            categoria: activity.categoria || '',
            horarios: activity.horarios || []
        });
        setShowCreateForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editingActivity
            ? `http://localhost:8080/actividad/${editingActivity.id}`
            : 'http://localhost:8080/actividad';

        const method = editingActivity ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showToast(editingActivity ? 'Actividad actualizada' : 'Actividad creada');
                setShowCreateForm(false);
                setEditingActivity(null);
                setFormData({ nombre: '', descripcion: '', cupo: '', categoria: '', horarios: [] });
                fetchActivities();
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
        setFormData(prev => ({
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
                    onClick={() => setShowCreateForm(!showCreateForm)}
                >
                    {showCreateForm ? 'Cancelar' : 'Nueva Actividad'}
                </button>
            </div>

            {showCreateForm && (
                <div className="create-form-container">
                    <form onSubmit={handleSubmit} className="activity-form">
                        <h3>{editingActivity ? 'Editar Actividad' : 'Crear Nueva Actividad'}</h3>

                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la actividad"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                        />

                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            type="number"
                            name="cupo"
                            placeholder="Cupo máximo"
                            value={formData.cupo}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            type="text"
                            name="categoria"
                            placeholder="Categoría"
                            value={formData.categoria}
                            onChange={handleInputChange}
                        />

                        <div className="form-buttons">
                            <button type="submit">
                                {editingActivity ? 'Actualizar' : 'Crear'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setEditingActivity(null);
                                    setFormData({ nombre: '', descripcion: '', cupo: '', categoria: '', horarios: [] });
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="activities-grid">
                {activities.map((activity, index) => (
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
                            <button
                                className="edit-button"
                                onClick={() => handleEdit(activity)}
                            >
                                Editar
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(activity.id)}
                            >
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