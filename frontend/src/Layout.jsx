import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';

function Layout({ isLoggedIn, logout, navigate }) {

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="layout-container">
            <header>
                <h1>Gym Transformacion</h1>
                <nav>
                    <a href="/">App</a>
                    {isLoggedIn ? (
                        <button onClick={logout}>Cerrar Sesion</button>
                    ) : (
                        <a href="/Login">Login</a>
                    )}
                    <a href="/Login">Login</a>
                    <a href="/Activities">Actividades</a>
                </nav>
            </header>

            <main>
                {
                    <Outlet />
                }

            </main>

            { }
            <Footer /> { }
        </div>
    );
}

export default Layout;