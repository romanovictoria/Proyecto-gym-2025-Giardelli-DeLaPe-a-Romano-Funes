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
            <div className="admin-stats" style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                marginBottom: '30px'
            }}>
                <div className="stat-card" style={{
                    background: '#f0f0f0',
                    padding: '20px',
                    borderRadius: '8px',
                    minWidth: '150px'
                }}>
                    <h3>{stats.totalActividades}</h3>
                    <p>Total Actividades</p>
                </div>
                <div className="stat-card" style={{
                    background: '#f0f0f0',
                    padding: '20px',
                    borderRadius: '8px',
                    minWidth: '150px'
                }}>
                    <h3>{stats.totalUsuarios}</h3>
                    <p>Total Usuarios</p>
                </div>
                <div className="stat-card" style={{
                    background: '#f0f0f0',
                    padding: '20px',
                    borderRadius: '8px',
                    minWidth: '150px'
                }}>
                    <h3>{stats.totalInscripciones}</h3>
                    <p>Total Inscripciones</p>
                </div>
            </div>

            {/* Navegación rápida */}
            <div className="admin-navigation" style={{ marginBottom: '30px' }}>
                <button
                    onClick={() => window.location.href = '/admin/activities'}
                    style={{ // TODO PASAR A OTRO ARCHIVO
                        padding: '10px 20px',
                        margin: '0 10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Gestionar Actividades
                </button>
                <button
                    onClick={() => window.location.href = '/admin/users'}
                    style={{ // TODO PASAR A OTRO ARCHIVO
                        padding: '10px 20px',
                        margin: '0 10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Gestionar Usuarios
                </button>
            </div>

            {/* Lista de actividades con acciones de admin */}
            <div className="actividad_caracteristica">
                <h2>Todas las Actividades (Vista Admin)</h2>
                <ul>
                    {actividades.length > 0 ? (
                        actividades.map((actividad) => (
                            <li key={actividad.id} style={{
                                marginBottom: '15px',
                                border: '1px solid #ddd',
                                padding: '15px',
                                borderRadius: '5px'
                            }}>
                                <p><strong>Título:</strong> {actividad.nombre}</p>
                                <p><strong>Descripción:</strong> {actividad.descripcion}</p>
                                <p><strong>Horario:</strong> {new Date(actividad.horario * 1000).toLocaleString()}</p>
                                <p><strong>Profesor:</strong> {actividad.usuario_nombre}</p>
                                <p><strong>Cupo:</strong> {actividad.cupo}</p>
                                <p><strong>Categoría:</strong> {actividad.categoria_descripcion}</p>

                                <div className="admin-actions" style={{ marginTop: '10px' }}>
                                    <button
                                        onClick={() => window.location.href = `/admin/activity/${actividad.id}/edit`} // TODO
                                        style={{
                                            padding: '5px 10px',
                                            marginRight: '10px',
                                            backgroundColor: '#ffc107',
                                            color: 'black',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => eliminarActividad(actividad.id)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => window.location.href = `/admin/activity/${actividad.id}/inscriptions`} // TODO
                                        style={{
                                            padding: '5px 10px',
                                            marginLeft: '10px',
                                            backgroundColor: '#17a2b8',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
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