import '@styles/Activities.css'

const Activities = () => {

}
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


export default Activities;