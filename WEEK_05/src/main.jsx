import { createRoot } from 'react-dom/client';
import App from './App';
import CartContextProvider from './context/CartContextProvider';
import AuthContextProvider from './context/AuthContextProvider';

createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </AuthContextProvider>
);
