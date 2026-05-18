import './App.css'
import Layout from './Components/Layout/Layout';
import { ItemListContainer } from './Components/ItemListContainer/ItemListContainer';
import Contador from './Components/Contador/Contador';
import Bienvenida from './Components/Bienvenida/Bienvenida';
import Contacto from './Components/Contacto/Contacto';
import Carrito from './Components/Carrito/Carrito';
import { Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import FormularioContainer from './Components/FormularioProducto/FormularioContainer';

function App() {
  return (
    <>
      <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Bienvenida />} /> 
            <Route path="/productos" element={<ItemListContainer Mensaje="Todos los productos" />} />
            <Route path="/contacto" element={<Contacto />} /> 
            <Route path="/carrito" element={<Carrito />} /> 
            <Route path="/productos/:id" element={<ItemDetailContainer />} />
            <Route path="/altaproducto" element={<FormularioContainer />} />
          </Route>
      </Routes>
    </>)
}

export default App
