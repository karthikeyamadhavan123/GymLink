import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Helmet } from "react-helmet-async";

export default function Pricing() {
    return (
        <>
            <Helmet>
                <title>GymLink Pricing - Affordable Plans for Everyone</title>
                <meta name="description" content="Explore GymLink's pricing plans. Choose the best subscription to access top gym listings, trainers, and fitness programs tailored for you." />
                <meta name="keywords" content="GymLink pricing, membership plans, gym subscription, affordable fitness, premium access" />
            </Helmet>
            <div className="bg-black font-stencil">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-lime-400 mb-4 sm:mb-6 text-center">Membership Plans</h1>

                    <p className="text-base sm:text-lg text-white mb-6 sm:mb-10 text-center max-w-2xl mx-auto">
                        Choose the perfect GymLink plan to match your fitness journey. From casual gym-goers to dedicated fitness enthusiasts, we have options for everyone.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Basic Plan */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                            <div className="p-6 bg-gray-50 border-b border-gray-200">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Basic</h2>
                                <p className="text-center mt-2 text-gray-600 font-medium">For casual gym-goers</p>

                                <div className="text-center mt-4">
                                    <span className="text-4xl font-bold text-teal-600">$9.99</span>
                                    <span className="text-gray-600 ml-1">/month</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Gym discovery in your area</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Basic trainer recommendations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Community forum access</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2 flex-shrink-0">✗</span>
                                        <span className="text-sm sm:text-base text-gray-400">Advanced AI recommendations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2 flex-shrink-0">✗</span>
                                        <span className="text-sm sm:text-base text-gray-400">Nutrition tracking tools</span>
                                    </li>
                                </ul>

                                <button className="w-full mt-6 py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition duration-300">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-teal-500 transform md:scale-105 z-10">
                            <div className="p-6 bg-teal-50 border-b border-teal-100">
                                <div className="bg-teal-500 text-white text-xs uppercase font-bold rounded-full py-1 px-2 inline-block mb-2 mx-auto">Most Popular</div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Premium</h2>
                                <p className="text-center mt-2 text-gray-600 font-medium">For fitness enthusiasts</p>

                                <div className="text-center mt-4">
                                    <span className="text-4xl font-bold text-teal-600">$19.99</span>
                                    <span className="text-gray-600 ml-1">/month</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Everything in Basic</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">AI-powered workout plans</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Nutrition tracking tools</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Priority gym deals</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2 flex-shrink-0">✗</span>
                                        <span className="text-sm sm:text-base text-gray-400">1-on-1 consultation</span>
                                    </li>
                                </ul>

                                <button className="w-full mt-6 py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition duration-300">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                            <div className="p-6 bg-gray-50 border-b border-gray-200">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Pro</h2>
                                <p className="text-center mt-2 text-gray-600 font-medium">For serious athletes</p>

                                <div className="text-center mt-4">
                                    <span className="text-4xl font-bold text-teal-600">$29.99</span>
                                    <span className="text-gray-600 ml-1">/month</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Everything in Premium</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">1-on-1 trainer consultation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Advanced progress analytics</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Exclusive gym discounts</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 mr-2 flex-shrink-0">✓</span>
                                        <span className="text-sm sm:text-base text-gray-700">Priority support</span>
                                    </li>
                                </ul>

                                <button className="w-full mt-6 py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition duration-300">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-lime-400 mb-6 text-center">Frequently Asked Questions</h2>

                        <div className="space-y-4 max-w-3xl mx-auto">
                            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">Can I change my plan later?</h3>
                                <p className="mt-2 text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
                            </div>

                            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">Is there a free trial?</h3>
                                <p className="mt-2 text-gray-600">We offer a 7-day free trial for all new members. You can explore all features before committing to a paid plan.</p>
                            </div>

                            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">Do you offer discounts for annual plans?</h3>
                                <p className="mt-2 text-gray-600">Yes! Save up to 20% when you choose annual billing for any of our plans.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}