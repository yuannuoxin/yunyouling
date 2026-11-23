import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { ToastProvider } from './state/toast.tsx';
import { VpnProvider } from './state/vpn.tsx';
import './app.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <VpnProvider>
        <App />
      </VpnProvider>
    </ToastProvider>
  </StrictMode>,
);
