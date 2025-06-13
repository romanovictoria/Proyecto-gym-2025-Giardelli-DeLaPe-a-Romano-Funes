import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PrivateLayout from "../pages/Layout/PrivateLayout";
import PublicLayout from "../pages/Layout/PublicLayout";
import Nombre from "../pages/FiltroNombre";
import Categoria from "../pages/FiltroCategoria";
import Horario from "../pages/FiltroHorario";
import Detalle from "../pages/activityDetail";


const RouterApp = () => {

    return (
        <BrowserRouter>
            <Routes>

                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Route>

                <Route element={<PrivateLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/:nombre" element={<Nombre />}/>
                    <Route path="/home/categoria/:categoria" element={<Categoria />}/>
                    <Route path="/home/horario/:horario" element={<Horario />}/>
                    <Route path="/home/id/:id" element={<Detalle />}/>
                    <Route path="*" element={<Navigate to="/home" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouterApp;