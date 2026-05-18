import ItemList from "../ItemList/ItemList";
import { useEffect, useState } from "react";

export function ItemListContainer({ Mensaje }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Simulamos una llamada a una API para obtener los productos
    const cargarProductos = async () => {
      try {
        const response = await fetch('/data/productos.json');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    };

    cargarProductos();
  }, []);


  return (
    <div>
      <h2>{Mensaje}</h2>
      <div>
        <ItemList productos={productos} />
      </div>
    </div>
  );
}
