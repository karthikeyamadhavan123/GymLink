import { lazy } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer"
import Main from "../components/Main"
const CommentContainer = lazy(() => import("@/components/comments/CommentContainer"));
import Path from "../components/Path"
const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>GymLink - Find Your Perfect Gym</title>
        <meta name="description" content="Discover the best gyms near you with GymLink. Find top trainers, explore gym facilities, and connect with fitness experts." />
        <meta name="keywords" content="gym, fitness, workout, trainers, GymLink, health, exercise" />
      </Helmet>
      <div className="z-10 relative flex flex-col overflow-x-hidden bg-black font-stencil overflow-y-hidden">
        <Main />
        <CommentContainer />
        <Path />
        <Footer />
      </div>
    </>
  )
}

export default HomePage
