import { useState } from "react";
import FormularioProducto from "./FormularioProducto";
import {getFirestore, collection, addDoc} from "firebase/firestore";

/**
 * @deprecated
 * Este componente fue reemplazado por el uso de <Gestion />.
 * No utilizar en desarrollos nuevos.
 */
function FormularioContainer() {
  // Implementación del contenedor del formulario
  
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    detalle: "",
    destacado: false,
    categoria: "",
    imagen: "",
  });
  
  const [imagenFile, setImagenFile] = useState(null);

  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;

    setDatosForm({
      ...datosForm,
      [name]: type === "checkbox" ? checked : name === "precio" ? parseFloat(value) : value,
    });
  };

  // Nueva función para manejar el cambio del input de tipo "file"
  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    console.log("Enviando los siguientes datos a la API:", datosForm);

    // Validamos que el usuario haya seleccionado una imagen
    if (!imagenFile) {
        alert("Por favor, selecciona una imagen para el producto.");
        return;
    }

    // --- Lógica para subir la imagen a Imgbb ---
    const apiKey = '427dddf46810c5c8088de2d48319ba21'; 
    const formData = new FormData();
    formData.append('image', imagenFile);

    try {
        console.log("Subiendo imagen a Imgbb...");

        const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
        });

        const datosImgbb = await respuestaImgbb.json();

        if (datosImgbb.success) {
            console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

            // Unimos la URL de la imagen con el resto de los datos del formulario
            const productoCompleto = {
                ...datosForm,
                // Agregamos la URL obtenida
                imagen: datosImgbb.data.url
            }

            // Por el momento hacemos un console.log
            console.log('Enviando los siguientes datos COMPLETOS a la API:', productoCompleto);

            // --- Lógica para guardar el producto en Firestore ---
            const db = getFirestore();
            const productosCollection = collection(db, "productos");

            await addDoc(productosCollection, productoCompleto);
            console.log("Producto agregado a Firestore con éxito.");

            alert("Producto agregado con éxito.");
        } else {
            throw new Error('La subida de la imagen a Imgbb falló.');
        }
    } catch (error) {
        console.error("Error en el proceso de envío:", error);
        alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
    }
  };

  return (
    <>
      <h2>Agregar nuevo producto</h2>
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        manejarCambioImagen={manejarCambioImagen}
      />
    </>
  );
}

export default FormularioContainer;
