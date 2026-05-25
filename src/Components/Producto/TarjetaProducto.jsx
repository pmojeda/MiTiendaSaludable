import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function TarjetaProducto({ id, imagen, nombre, detalle, precio, stock }) {
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);
  const { addToCart } = useCart();

  const producto = { id, nombre, precio, stock, imagen, detalle };

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };
  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    addToCart(producto, cantidad);
    alert(`Has agregado ${cantidad} ${nombre}(s) al carrito`);
  };

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-80 w-60 mx-auto my-3">
      <img
        src={imagen}
        alt={nombre}
        className="h-32 object-cover mx-auto mt-1"
      />

      <div className="p-1">        
        <Link to={`/productos/${id}`} className="mb-2 text-1xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
          <p>{nombre}</p>          
        </Link>

        <Link to={`/productos/${id}`} className="mb-1 text-xs text-gray-600 hover:text-indigo-600 transition-colors">
          <p>{detalle.substring(0, 40)}...</p>
        </Link>

        <p className="mb-1 text-sm text-gray-600">
          Stock: {stock}
        </p>

        <div className="mb-1 flex items-center justify-between mx-5">
          <span className="text-1xl font-bold text-gray-900">
            ${precio.toFixed(2)}
          </span>

          <button
            onClick={toggleFavorito}
            style={{ cursor: "pointer", background: "none", border: "none", marginLeft: "10px" }}>
              {esFavorito ? "⭐" : "☆"}
          </button>
        </div>

        <div className="mb-1 flex items-center justify-center gap-4">
          <button
            onClick={decrementar}
            className="rounded-lg bg-gray-200 px-4 py-2 text-md font-bold text-gray-800 hover:bg-gray-300"
          >
            -
          </button>
          <p className="text-md font-bold text-gray-800">{cantidad}</p>
          <button
            onClick={incrementar}
            className="rounded-lg bg-gray-200 px-4 py-2 text-md font-bold text-gray-800 hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <button className="w-full rounded-xl bg-black px-4 py-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-800" onClick={agregarAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
