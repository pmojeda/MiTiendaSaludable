// En src/componentens/FormularioProducto/FormularioProducto
import React from "react";
// Por ahora, es un componente súper simple. Solo muestra el HTML.
function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen }) {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "24rem",
    margin: "3rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    gap: "8px",
  };

  return (
    <form
      onSubmit={manejarEnvio}
      className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md h-80 w-100 mx-auto my-5"
    >
      <div className="my-3" >
        <label className="text-sm font-semibold">Nombre:</label>
        <input
          type="text"
          placeholder="Ej: nueces y semillas"
          name="nombre" // Atributo clave para identificar el input
          value={datosForm.nombre}
          onChange={manejarCambio}
          className="border mx-2"
        />
      </div>

      <div className="my-3">
        <label className="text-sm font-semibold">Descripción:</label>
        <input
          type="text"
          placeholder="Ej: nueces y semillas de calidad y sabor únicos"
          name="descripcion"
          value={datosForm.descripcion}
          onChange={manejarCambio}
          className="border mx-2 w-90"
        />
      </div>

      <div className="my-3">
        <label className="text-sm font-semibold">Precio: $</label>
        <input
          type="number"
          placeholder="Ej: 95"
          name="precio" // Atributo clave
          value={datosForm.precio}
          onChange={manejarCambio}
          className="border mx-2"
        />
      </div>

      <div className="my-3">
        <label className="text-sm font-semibold">Stock:</label>
        <input
          type="number"
          placeholder="Ej: 10"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
          className="border mx-2"
        />
      </div>

      <div className="my-3">
        <label className="text-sm font-semibold">URL Imagen:</label>
        <input
          type="file"
          placeholder="Ej: https://example.com/imagen.jpg"
          name="urlImagen"
          value={datosForm.urlImagen}
          onChange={manejarCambioImagen} // Nueva función para manejar el cambio del input de tipo "file"
          className="border mx-2 text-xs"          
        />
      </div>
      <button
        type="submit"
        className="w-75 rounded-xl bg-black px-4 py-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-800"
      >
        Guardar Producto
      </button>
    </form>
  );
}

export default FormularioProducto;
