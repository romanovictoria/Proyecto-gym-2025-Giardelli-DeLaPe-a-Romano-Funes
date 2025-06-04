import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from './Login.jsx';
import Layout from './Layout.jsx';
import App from './App.jsx';
import Activities from './Activities.jsx';

function AppAndLayoutWrapper() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <Layout
      isLoggedIn={isLoggedIn}
      logout={logout}
      navigate={navigate}
    >
      <Outlet />
    </Layout>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="activities" element={<Activities />} />
          <Route path="/" element={<AppAndLayoutWrapper />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

