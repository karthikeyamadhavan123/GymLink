import { Helmet } from "react-helmet-async";
import Footer from "./Footer"
import Main from "./Main"
import Comment from './Comment'
import Path from "./Path"
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
        <Comment />
        <Path />
        <Footer />
      </div>
    </>
  )
}

export default HomePage
