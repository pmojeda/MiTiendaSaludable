// En src/componentens/FormularioProducto/FormularioProducto
import React from "react";
// Por ahora, es un componente súper simple. Solo muestra el HTML.
function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  modoEdicion,
}) {
  return (
    <form
      onSubmit={manejarEnvio}
      className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md w-auto w-min mx-auto my-4"
    >
      <h2>{modoEdicion ? "Editar producto" : "Agregar nuevo producto"}</h2>

      <div className="my-3">
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
        <label className="text-sm font-semibold">Detalle:</label>
        <textarea
          placeholder="Ej: nueces y semillas de calidad y sabor únicos"
          name="detalle"
          value={datosForm.detalle}
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
        <label className="text-sm font-semibold">Producto destacado?:</label>
        <input
          type="checkbox"
          name="destacado"
          checked={datosForm.destacado}
          onChange={manejarCambio}
          className="mx-2"
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
        {modoEdicion && datosForm.imagen && (
          <div>
            <p>Imagen actual:</p>
            <img
              src={datosForm.imagen}
              alt="Vista previa"
              style={{ width: "100px" }}
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-75 rounded-xl bg-black px-4 py-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-800 my-3"
      >
        {modoEdicion ? "Actualizar producto" : "Guardar producto"}
      </button>
    </form>
  );
}

export default FormularioProducto;
