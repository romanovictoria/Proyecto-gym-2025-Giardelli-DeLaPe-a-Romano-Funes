import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const logOut = () => {
        localStorage.removeItem('isLoggedIn');
        navigate("/");
    }
    return (
        <header>
            <h1> GYM </h1>
            <nav className="header_nav">
                <a href="/">Home</a>
                {isLoggedIn ? (
                    <button onClick={logOut}> Cerrar Sesión</button>
                ) : (
                    <a href="/login">Login</a>
                )}
                <a href="actividades">Actividades</a>
            </nav>
        </header>
    )
}

export default Header;