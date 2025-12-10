import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from 'react-hot-toast';
import SocketContextProvider from './SocketContext/SocketContext.tsx';
const helmetContext = {}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
      <Toaster />
    </HelmetProvider>
  </StrictMode>,
)
