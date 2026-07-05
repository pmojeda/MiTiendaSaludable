import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

function Carrito() {
  const { cart, getCartTotal, clearCart, removeItem } = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <h2>El carrito está vacío</h2>
        <p>Agregá productos para continuar la compra.</p>
        <Link to="/productos" className="text-blue-500 hover:underline">
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ borderTop: "1px solid", padding: "10px", marginBottom: "10px" }}>
          <h4>{item.nombre}</h4>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio unitario: ${item.precio}</p>
          <p>Subtotal: ${item.precio * item.quantity}</p>
          <button className="w-30 rounded-xl bg-red-500 px-4 py-1 mx-1 my-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-700" onClick={() => removeItem(item.id)}>
            Eliminar
          </button>
        </div>
      ))}
      <hr />
      <h3>Total a pagar: ${getCartTotal()}</h3>
      <button className="w-50 rounded-xl bg-black px-4 py-1 mx-1 my-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-800" onClick={clearCart}>Vaciar Carrito</button>
      <Link to="/" onClick={() => alert("Gracias por comprar!")} className="w-50 rounded-xl bg-blue-500 px-4 py-1 mx-1 my-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-700 text-center">
        Finalizar Compra
      </Link>    
    </div>
  );
}

export default Carrito;
