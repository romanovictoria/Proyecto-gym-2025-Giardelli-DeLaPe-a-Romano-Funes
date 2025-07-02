import { Link } from "react-router-dom";

const NavBar = () => {


    return (
        <nav className="Navbar">
            <li><a href="/home">Home</a></li>
            <li><a href="/misActividades">Mis Actividades</a></li>
        </nav>
    );
};

export default NavBar;