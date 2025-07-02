import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AdminHome from "../pages/adminHome";
import AdminActivities from "../pages/adminActivities";
import PrivateLayout from "../pages/Layout/PrivateLayout";
import PublicLayout from "../pages/Layout/PublicLayout";
import Nombre from "../pages/FiltroNombre";
import Categoria from "../pages/FiltroCategoria";
import Horario from "../pages/FiltroHorario";
import Detalle from "../pages/activityDetail";
import MisActividades from "../pages/misActividades";
import NavBar from "../components/NavBar";
import SignUp from "../pages/SignUp";

// Componente para proteger rutas de admin
const AdminRoute = ({ children }) => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

    if (!isAdmin) {
        return <Navigate to="/home" />;
    }

    return children;
};

// Componente para proteger rutas de usuario regular
const UserRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas */}
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Route>

                {/* Rutas privadas para usuarios regulares */}
                <Route element={<PrivateLayout />}>
                    <Route
                        path="/home"
                        element={
                            <UserRoute>
                                <Home />
                            </UserRoute>
                        }
                    />
                    <Route
                        path="/home/search/:nombre"
                        element={
                            <UserRoute>
                                <Nombre />
                            </UserRoute>
                        }
                    />
                    <Route
                        path="/home/categoria/:categoria"
                        element={
                            <UserRoute>
                                <Categoria />
                            </UserRoute>
                        }
                    />
                    <Route
                        path="/home/horario/:horario"
                        element={
                            <UserRoute>
                                <Horario />
                            </UserRoute>
                        }
                    />
                    <Route
                        path="/home/id/:id"
                        element={
                            <UserRoute>
                                <Detalle />
                            </UserRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Route>

                <Route path="/mis-actividades" element={<MisActividades />} />
                

                {/* Rutas privadas para administradores */}
                <Route element={<PrivateLayout />}>
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminHome />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/home"
                        element={
                            <AdminRoute>
                                <AdminHome />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/activities"
                        element={
                            <AdminRoute>
                                <AdminActivities />
                            </AdminRoute>
                        }
                    />
                    {/* Agregar más rutas de admin según necesites */}
                </Route>

                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/admin/home" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterApp;