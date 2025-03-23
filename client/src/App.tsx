import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from "react";
import HomePage from './Components/HomePage';
import About from './About/About';
import Contact from './Contact/Contact';
import Pricing from './Pricing/Pricing';
import { HashLoader } from 'react-spinners';
import GymMain from './Gyms/GymMain';
const Register = lazy(() => import('./Register/Register'))
const Login = lazy(() => import('./Login/Login'))
const ForgotPassword = lazy(() => import('./Forgot-password/forgotPassword'))
const ResetPassword = lazy(() => import('./Reset-password/ResetPassword'))
function App() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <HashLoader color='#fff' />
      </div>
    }>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/api/auth/register' element={<Register />} />
          <Route path='/api/auth/login' element={<Login />} />
          <Route path='/api/auth/forgot-password' element={<ForgotPassword />} />
          <Route path='/api/auth/reset-password/:token' element={<ResetPassword />} />
          <Route path='/dashboard/gyms' element={<GymMain />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
