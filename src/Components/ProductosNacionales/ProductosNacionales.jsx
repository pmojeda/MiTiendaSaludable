import React, {useState, useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductosNacionales = () => {
  const [productos, setProductos] = useState([]);
  
  useEffect(() => {
    const fetchProductos = collection(db, "productos");

    getDocs(fetchProductos)
      .then((resp) => {
        const productosData = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(productosData);
      })
      .catch((error) => {
        console.error("Error fetching productos:", error);
      });
      
  }, []);

  return (
    <div>
      <h2>Productos Nacionales</h2>
      {productos.map((producto) => (
        <div key={producto.id}>
          <h3>{producto.nombre}</h3>
          <h4>{producto.detalle}</h4>
          <h4>{producto.categoria}</h4>
          <p>${producto.precio.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductosNacionales;