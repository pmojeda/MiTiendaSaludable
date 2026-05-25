import { useCart } from "../../context/CartContext";

function Carrito() {
  const { cart, getCartTotal, clearCart } = useCart();

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ borderTop: "1px solid", padding: "10px", marginBottom: "10px" }}>
          <h4>{item.nombre}</h4>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio unitario: ${item.precio}</p>
          <p>Subtotal: ${item.precio * item.quantity}</p>
        </div>
      ))}
      <hr />
      <h3>Total a pagar: ${getCartTotal()}</h3>
      <button className="w-75 rounded-xl bg-black px-4 py-1 my-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-800" onClick={clearCart}>Vaciar Carrito</button>
    </div>
  );
}

export default Carrito;
