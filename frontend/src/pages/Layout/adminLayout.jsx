import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("usuario_id");
        navigate("/login");
    };

    return (
        <div className="layout-container">
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                backgroundColor: '#343a40',
                color: 'white'
            }}>
                <h1>Vital Gym - Admin Panel</h1>
                <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                        onClick={() => navigate('/admin/home')}
                        style={{
                            background: 'none',
                            border: '1px solid white',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/admin/activities')}
                        style={{
                            background: 'none',
                            border: '1px solid white',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Actividades
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#dc3545',
                            border: 'none',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </header>

            <main style={{ minHeight: '80vh', padding: '2rem' }}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default AdminLayout;