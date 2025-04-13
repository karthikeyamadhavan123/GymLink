import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { HashLoader } from 'react-spinners';
import Protected from './Protected';
const HomePage = lazy(() => import('./pages/HomePage'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Pricing = lazy(() => import('./pages/Pricing'))
const NotFound = lazy(() => import('./pages/notfound/NotFound'))
const Register = lazy(() => import('./Forms/Register'))
const Login = lazy(() => import('./Forms/Login'))
const ForgotPassword = lazy(() => import('./Forms/forgotPassword'))
const ResetPassword = lazy(() => import('./Forms/ResetPassword'))
const GymMain = lazy(() => import('./gym-pages/GymMain'))
const SingleGym = lazy(() => import('./gym-pages/SingleGym'))
const JobMain = lazy(() => import('./gym-pages/jobs/JobMain'))
const TrainerMain = lazy(() => import('./gym-pages/trainers/TrainerMain'))
const ApplicationMain = lazy(() => import('./gym-pages/jobs/ApplicationMain'))
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
          <Route path='/dashboard/gyms' element={<Protected component={<GymMain />} />} />
          <Route path='/gym/:id' element={<Protected component={<SingleGym />} />} />
          <Route path='/jobs' element={<Protected component={<JobMain />} />} />
          <Route path='/trainers' element={<Protected component={<TrainerMain />} />} />
          <Route path='/applications' element={<Protected component={<ApplicationMain />} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
