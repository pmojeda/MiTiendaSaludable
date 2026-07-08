import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Nav() {
  const { getCartQuantity } = useCart();
  const cantidad = getCartQuantity();
  const { user, logout } = useAuth();

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
          <Link to="/carrito">
            Carrito 🛒 {cantidad > 0 && <span>({cantidad})</span>}
          </Link>
        </li>
        {user ? (
          <>
            {/* Mostrar Gestion SOLO si el usuario es admin */}
            {user.rol === "admin" && (
              <li>
                <Link to="/gestionproductos">
                  Gestión Productos
                </Link>
              </li>
            )}
            {user.rol === "admin" && (
              <li>
                <Link to="/gestioncupones">
                  Gestión Cupones
                </Link>
              </li>
            )}
            <span>¡Hola, {user.email}!</span>
            <button onClick={logout} className="bg-red-500 text-white px-2 py-1 rounded">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
