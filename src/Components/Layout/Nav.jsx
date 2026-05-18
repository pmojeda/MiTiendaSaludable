import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="NavTienda">
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    gap: "40px",
                }}
            >
                <li>                    
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/productos">Productos</Link>
                </li>
                <li>
                    <Link to="/contacto">Contacto</Link>
                </li>
                <li>
                    <Link to="/carrito">Carrito</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;