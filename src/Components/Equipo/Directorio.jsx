import { useState, useEffect } from "react";
import TarjetaContacto from "./TarjetaContacto";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

function Directorio() {
  const [equipo, setEquipo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const equipo = collection(db, "Equipo");

      getDocs(equipo)
        .then((resp) => {
          const equipoData = resp.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

      setEquipo(equipoData);
      setCargando(false);
    })
    .catch ((error) => {
      console.error("Error al obtener equipo:", error);
      setError(error.message);
      setCargando(false);
    });
  }, []);

  if (cargando) {
    return <p>Cargando contactos...</p>;
  } else if (error) {
    return <p>Error al cargar contactos: {error}</p>;
  } else {
    return (
      <div>
        <h2>Directorio de Contactos</h2>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {equipo.map((miembro) => (
            <TarjetaContacto key={miembro.id} contacto={miembro} />
          ))}
        </div>
      </div>
    );
  }
}

export default Directorio;
