import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WishlistProvider } from './context/WishlistContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </StrictMode>,
);
