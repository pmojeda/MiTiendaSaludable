import './App.css'
import Layout from './Components/Layout/Layout';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import Contador from './Components/Contador/Contador';
import Inicio from './Components/Inicio/Inicio';
import Contacto from './Components/Contacto/Contacto';
import Carrito from './Components/Carrito/Carrito';
import { Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import FormularioContainer from './Components/FormularioProducto/FormularioContainer';
import ProductosNacionales from './Components/ProductosNacionales/ProductosNacionales';
import ProductosNacionalesDetalle from './Components/ProductosNacionales/ProductosNacionalesDetalle';
import Gestion from './Components/Gestion/Gestion';

function App() {
  return (
    <>
      <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Inicio />} /> 
            <Route path="/productos" element={<ItemListContainer Mensaje="Nuestros productos" />} />
            <Route path="/contacto" element={<Contacto />} /> 
            <Route path="/carrito" element={<Carrito />} /> 
            <Route path="/productos/:id" element={<ItemDetailContainer />} />
            <Route path="/gestion" element={<Gestion />} />
            <Route path="/productosnacionales" element={<ProductosNacionales />} />
            <Route path="/productosnacionales/:idParam" element={<ProductosNacionalesDetalle />} />
          </Route>
      </Routes>
    </>)
}

export default App
