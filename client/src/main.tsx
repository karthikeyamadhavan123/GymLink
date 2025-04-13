import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from "react-helmet-async";
<<<<<<< HEAD

=======
>>>>>>> 867beb7 (Checking Frontend and Backend)
const helmetContext={}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
    <App />
<<<<<<< HEAD
=======

>>>>>>> 867beb7 (Checking Frontend and Backend)
    </HelmetProvider>
  </StrictMode>,
)
