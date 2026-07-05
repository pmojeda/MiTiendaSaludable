import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import FormularioProducto from "../FormularioProducto/FormularioProducto";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

function GestionProductos() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  //const [estadoInicialForm, setEstadoInicialForm] = useState({
  const estadoInicialForm = {
    nombre: "",
    precio: "",
    stock: "",
    detalle: "",
    destacado: false,
    categoria: "",
    imagen: "",
  };
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    if (productoEditando) {
      setDatosForm(productoEditando);
    } else {
      setDatosForm(estadoInicialForm);
    }
  }, [productoEditando]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);

        setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };

    obtenerProductos();
  }, [productos]);

  const handleDelete = async (id) => {
    const confirmacionDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?",
    );

    if (confirmacionDelete) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      //obtenerProductos(); // Actualiza la lista de productos después de eliminar
      setProductos(productos.filter((producto) => producto.id !== id));
      alert("Producto eliminado correctamente.");
    }
  };

  const handleEdit = (producto) => {
    setProductoEditando(producto);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    console.log("Enviando los siguientes datos a la API:", datosForm);
    let urlImagen = datosForm.imagen; // Inicializamos con la URL existente

    // Validamos que el usuario haya seleccionado una imagen
    if (imagenFile) {
      // --- Lógica para subir la imagen a Imgbb ---
      const apiKey = "427dddf46810c5c8088de2d48319ba21";
      const formData = new FormData();
      formData.append("image", imagenFile);

      try {
        console.log("Subiendo imagen a Imgbb...");

        const respuestaImgbb = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const datosImgbb = await respuestaImgbb.json();

        if (datosImgbb.success) {
          console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
          urlImagen = datosImgbb.data.url; // Actualizamos la URL de la imagen
        } else {
          throw new Error("La subida de la imagen a Imgbb falló.");
        }
      } catch (error) {
        console.error("Error en el proceso de envío:", error);
        alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
      }
    }

    if (urlImagen === "") {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }
    // --- Lógica para guardar el producto en Firestore ---
    // Unimos la URL de la imagen con el resto de los datos del formulario
    const productoCompleto = {
      ...datosForm,
      // Agregamos la URL obtenida
      imagen: urlImagen,
    };

    try {
      if (productoEditando) {
        // Actualizamos el producto existente
        const docRef = doc(db, "productos", productoEditando.id);
        await updateDoc(docRef, productoCompleto);
        console.log("Producto actualizado en Firestore con éxito.");
        setProductoEditando(null); // Limpiamos el estado de edición
        setDatosForm(estadoInicialForm); // Reiniciamos el formulario después de actualizar
      } else {
        // Agregamos el nuevo producto
        
        const productosCollection = collection(db, "productos");
        await addDoc(productosCollection, productoCompleto);
        console.log("Producto agregado a Firestore con éxito.");

        alert("Producto agregado con éxito.");
        setDatosForm(estadoInicialForm); // Reiniciamos el formulario después de agregar
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert(
        "Hubo un error al guardar el producto. Por favor, intentá de nuevo.",
      );
    }
  };

  const manejarCambio = (evento) => {
    evento.preventDefault();
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

  const cancelarEdicion = () => {
    setProductoEditando(null);
    setDatosForm(estadoInicialForm);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        manejarCambioImagen={manejarCambioImagen}
        modoEdicion={!!productoEditando}
      />
      <hr />

      <h3 className="text-xl font-semibold mt-4 mb-2">Productos existentes:</h3>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id} className="mb-2">
            <strong>{producto.nombre}</strong> - ${producto.precio.toFixed(2)} -
            Stock: {producto.stock}
            <button
              onClick={() => handleDelete(producto.id)}
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
            <button
              onClick={() => handleEdit(producto)}
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      {productoEditando && (
        <div className="mt-4 mb-4 p-4 border border-gray-300 rounded">
          <button
            onClick={cancelarEdicion}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            Cancelar Edición
          </button>
        </div>
      )}
    </div>
  );
}

export default GestionProductos;
