import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import AdminApp from './admin/AdminApp.tsx';
import { StoreProvider } from './context/StoreContext.tsx';
import { ProductLandingPage } from './components/ProductLandingPage.tsx';
import { CollectionLandingPage } from './components/CollectionLandingPage.tsx';
import './index.css';

const isAdmin = window.location.pathname.startsWith('/admin');
const productMatch = window.location.pathname.match(/^\/products?\/([^/]+)\/?$/);
const collectionMatch = window.location.pathname.match(/^\/(?:collections?|categor(?:y|ies))\/([^/]+)\/?$/);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminApp /> : productMatch ? <StoreProvider><ProductLandingPage slug={decodeURIComponent(productMatch[1])} /></StoreProvider> : collectionMatch ? <StoreProvider><CollectionLandingPage slug={decodeURIComponent(collectionMatch[1])} /></StoreProvider> : <App />}
  </StrictMode>,
);
