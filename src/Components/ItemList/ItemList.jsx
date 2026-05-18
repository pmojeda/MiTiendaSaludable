import TarjetaProducto from "../Producto/TarjetaProducto";

function ItemList({ productos }) {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4">
      {productos.map((prod) => (
        <TarjetaProducto key={prod.id} {...prod} />
      ))}
    </div>
  );
}

export default ItemList;
