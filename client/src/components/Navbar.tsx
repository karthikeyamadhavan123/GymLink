import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Dumbbell } from 'lucide-react'
import { LogIn } from 'lucide-react'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
   
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
   const location  = useLocation()
   const pathname = location.pathname

    return (
        <>
            <div className="relative h-24 text-white z-10 font-stencil">
                <nav className="shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-full">
                            {/* Logo and desktop navigation */}
                            <div className="flex items-center">
                                <div className="flex-shrink-0 flex items-center">
                                    {/* <image className="text-xl font-bold " width={140} height={140} alt='Logo' src={'/logo.png'} /> */}
                                    <img src="/assets/images/logo/logo.png" alt="Logo" className='text-xl font-bold' loading='lazy' width={140} height={140} />
                                </div>
                                <div className="hidden md:ml-6 md:flex md:space-x-8  ">
                                    <Link to="/" className={`${pathname==='/'?'inline-flex items-center px-1 pt-1  text-lg font-medium text-white hover:text-lime-400 border-lime-400 border-b-2':'inline-flex items-center px-1 pt-1  text-lg font-medium text-white hover:text-lime-400 hover:border-lime-400 hover:border-b-2'}`}>
                                        Home
                                    </Link>
                                    <Link to="/about" className={`${pathname==='/about'?'inline-flex items-center px-1 pt-1  text-lg font-medium text-white hover:text-lime-400 border-lime-400 border-b-2':'inline-flex items-center px-1 pt-1  text-lg font-medium text-white hover:text-lime-400 hover:border-lime-400 hover:border-b-2'}`}>
                                        About
                                    </Link>
                                    <Link to="/orders/memberships" className={`${pathname==='/orders/memberships'?'inline-flex items-center px-1 pt-1  text-lg font-medium text-white hover:text-lime-400 border-lime-400 border-b-2':'inline-flex items-center px-1 pt-1  text-lg font-medium text-white hover:text-lime-400 hover:border-lime-400 hover:border-b-2'}`}>
                                        Pricing
                                    </Link>
                                    <Link to="/contact" className={`${pathname==='/contact'?'inline-flex items-center px-1 pt-1  text-lg font-medium text-white hover:text-lime-400 border-lime-400 border-b-2':'inline-flex items-center px-1 pt-1  text-lg font-medium text-white hover:text-lime-400 hover:border-lime-400 hover:border-b-2'}`}>
                                        Contact
                                    </Link>
                                </div>
                            </div>

                            {/* Desktop buttons */}
                            <div className="hidden md:flex md:items-center md:space-x-0 lg:space-x-4">
                                <div className='bg-[#8fe60f] flex items-center rounded-tl-lg justify-around gap-2'>
                                    <Dumbbell size={20} color='#000' />
                                    <Link to="/api/auth/register" className="py-2 pr-2 text-lg  text-black  font-bold hover:underline">
                                        Join the Arena
                                    </Link>
                                </div>

                                <div className='flex items-center justify-around gap-2 hover:border-2 hover:border-dashed hover:rounded-tl-lg'>
                                    <LogIn />
                                    <Link to="/api/auth/login" className="py-2 pr-2 font-medium text-white text-xl hover:underline">
                                        Enter Arena
                                    </Link>
                                </div>

                            </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center md:hidden relative z-10">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
                                    onClick={toggleMenu}
                                >
                                    <span className="sr-only cursor-pointer">{isOpen ? 'Close menu' : 'Open menu'}</span>
                                    {isOpen ? (
                                        <X className="h-6 w-6 cursor-pointer" />
                                    ) : (
                                        <Menu className="h-6 w-6 cursor-pointer" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu - slides from right to left */}
                <div
                    className={`fixed top-0 right-0 h-full w-full sm:w-64  bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex justify-end p-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6 text-black" />
                        </Button>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-700 bg-indigo-50">
                            Home
                        </Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            About
                        </Link>
                        <Link to="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            Pricing
                        </Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            Contact
                        </Link>
                    </div>
                    <div className="px-4 space-y-3">
                        {/* Join the Arena button */}
                        <div className='bg-[#8fe60f] flex items-center justify-center text-black rounded-tl-lg hover:underline mx-auto w-4/5'>
                            <Dumbbell className="mr-2" />
                            <Link to="/api/auth/register" className="block py-2 text-base font-medium">
                                Join the Arena
                            </Link>
                        </div>

                        {/* Enter Arena button */}
                        <div className='flex items-center justify-center border-2 border-black rounded-tl-lg hover:underline mx-auto w-4/5'>
                            <LogIn color='#000' className="mr-2" />
                            <Link to="/api/auth/login" className="block py-2 text-base font-medium text-black">
                                Enter Arena
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Overlay when menu is open */}
                <div
                    className={`fixed inset-0 bg-opacity-25 z-40 md:hidden ${isOpen ? 'block' : 'hidden'}`}
                    onClick={toggleMenu}
                ></div>

            </div>

        </>
    );
};

export default Navbar;