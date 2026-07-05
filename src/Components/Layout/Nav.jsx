import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Nav() {
    const { getCartQuantity } = useCart();
    const cantidad = getCartQuantity();

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
                    <Link to="/gestion">Gestión</Link>
                </li>
                <li>
                    <Link to="/contacto">Contacto</Link>
                </li>
                <li>
                    <Link to="/carrito">Carrito 🛒 {cantidad > 0 && <span>({cantidad})</span>}</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;