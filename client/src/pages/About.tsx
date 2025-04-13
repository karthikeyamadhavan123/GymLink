import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
export default function About() {
    const router = useNavigate()
    const handleRoute = () => {
        router('/api/auth/register')
    }
    return (
        <>
            <Helmet>
                <title>About GymLink - Your Fitness Partner</title>
                <meta name="description" content="Learn more about GymLink, the ultimate platform to find top gyms and trainers in your locality. Join us and start your fitness journey today!" />
                <meta name="keywords" content="About GymLink, fitness platform, gyms, trainers, health, exercise" />
                <link rel="canonical" href="https://gymlink.com/about" />
            </Helmet>
            <div className="bg-black">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-stencil">
                    <h1 className="text-3xl sm:text-4xl font-bold text-lime-400 mb-4 sm:mb-6 text-center sm:text-left">About GymLink</h1>

                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold text-lime-400 mb-3 sm:mb-4 text-center sm:text-left underline">Your Ultimate Fitness Companion</h2>
                        <p className="text-base sm:text-lg text-white mb-4">
                            GymLink is a comprehensive gym discovery and fitness platform designed to transform your fitness journey.
                            We connect you with the best fitness resources in your area while providing tools to track and improve your progress.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-10">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                            <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-2 sm:mb-3">Discover & Connect</h3>
                            <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                    <span>Find the best gyms in your locality based on ratings and amenities</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-400 mr-2 flex-shrink-0">✓</span>
                                    <span>Connect with top-rated fitness trainers and coaches</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-400 mr-2 flex-shrink-0">✓</span>
                                    <span>Get personalized gym recommendations based on your preferences</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                            <h3 className="text-lg sm:text-xl font-semibold text-teal-500 mb-2 sm:mb-3">Track & Improve</h3>
                            <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                    <span>Access AI-powered fitness recommendations tailored to your goals</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                    <span>Monitor your nutrition with our comprehensive tracking tools</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                    <span>Track your progress and celebrate your fitness milestones</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-6 sm:mb-10">
                        <h2 className="text-xl sm:text-2xl font-semibold text-teal-500 mb-3 sm:mb-4 text-center sm:text-left">A Complete Fitness Hub</h2>
                        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                            GymLink goes beyond just gym discovery by offering a comprehensive suite of features designed to support every aspect of your fitness journey.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-teal-50 p-4 sm:p-5 rounded-lg border border-teal-100">
                                <h3 className="text-base sm:text-lg font-semibold text-teal-600 mb-2">Nutrition Tracker</h3>
                                <p className="text-sm sm:text-base text-gray-700">
                                    Log meals, track macros, and get personalized nutrition advice to fuel your workouts effectively.
                                </p>
                            </div>

                            <div className="bg-teal-50 p-4 sm:p-5 rounded-lg border border-teal-100">
                                <h3 className="text-base sm:text-lg font-semibold text-teal-600 mb-2">Community Forum</h3>
                                <p className="text-sm sm:text-base text-gray-700">
                                    Connect with like-minded fitness enthusiasts, share tips, and get motivated by others success stories.
                                </p>
                            </div>

                            <div className="bg-teal-50 p-4 sm:p-5 rounded-lg border border-teal-100 sm:col-span-2 md:col-span-1">
                                <h3 className="text-base sm:text-lg font-semibold text-teal-600 mb-2">Job Listings</h3>
                                <p className="text-sm sm:text-base text-gray-700">
                                    Find opportunities as a trainer or discover fitness professionals looking to help you achieve your goals.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center bg-lime-400 text-white p-6 sm:p-8 rounded-lg shadow-md">
                        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to transform your fitness journey?</h2>
                        <p className="text-base sm:text-lg mb-4 sm:mb-6">
                            Join thousands of users who have discovered their perfect gym match and achieved their fitness goals with GymLink.
                        </p>
                        <button className="bg-white text-teal-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-sm sm:text-base hover:cursor-pointer" onClick={handleRoute}>
                            Get Started Today
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}