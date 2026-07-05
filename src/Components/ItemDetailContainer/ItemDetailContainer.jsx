import TarjetaProductoCompleto from "../Producto/TarjetaProductoCompleto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Simulamos una llamada a una API para obtener los productos
    const cargarProductos = async () => {
      try {
        const fetchProductos = collection(db, "productos");
        const productosSnapshot = await getDocs(fetchProductos);
        const data = productosSnapshot.docs.map((doc) => doc.data());

        console.log("Productos cargados:", data);
        console.log("ID del producto a buscar:", id);

        const productoData = data.find((p) => p.id == id);
        setProducto(productoData);
        console.log("Producto encontrado:", productoData);
        console.log("producto:", producto);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    cargarProductos();
  }, [id]);

  return (
    <div className="w-auto w-min mx-auto my-4">
      {producto != null && (
        <TarjetaProductoCompleto key={producto.id} {...producto} />
      )}
    </div>
  );
}

export default ItemDetailContainer;
