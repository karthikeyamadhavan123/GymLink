import { Instagram, Youtube, Twitter, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-black text-white px-6 py-12 md:px-12 lg:px-20 font-stencil">
            {/* Top border line */}
            <div className="border-t border-gray-700 mb-12"></div>

            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left column */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold tracking-wider">GET TO KNOW US</h2>

                    <nav className="flex flex-col space-y-4">
                        <Link to="/faq" className="hover:text-gray-300 transition-colors">
                            FAQ&apos;s
                        </Link>
                        <Link to="/tips" className="hover:text-gray-300 transition-colors">
                            Fitness Tips
                        </Link>
                        <Link to="/terms" className="hover:text-gray-300 transition-colors">
                            Terms & Conditions
                        </Link>
                        <Link to="/find-gym" className="hover:text-gray-300 transition-colors">
                            Find a Gym
                        </Link>
                        <Link to="/find-trainers" className="hover:text-gray-300 transition-colors">
                            Top Trainers
                        </Link>
                    </nav>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold tracking-wider">ORDERS</h2>

                    <nav className="flex flex-col space-y-4">
                        <Link to="/orders/memberships" className="hover:text-gray-300 transition-colors">
                            Memberships
                        </Link>
                        <Link to="/orders/track-subscription" className="hover:text-gray-300 transition-colors">
                            Track Subscription
                        </Link>
                        <Link to="/orders/refund" className="hover:text-gray-300 transition-colors">
                            Cancellation & Refund Policy
                        </Link>
                        <Link to="/orders/elite" className="hover:text-gray-300 transition-colors">
                            Elite Training
                        </Link>
                        <Link to="/orders/plans" className="hover:text-gray-300 transition-colors">
                            Personal Training Plans
                        </Link>

                    </nav>
                </div>
            </div>

            {/* Sign up section */}
            <div className="mt-16 space-y-6">
                <h2 className="text-xl font-bold tracking-wider">
                    SIGN UP AND <span className="text-[#8fe60f]">TRAIN</span>
                </h2>

                <p className="text-lg">
                    Sign Up Now To Find Top Gyms, Expert Trainers & Exclusive Fitness Deals—Only On <span className="text-[#8fe60f]">GymLink</span>!
                </p>

                {/* Email subscription */}
                <div className="flex items-center mt-6 border-b border-white pb-2 max-w-md">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
                    />
                    <Mail className="h-6 w-6 text-white" />
                </div>

                {/* Social icons */}
                <div className="flex space-x-8 mt-10">
                    <Link to="https://instagram.com" className="hover:text-[#8fe60f] transition-colors" aria-label="Instagram" target='_blank'>
                        <Instagram className="h-8 w-8" />
                    </Link>
                    <Link to="https://youtube.com" className="hover:text-[#8fe60f] transition-colors" aria-label="YouTube" target='_blank'>
                        <Youtube className="h-8 w-8" />
                    </Link>
                    <Link to="https://twitter.com" className="hover:text-[#8fe60f] transition-colors" aria-label="Twitter" target='_blank'>
                        <Twitter className="h-8 w-8" />
                    </Link>
                    <Link to="https://linkedin.com" className="hover:text-[#8fe60f] transition-colors" aria-label="LinkedIn" target='_blank'>
                        <Linkedin className="h-8 w-8" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer