import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductosNacionalesDetalle = () => {
  const { idParam } = useParams();
  const [producto, setProducto] = useState(null);
  console.log("inicio del componente ProductosNacionalesDetalle...");

  useEffect(() => {
    if (idParam) {
      console.log("ID del producto:", idParam);
      const docRef = doc(db, "productos", idParam);

      getDoc(docRef).then((resp) => {
        if (resp.exists()) {
          setProducto({ id: resp.id, ...resp.data() });
        }
        else {
          console.log("Producto no encontrado");
        }
      }).catch((error) => {
        console.error("Error fetching producto:", error);
      });
    }
  }, [idParam]);

  return (
    <div>
      {producto ? (
        <div>
          <h2>{producto.nombre}</h2>
          <p>{producto.detalle}</p>
          <p>${producto.precio.toFixed(2)}</p>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};

export default ProductosNacionalesDetalle;