import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider> {/* Proporciona el contexto del carrito a toda la aplicación */}
      <App />
    </CartProvider>
  </BrowserRouter>,
)
