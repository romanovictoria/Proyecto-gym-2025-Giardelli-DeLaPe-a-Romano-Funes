import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
    return (
        <div>
            <header>
            </header>
            {/*//TODO: Taca poner un componente navbarprivate que permita navegar entre las paginas privadas  */}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default PrivateLayout;