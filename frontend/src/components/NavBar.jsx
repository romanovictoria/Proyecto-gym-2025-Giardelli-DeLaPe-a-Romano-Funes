import { Link } from "react-router-dom";

const NavBar = () => {


    return (
        <nav className="Navbar">
            <a href="/home">Home</a>
            <a href="/misActividades">Mis Actividades</a>
            <a href="/login">Cerrar Sesión</a>
        </nav>
    );
};

export default NavBar;