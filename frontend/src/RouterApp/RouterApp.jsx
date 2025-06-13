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

                <Route element={<PrivateLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/:nombre" element={<Nombre />}/>
                    <Route path="/home/:categoria" element={<Categoria />}/>
                    <Route path="/home/:horario" element={<Horario />}/>
                    <Route path="/home/id/:id" element={<Detalle />}/>
                    <Route path="*" element={<Navigate to="/home" />} />
                </Route>

                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default RouterApp;


{/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="activities" element={<Activities />} />
          {/* <Route path="/" element={<AppAndLayoutWrapper />} />}
        </Route>
      </Routes>
    </BrowserRouter>
 */}