function Contacto() {
    return (
        <div>
            <h2>Contacto</h2>
            <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
            <a 
                href={`mailto:info@mitiendasaludable.com`} 
                className="mt-2 inline-block text-xs text-gray-500 font-mono hover:text-indigo-600 transition-colors"
            >
                Email: info@mitiendasaludable.com
            </a>
        </div>
    );
}

export default Contacto;