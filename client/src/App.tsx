import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HashLoader } from "react-spinners";
import Protected from "./Protected";
import AdminProtected from "./AdminProtected";
import FrequentlyAskedQuestion from "./company/components/FrequentlyAskedQuestionContainer";
import FitnessTips from "./company/components/FitnessTipsContainer";
import TermsConditionsContainer from "./company/components/TermsContainer";
import ScrollToTop from "./utils/ScrollTop";
import FindGymContainer from "./company/components/FindGymContainer";
import TopTrainerContainer from "./company/components/TopTrainerContainer";
import CancellationRefund from "./pages/orders/components/Cancellation";
import EliteTraining from "./pages/orders/components/Elitetraining";
import PersonalTraining from "./pages/orders/components/Personaltraining";
import Memberships from "./pages/orders/components/Membership";
import TrackSubscription from "./pages/orders/components/Tracksubscription";
import Tracking from "./tracking_gym/Tracking";

const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/notfound/NotFound"));
const NotAuthorize = lazy(() => import("./pages/not-authorize/NotAuthorize"));
const Register = lazy(() => import("./Forms/Register"));
const Login = lazy(() => import("./Forms/Login"));
const ForgotPassword = lazy(() => import("./Forms/forgotPassword"));
const ResetPassword = lazy(() => import("./Forms/ResetPassword"));
const GymMain = lazy(() => import("@/gym-pages/gym-related-pages-users/GymMain"));
const SingleGym = lazy(() => import("@/gym-pages/gym-related-pages-users/SingleGym"));
const JobMain = lazy(() => import("./gym-pages/jobs/JobMain"));
const TrainerMain = lazy(() => import("./gym-pages/trainers/TrainerMain"));
const ApplicationMain = lazy(() => import("./gym-pages/jobs/ApplicationMain"));

// admin imports
const MyGyms = lazy(() => import("./gym-pages/admin/MyGyms"));
const AddGym = lazy(() => import('./gym-pages/admin/AddGym'))
const AddJob = lazy(() => import('./gym-pages/admin/admin-jobs/AddJob'))
const AdminJob = lazy(() => import('./gym-pages/admin/admin-jobs/AdminJob'))
const Applications = lazy(() => import('./gym-pages/admin-applications/Applications'))
const AdminTrainers = lazy(() => import('./gym-pages/admin/admin-trainers/GetMyTrainers'))
function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-black">
          <HashLoader color="#fff" />
        </div>
      }
    >
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders/memberships" element={<Memberships />} />
          <Route path="/faq" element={<FrequentlyAskedQuestion />} />
          <Route path="/tips" element={<FitnessTips />} />
          <Route path="/terms" element={<TermsConditionsContainer />} />
          <Route path="/find-gym" element={<FindGymContainer />} />
          <Route path="/find-trainers" element={<TopTrainerContainer />} />
          <Route path="/orders/track-subscription" element={<TrackSubscription />} />
          <Route path="/orders/refund" element={<CancellationRefund />} />
          <Route path="/orders/elite" element={<EliteTraining />} />
          <Route path="/orders/plans" element={<PersonalTraining />} />
          <Route path="/api/auth/register" element={<Register />} />
          <Route path="/api/auth/login" element={<Login />} />
          <Route
            path="/api/auth/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/api/auth/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/dashboard/gyms"
            element={<Protected Component={<GymMain />} />}
          />
          <Route
            path="/gym/:id"
            element={<Protected Component={<SingleGym />} />}
          />
          <Route path="/jobs" element={<Protected Component={<JobMain />} />} />
          <Route
            path="/trainers"
            element={<Protected Component={<TrainerMain />} />}
          />
          <Route
            path="/applications"
            element={<Protected Component={<ApplicationMain />} />}
          />
          <Route
            path="/admin-dashboard"
            element={<AdminProtected Component={<MyGyms />} />}
          />
          <Route
            path="/add/new-gym"
            element={<AdminProtected Component={<AddGym />} />}
          />
          <Route
            path="/:gymId/job/add"
            element={<AdminProtected Component={<AddJob />} />}
          />
          <Route
            path="/my-jobs"
            element={<AdminProtected Component={<AdminJob />} />}
          />
          <Route
            path="/admin-applications/:id"
            element={<AdminProtected Component={<Applications />} />}
          />
          <Route
            path="/admin-trainers"
            element={<AdminProtected Component={<AdminTrainers />} />}
          />
          <Route path="/not-authorized" element={<NotAuthorize />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/tracking' element={<Tracking />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
