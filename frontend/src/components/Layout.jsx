import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';

function Layout() {

  return (
    <div className="layout-container">
      <header>
        <h1>Vital Gym</h1>
        { }
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}



export default Layout;