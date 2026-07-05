import ItemList from "../ItemList/ItemList";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

function ItemListContainer({ Mensaje, Destacado }) {
  const [productos, setProductos] = useState([]);

  /*
  useEffect(() => {
    // Simulamos una llamada a una API para obtener los productos
    const cargarProductos = async () => {
      try {
        const response = await fetch('/data/productos.json');
        const data = await response.json();

        if (Destacado) {
          const productosDestacados = data.filter(producto => producto.destacado);
          setProductos(productosDestacados);
        } else {
          setProductos(data);
        }
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    };

    cargarProductos();
  }, []);
  */

  useEffect(() => {
    const fetchProductos = collection(db, "productos");

    getDocs(fetchProductos)
      .then((resp) => {
        const productosData = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        if (Destacado) {
          const productosDestacados = productosData.filter(producto => producto.destacado);
          setProductos(productosDestacados);
        } else {
          setProductos(productosData);
        }
      })
      .catch((error) => {
        console.error('Error cargando productos:', error);
      });
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

export default ItemListContainer;