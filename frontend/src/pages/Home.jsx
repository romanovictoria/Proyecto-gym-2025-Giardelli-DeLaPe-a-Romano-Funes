import "@styles/Home.css";

const Home = () => {
  return (
    <div>
      <h2>¡Bienvenido a la Página de Inicio de Vital Gym!</h2>
      <p>Explora nuestras actividades y planes.</p>
    </div>
  );
};

const ActivitiesCard = () => {
  return (
    <div className="activities_box">
      <div className="description">
        <h3>{a.titulo}</h3>
        <p>{a.descripcion}</p>
        <h2>{a.cupo}</h2>
        <ul>
          {a.horarios &&
            a.horarios.map((h, j) => (
              <li key={j}>
                Dia: {dias[h.dia]} - Inicio: {h["hora-inicio"]} - Fin:{" "}
                {h["hora-fin"]}
              </li>
            ))}
        </ul>
        {isLoggedIn && (
          <button onClick={() => handleInscription(a.id)}>Inscribir</button>
        )}
      </div>
    </div>
  );
};

const Card = () => {
  retun(
    <div className="activity">
      <ActivitiesCard>
        <h2>{activity.titulo}</h2>
        <p>{activity.descripcion}</p>
        <p>{activity.categoria}</p>
        <p>Profesor: {activity.profesor}</p>
        <p>Duración: {activity.duracion}</p>
        <p>Horario: {activity.horario}</p>
        <p>Cupo: {activity.cupo}</p>
        <ul>
          {activity.horarios &&
            activity.horarios.map((h, i) => (
              <li key={i}>
                Dia: {dias[h.dia]} - Inicio: {h["hora-inicio"]} - Fin:{" "}
                {h["hora-fin"]}
              </li>
            ))}
        </ul>
      </ActivitiesCard>
      <ActivitiesCard></ActivitiesCard>
      <ActivitiesCard></ActivitiesCard>
    </div>
  );
};

export default Home;
