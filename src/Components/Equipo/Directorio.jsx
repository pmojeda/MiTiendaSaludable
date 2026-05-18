import { useState, useEffect } from "react";
import TarjetaContacto from "./TarjetaContacto";

function Directorio() {
    const [contactos, setContactos  ] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {  
        fetch("/data/nosotros.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al cargar contactos");
                }
                return response.json();
            })
            .then((data) => {
                setContactos(data);
                setCargando(false);
            })
            .catch((error) => {
                setError(error.message);
                setCargando(false);
            });
        }
        , []);

        if (cargando) {
            return <p>Cargando contactos...</p>;
        }
        else if (error) {
            return <p>Error al cargar contactos: {error}</p>;
        }
        else {
            return (
                <div>
                    <h2>Directorio de Contactos</h2>
                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
                        {contactos.map((contacto) => (
                            <TarjetaContacto key={contacto.id} contacto={contacto} />
                        ))}
                    </div>
                </div>
            );
        }
    
}

export default Directorio;