import React, { useState, useEffect } from 'react';
import '@styles/Home.css';

const AdminHome = () => {
    const [actividades, setActividades] = useState([]);
    // const [inscripciones, setInscripciones] = useState([]);
    // const [usuarios, setUsuarios] = useState([]);
    const [stats, setStats] = useState({
        totalActividades: 0,
        totalUsuarios: 0,
        totalInscripciones: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Obtener actividades
            const actividadesRes = await fetch("http://localhost:8080/actividad");
            const actividadesData = await actividadesRes.json();
            setActividades(actividadesData);

            // Obtener inscripciones (asumiendo que existe este endpoint)
            let inscripcionesData = [];
            try {
                const inscripcionesRes = await fetch("http://localhost:8080/inscripciones");
                inscripcionesData = await inscripcionesRes.json();
                // setInscripciones(inscripcionesData);
            } catch {
                console.log("Endpoint de inscripciones no disponible");
            }

            // Obtener usuarios (asumiendo que existe este endpoint)
            let usuariosData = [];
            try {
                const usuariosRes = await fetch("http://localhost:8080/usuarios");
                usuariosData = await usuariosRes.json();
                // setUsuarios(usuariosData);
            } catch {
                console.log("Endpoint de usuarios no disponible");
            }

            setStats({
                totalActividades: actividadesData.length,
                totalUsuarios: usuariosData.length,
                totalInscripciones: inscripcionesData.length
            });

        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    const eliminarActividad = async (actividadId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
            try {
                const response = await fetch(`http://localhost:8080/actividad/${actividadId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    alert('Actividad eliminada exitosamente');
                    fetchData(); // Recargar datos
                } else {
                    alert('Error al eliminar la actividad');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar la actividad');
            }
        }
    };

    return (
        <div>
            <div>
                <h2>Panel de Administración - Vital Gym</h2>
                <p>Gestiona actividades, usuarios e inscripciones</p>
            </div>

            {/* Estadísticas */}
            <div className="admin-stats" >
                <div className="stat-card">
                    <h3>{stats.totalActividades}</h3>
                    <p>Total Actividades</p>
                </div>
                <div className="stat-card" >
                    <h3>{stats.totalUsuarios}</h3>
                    <p>Total Usuarios</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.totalInscripciones}</h3>
                    <p>Total Inscripciones</p>
                </div>
            </div>

            {/* Navegación rápida */}
            <div className="admin-navigation" >
                <button className='admin-button'
                    onClick={() => window.location.href = '/adminActivities'} >
                    Gestionar Actividades
                </button>
                <button className='admin-button'
                    onClick={() => window.location.href = '/admin/users'} >
                    Gestionar Usuarios
                </button>
            </div>

            {/* Lista de actividades con acciones de admin */}
            <div className="actividad_caracteristica">
                <h2>Todas las Actividades (Vista Admin)</h2>
                <ul>
                    {actividades.length > 0 ? (
                        actividades.map((actividad) => (
                            <li key={actividad.id} className='acti'>
                                <p><strong>Titulo:</strong> {actividad.nombre}</p>
                                <p><strong>Descripcion:</strong> {actividad.descripcion}</p>
                                <p><strong>Horario:</strong> {new Date(actividad.horario * 1000).toLocaleString()}</p>
                                <p><strong>Profesor:</strong> {actividad.usuario_nombre}</p>
                                <p><strong>Cupo:</strong> {actividad.cupo}</p>
                                <p><strong>Categoria:</strong> {actividad.categoria_descripcion}</p>

                                <div className="admin-actions" >
                                    <button className='admin-button'
                                        onClick={() => window.location.href = `/admin/activity/${actividad.id}/edit`} // TODO
                                    >
                                        Editar
                                    </button>
                                    <button className='admin-button'
                                        onClick={() => eliminarActividad(actividad.id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button className='admin-button'
                                        onClick={() => window.location.href = `/admin/activity/${actividad.id}/inscriptions`} // TODO
                                    >
                                        Ver Inscripciones
                                    </button>
                                </div>
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

export default AdminHome;