import TarjetaProductoCompleto from "../Producto/TarjetaProductoCompleto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ItemDetailContainer() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Simulamos una llamada a una API para obtener los productos
    const cargarProductos = async () => {
      try {
        const response = await fetch('/data/productos.json');
        const data = await response.json();
        console.log("Productos cargados:", data);
        setProductos(data);
        const productoData = data.find((p) => p.id == id);
        setProducto(productoData);
        console.log("Producto encontrado:", productoData);
        console.log("producto:", producto);
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    };

    cargarProductos();
  }, [id]);

  return (
    <div>
      {producto != null && (
        <TarjetaProductoCompleto key={producto.id} {...producto} />
      )}
    </div>
  );
}

export default ItemDetailContainer;
