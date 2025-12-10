import { useState } from 'react';
import { Menu, X, Dumbbell, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinkClass = (path: string) => {
        const baseClass = "inline-flex items-center px-1 pt-1 text-sm sm:text-base lg:text-lg font-medium text-white hover:text-lime-400 transition-colors";
        return pathname === path
            ? `${baseClass} border-lime-400 border-b-2`
            : `${baseClass} hover:border-lime-400 hover:border-b-2`;
    };

    return (
        <>
            <div className="relative h-20 sm:h-24 text-white z-10 font-stencil">
                <nav className="shadow-md">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                        <div className="flex justify-between items-center h-20 sm:h-24">
                            {/* Logo and desktop navigation */}
                            <div className="flex items-center flex-1">
                                <div className="shrink-0 flex items-center">
                                    <img
                                        src="/logo.png"
                                        alt="Logo"
                                        className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 object-contain"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="hidden md:flex md:ml-4 lg:ml-8 md:space-x-4 lg:space-x-8">
                                    <Link to="/" className={navLinkClass('/')}>
                                        Home
                                    </Link>
                                    <Link to="/about" className={navLinkClass('/about')}>
                                        About
                                    </Link>
                                    <Link to="/orders/memberships" className={navLinkClass('/orders/memberships')}>
                                        Pricing
                                    </Link>
                                    <Link to="/contact" className={navLinkClass('/contact')}>
                                        Contact
                                    </Link>
                                </div>
                            </div>

                            {/* Desktop buttons */}
                            <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
                                <div className="bg-[#8fe60f] flex items-center rounded-tl-lg gap-1 lg:gap-2 px-2 lg:px-3 hover:bg-[#7cd00d] transition-colors">
                                    <Dumbbell size={18} className="lg:w-5 lg:h-5" color="#000" />
                                    <Link to="/api/auth/register" className="py-2 text-sm lg:text-base text-black font-bold hover:underline whitespace-nowrap">
                                        Join the Arena
                                    </Link>
                                </div>

                                <div className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 hover:border-2 hover:border-dashed hover:rounded-tl-lg transition-all">
                                    <LogIn size={18} className="lg:w-5 lg:h-5" />
                                    <Link to="/api/auth/login" className="py-2 font-medium text-white text-sm lg:text-base hover:underline whitespace-nowrap">
                                        Enter Arena
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center md:hidden">
                                <button
                                    type="button"
                                    className="text-white hover:text-lime-400 p-2 rounded-md transition-colors"
                                    onClick={toggleMenu}
                                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                                >
                                    {isOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                <div
                    className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex justify-end p-4 border-b">
                        <button
                            type="button"
                            className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
                            onClick={toggleMenu}
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="px-4 pt-4 pb-3 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
                        <Link
                            to="/"
                            className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${pathname === '/'
                                    ? 'text-indigo-700 bg-indigo-50'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${pathname === '/about'
                                    ? 'text-indigo-700 bg-indigo-50'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            onClick={toggleMenu}
                        >
                            About
                        </Link>
                        <Link
                            to="/orders/memberships"
                            className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${pathname === '/orders/memberships'
                                    ? 'text-indigo-700 bg-indigo-50'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            onClick={toggleMenu}
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/contact"
                            className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${pathname === '/contact'
                                    ? 'text-indigo-700 bg-indigo-50'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            onClick={toggleMenu}
                        >
                            Contact
                        </Link>
                    </div>

                    <div className="px-4 py-4 space-y-3 border-t">
                        <div className="bg-[#8fe60f] flex items-center justify-center text-black rounded-tl-lg hover:bg-[#7cd00d] transition-colors">
                            <Dumbbell className="mr-2" size={20} />
                            <Link
                                to="/api/auth/register"
                                className="block py-3 text-base font-bold"
                                onClick={toggleMenu}
                            >
                                Join the Arena
                            </Link>
                        </div>

                        <div className="flex items-center justify-center border-2 border-black rounded-tl-lg hover:bg-gray-50 transition-colors">
                            <LogIn color="#000" className="mr-2" size={20} />
                            <Link
                                to="/api/auth/login"
                                className="block py-3 text-base font-medium text-black"
                                onClick={toggleMenu}
                            >
                                Enter Arena
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={toggleMenu}
                    ></div>
                )}
            </div>
        </>
    );
};

export default Navbar;