import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';

function Layout({ isLoggedIn, logout, navigate }) {

  /* const handleLogout = () => {
    logout();
    navigate("/");
  }; */

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
}


/* BARRA DE BUSQUEDA:
  
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
      <div className="barraBusqueda">
        <form className="" onSubmit={searchSubmitHandler}>
          <label
            for="default-search"
            className="labelBusqueda"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointerLupa">// pointer-events-none evita que el icono interfiera con clics
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
              className="escribeBusqueda"
              placeholder="Search a actividades" //texto guia cuando está vacio.
              required="" //no permite enviar vacio
              onChange={(e) => setKeyword(e.target.value)}
              
            />
            <input type="submit"  value="Search" //boton de busqueda
              className="botonBusqueda" />
           
           
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