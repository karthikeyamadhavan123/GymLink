import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from 'framer-motion'
const Main = () => {
    const text = 'Welcome to GymLink - Your Ultimate Fitness Companion'
    const router = useNavigate()
    const handleNavigation = (path: string) => {
        router(path)
    }
    return (
        <div className="bg-[url('/assets/images/gym/main.avif')] h-screen w-screen bg-cover relative">
            <Navbar />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div className="text-white text-3xl font-bold flex flex-col justify-center items-start px-15 space-y-5" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 2 }}>
                    <motion.h1>{text.split("").map((letter, index) => (
                        <motion.span key={index} initial={{ opacity: 1 }} animate={{ opacity: 0, color: '#8fe60f' }} transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }} >{letter}</motion.span>
                    ))}</motion.h1>
                    <p className="text-sm text-start">
                        Find the best gyms, top trainers, and exciting job opportunities in the fitness industry—all in one place.
                        Whether you&apos;re looking to train, hire, or grow your gym, GymLink connects you with the right
                        options. Enjoy real-time chat with gym owners and trainers, and seamless
                        applications. Discover AI-powered recommendations and take the next step in your fitness journey today!
                    </p>
                    <div className="flex space-x-4">
                        <button className="bg-[#8fe60f] rounded-tl-lg text-lg cursor-pointer hover:underline text-black px-3 py-1" onClick={() => handleNavigation('/api/auth/register')}>Join the Arena</button>
                        <button className="border-dashed bg-transparent text-lg hover:underline cursor-pointer" onClick={() => handleNavigation('/api/auth/login')}>Enter Arena</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Main;