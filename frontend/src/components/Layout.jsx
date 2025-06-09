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
        <h1>Vital Gym</h1>
        <nav>
          <a href="/">App</a>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Cerrar Sesion</button>
          ) : (
            <a href="/Login"> Login</a>
          )}
          <a href="/Activities"> Actividades</a>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}


/* BARRA DE BUSQUEDA:
  

  import React, { Fragment } from "react";
  import { useState } from "react";

  const Search = ({ history }) => {
  const [keyword, setKeyword] = useState(""); //keyword: contiene lo que el usuario escribe en la barra; setKeyword:funcion para actualizar ese valor

  const searchSubmitHandler = (e) => {
    e.preventDefault(); //evita que el formulario recargue la pagina
    if (keyword.trim()) { //elimina espacios innecesarios al principio/final
      history.push(/actividades/${keyword});
    } else {
      history.push("/actividades");
    }
  };

  return (
    <Fragment>
      <div className="md:my-[200px] my-40 mx-10 md:mx-80 md:min-h-[400px]">
        <form className="" onSubmit={searchSubmitHandler}>
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">// pointer-events-none evita que el icono interfiera con clics
              <svg // es el icono de la lupa
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input // ACA EL USUARIO ESCRIBE
              type="text"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search a actividades" //texto guia cuando está vacio.
              required="" //no permite enviar vacio
              onChange={(e) => setKeyword(e.target.value)}
              
            />
            <input type="submit"  value="Search" //boton de busqueda
              className="text-white absolute right-2.5 bottom-2.5 bg-[#2d4a59] hover:bg-[#467890] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer" />
           
           
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Search;

----------------------
OTRA OPCION DE BARRA DE BUSQUEDA:

<div className="searchbox">
    <input type="text" name="search" placeholder="Buscar"/>
    {searchIcon}
  </div>


  .searchbox{
    position: relative;
    left:5vmax;
  }
  
  .searchbox >input{
    border: none;
    border-botton: 1px solid nombre del color,
    width: 15vmax;
    font-size: 1.1vmax;
    outline:none;
    color: nombre del color;
    font-weight: 100;
  }

*/



/*function AppAndLayoutWrapper() {
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
}*/

export default Layout;