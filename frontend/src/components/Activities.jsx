import '@styles/Activities.css'

const Activities = () => {
    const activities = [
        {
            nombre: "aquagym",
            descripcion: "¡Sumérgete en el bienestar! ",
            horarios: [
                { dia: 2, "hora-inicio": "18:30", "hora-fin": "20:00" },
                { dia: 4, "hora-inicio": "18:30", "hora-fin": "20:00" }
            ]
        },
        {
            nombre: "zumba",
            descripcion: "Ritmos latinos",
            horarios: [
                { dia: 1, "hora-inicio": "14:30", "hora-fin": "15:30" },
                { dia: 3, "hora-inicio": "9:30", "hora-fin": "10:30" }
            ]
        },
        {
            nombre: "boxeo",
            descripcion: "Libera tu fuerza interior",
            horarios: [
                { dia: 1, "hora-inicio": "19:30", "hora-fin": "20:30" },
                { dia: 3, "hora-inicio": "19:30", "hora-fin": "20:30" }
            ]
        },
        {
            nombre: "pilates",
            descripcion: "armonia en cada movimiento",
            horarios: [
                { dia: 1, "hora-inicio": "19:30", "hora-fin": "20:30" },
                { dia: 5, "hora-inicio": "19:30", "hora-fin": "20:30" }
            ]
        },
        {
            nombre: "spinning",
            descripcion: "pedalea hacia tus metas",
            horarios: [
                { dia: 2, "hora-inicio": "19:30", "hora-fin": "20:30" },
                { dia: 5, "hora-inicio": "19:30", "hora-fin": "20:30" }
            ]
        },
        {
            nombre: "yoga",
            descripcion: "Encuentra tu equilibrio",
            horarios: [
                { dia: 1, "hora-inicio": "19:30", "hora-fin": "20:30" },
                { dia: 4, "hora-inicio": "19:30", "hora-fin": "20:30" }
            ]
        },
        {
            nombre: "crossfit",
            descripcion: "Supera tus limites",
            horarios: [
                { dia: 1, "hora-inicio": "12:30", "hora-fin": "13:30" },
                { dia: 3, "hora-inicio": "12:30", "hora-fin": "13:30" }
            ]
        },
        {
            nombre: "funcional",
            descripcion: "muevete con proposito",
            horarios: [
                { dia: 3, "hora-inicio": "19:30", "hora-fin": "20:30" },
                { dia: 5, "hora-inicio": "19:30", "hora-fin": "20:30" }
            ]
        }
    ];

    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const handleInscription = (nombreActividad) => {
        alert(`Inscripto en ${nombreActividad}`);
    }

    return (
        <div className="activities-container">
            {activities.map((activity, index) => (
                <div className="activity-card" key={index}>
                    <h3>{activity.nombre}</h3>
                    <p>{activity.descripcion}</p>
                    <ul>
                        {activity.horarios.map((horario, i) => (
                            <li key={i}>
                                Dia: {diasSemana[horario.dia]} - Hora de Iniccio : {horario["hora-inicio"]} - Hora de fin : {horario["hora-fin"]}
                            </li>
                        ))}
                    </ul>
                    {isLoggedIn && (
                        <button onClick={() => handleInscription(activity.nombre)}> Inscribir </button>
                    )}

                </div>
            ))}
        </div>
    )
}

export default Activities;