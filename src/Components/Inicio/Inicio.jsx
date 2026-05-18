import ItemListContainer from "../ItemListContainer/ItemListContainer";

function Inicio() {
    return (
        <div>
            <h2>Bienvenido a nuestra tienda</h2>
            <p>En Mi Tienda Saludable, nos apasiona ofrecer productos frescos y saludables para toda la familia. Nuestro compromiso es brindarte una experiencia de compra única, con una amplia variedad de alimentos orgánicos, suplementos nutricionales y productos naturales que promueven un estilo de vida saludable.</p>
            <p>Explora nuestro catálogo y descubre la calidad y el sabor de nuestros productos. ¡Gracias por elegirnos!</p>
            <br></br>
            <ItemListContainer Mensaje="Productos destacados" Destacado={true}/>
        </div>
    );

}

export default Inicio;