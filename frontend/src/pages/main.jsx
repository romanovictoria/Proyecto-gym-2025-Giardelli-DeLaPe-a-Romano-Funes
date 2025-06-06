import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@styles/index.css';
import Login from './Login.jsx';
import Layout from '@components/Layout.jsx';
import App from './App.jsx';
import Activities from '@components/Activities.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="activities" element={<Activities />} />
          {/* <Route path="/" element={<AppAndLayoutWrapper />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

