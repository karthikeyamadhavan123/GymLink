import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from 'react-hot-toast';
const helmetContext = {}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <App />
      <Toaster />
    </HelmetProvider>
  </StrictMode>,
)
