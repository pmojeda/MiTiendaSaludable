function TarjetaContacto({ contacto }) {
console.log("Contacto recibido:", contacto);

 return (
    <div className="max-w-xs rounded-xl border border-gray-500 bg-white p-5 shadow-sm text-center">
      {/* Imagen */}
      <img 
        className="mx-auto h-20 w-20 rounded-full object-cover" 
        src={contacto.imagen} 
        alt={`Foto de perfil de ${contacto.nombre}`}
      />

      {/* Nombre */}
      <h3 className="mt-3 text-base font-bold text-gray-900">{contacto.nombre}</h3>
      
      {/* Puesto */}
      <p className="text-xs text-indigo-600 font-medium">{contacto.puesto}</p>
      
      {/* Email */}
      <a 
        href={`${contacto.linkedin}`} 
        className="mt-2 inline-block text-xs text-gray-500 font-mono hover:text-indigo-600 transition-colors"
      >
        {contacto.linkedin}
      </a>
    </div>
  );
}

export default TarjetaContacto;
