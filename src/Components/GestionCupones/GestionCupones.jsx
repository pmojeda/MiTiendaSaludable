import React, { useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

function GestionCupones() {
  const [cupones, setCupones] = React.useState([]);
  const [nuevoCupon, setNuevoCupon] = React.useState({
    codigo: "",
    descuento: "",
  });

  const obtenerCupones = async () => {
    try {
      const cuponesRef = collection(db, "cupones");
      const resp = await getDocs(cuponesRef);
      setCupones(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching cupones:", error);
    }
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNuevoCupon((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAgregarCupon = async (e) => {
    e.preventDefault();

    if (!nuevoCupon.codigo || !nuevoCupon.descuento) {
      alert("Por favor, complete todos los campos antes de agregar un cupón.");
      return;
    }

    if (
      isNaN(nuevoCupon.descuento) ||
      nuevoCupon.descuento <= 0 ||
      nuevoCupon.descuento > 100
    ) {
      alert("El descuento debe ser un número entre 1 y 100.");
      return;
    }

    try {
      const cuponesRef = collection(db, "cupones");
      await addDoc(cuponesRef, nuevoCupon);
      setCupones((prevCupones) => [...prevCupones, nuevoCupon]);
      setNuevoCupon({ codigo: "", descuento: "" });
      alert("Cupón agregado exitosamente.");
      await obtenerCupones(); // Actualiza la lista de cupones después de agregar uno nuevo
    } catch (error) {
      console.error("Error agregando cupón:", error);
    }
  };

  const handleEliminarCupon = async (id) => {
    try {
      const confirmacionDelete = window.confirm(
        "¿Estás seguro de que deseas eliminar este cupón?",
      );

      if (confirmacionDelete) {
        const docRef = doc(db, "cupones", id);
        await deleteDoc(docRef);
        setCupones((prevCupones) =>
          prevCupones.filter((cupon) => cupon.id !== id),
        );
        alert("Cupón eliminado exitosamente.");
      }
    } catch (error) {
      console.error("Error eliminando cupón:", error);
    }
  };

  return (
    <div>
      <h2>Gestión de Cupones</h2>

      <div className="my-3">
        <label className="text-sm font-semibold">Código del Cupón:</label>
        <input
          type="text"
          name="codigo"
          placeholder="Ingrese el código"
          value={nuevoCupon.codigo}
          onChange={handleInputChange}
          className="border mx-2"
        />
      </div>

      <div className="my-3">
        <label className="text-sm font-semibold">Descuento:</label>
        <input
          type="number"
          name="descuento"
          placeholder="ingrese el porcentaje"
          value={nuevoCupon.descuento}
          onChange={handleInputChange}
          className="border mx-2"
        />
      </div>
      <button
        onClick={handleAgregarCupon}
        className="w-75 rounded-xl bg-black px-4 py-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-800 my-3"
      >
        Agregar Cupón
      </button>

      <hr />

      <h3 className="text-xl font-semibold mt-4 mb-2">Cupones existentes:</h3>

      <ul>
        {cupones.map((cupon) => (
          <li key={cupon.id} className="mb-2">
            <strong>Código:</strong> {cupon.codigo} -{" "}
            <strong>Descuento:</strong> {cupon.descuento}%
            <button
              onClick={() => handleEliminarCupon(cupon.id)}
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestionCupones;
