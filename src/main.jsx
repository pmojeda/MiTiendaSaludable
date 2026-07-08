import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider> {/* Proporciona el contexto de autenticación a toda la aplicación */}
      <CartProvider> {/* Proporciona el contexto del carrito a toda la aplicación */}
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
)
