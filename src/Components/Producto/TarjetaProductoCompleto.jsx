import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function TarjetaProductoCompleto({
  id,
  imagen,
  nombre,
  detalle,
  precio,
  stock,
}) {
  const producto = { id, nombre, precio, stock, imagen, detalle };
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);

  const { addToCart, getQuantityById } = useCart();
  const cantidadEnCarrito = getQuantityById(id);

  const incrementar = () => {
    if (cantidad + cantidadEnCarrito < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    if (cantidad > 0) {
      addToCart(producto, cantidad);
      alert(`Has agregado ${cantidad} ${nombre}(s) al carrito`);
      setCantidad(0);
    }
  };

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md h-full mx-3 my-3 w-auto w-min">
      <img
        src={imagen}
        alt={nombre}
        className="h-64 object-cover mx-auto mt-1"
      />

      <div className="p-1">
        <h3 className="mb-2 text-1xl font-bold text-gray-800">{nombre}</h3>

        <p className="mb-1 text-xs text-gray-600">{detalle} </p>

        <p className="mb-1 text-sm text-gray-600">Stock: {stock}</p>

        <div className="mb-1 mx-auto">
          <span className="text-1xl font-bold text-gray-900">
            ${precio.toFixed(2)}
          </span>

          <button
            onClick={toggleFavorito}
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
              marginLeft: "10px",
            }}
          >
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

        <button
          className="w-100 rounded-xl bg-black px-4 py-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-800"
          onClick={agregarAlCarrito}
        >
          Agregar al carrito
        </button>
        <p className="text-sm">Agregaste {cantidadEnCarrito} unidades al Carrito</p>
      </div>
    </div>
  );
}
