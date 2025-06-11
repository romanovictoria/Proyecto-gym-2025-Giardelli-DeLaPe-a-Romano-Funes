import { Outlet } from "react-router-dom";
import '@styles/publicLayout.css';
import Footer from "../../components/Footer";
const PublicLayout = () => {
    return (
        <div className="layout-container">
            <header>
                <h1>Vital Gym</h1>
                {/* <nav>
                    <a href="/">App</a>
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>Cerrar Sesion</button>
                    ) : (
                        <a href="/Login"> Login</a>
                    )}
                    <a href="/Activities"> Actividades</a>
                </nav> */}
            </header>

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default PublicLayout;