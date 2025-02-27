import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="text-white flex h-[204px] w-full items-center justify-between relative font-nunito px-4 lg:px-10">
      {/* Logo */}
      <Link to='/'>
        <img src="/logo.png" alt="Gyma" className="w-[200px] h-[130px] md:w-[250px] md:h-[160px] lg:w-[304px] lg:h-[204px]" />
      </Link>

      {/* Hamburger Menu (visible below 1029px) */}
      <div className="xl:hidden z-10">
        <button onClick={toggleMenu} className="p-2">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (slides in from the right when active) */}
      <div className={`xl:hidden fixed top-0 right-0 h-full lg:w-1/3 lg:justify-center lg:flex  bg-gray-800 pt-20 px-6 transform transition-transform duration-300 ease-in-out z-0 md:w-1/2 md:flex md:justify-center sm:flex sm:w-full sm:justify-center sm:items-center xs:justify-center xs:items-center xs:flex xs:w-full ${isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
         
        <div className="flex flex-col gap-6">
        <h1 className="text-4xl">Welcome <span className="text-4xl text-[#88E70B] underline">Athlete!!</span></h1>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#88E70B] underline text-lg" : "text-lg hover:text-gray-300 transition-colors duration-200"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-[#88E70B] underline text-lg" : "text-lg hover:text-gray-300 transition-colors duration-200"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-[#88E70B] underline text-lg" : "text-lg hover:text-gray-300 transition-colors duration-200"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/plans"
            className={({ isActive }) =>
              isActive ? "text-[#88E70B] underline text-lg" : "text-lg hover:text-gray-300 transition-colors duration-200"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Plans
          </NavLink>

          <div className="flex flex-col gap-4 mt-6">
            <Link
              to="/api/login"
              className="flex gap-2 items-center group"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/login.png" alt="login" className="w-6 h-6" />
              <button className="text-white font-bold group-hover:text-gray-300 transition-colors duration-200">
                Enter Arena
              </button>
            </Link>

            <Link
              to="/api/register"
              className="bg-[#88E70B] rounded-tl-lg hover:bg-[#75c209] transition-colors duration-200 w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center justify-center p-2">
                <img src="/biceps.png" alt="sign up" className="w-6 h-6" />
                <button className="px-3 py-1 rounded-lg text-black font-bold">
                  Join the Arena
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Background (visible only at 1029px and above) */}
      <div className="hidden xl:flex bg-[#ADA6A6] opacity-40 w-96 h-16 rounded-lg absolute left-1/2 transform -translate-x-1/2 items-center justify-center " />

      {/* Desktop Navigation Links (visible only at 1029px and above) */}
      <div className="hidden xl:flex gap-10 absolute left-1/2 transform -translate-x-1/2 text-lg items-center justify-center font-medium lg:w-[425px] xl:w-[425px]">
        <NavLink to="/" className={({ isActive }) =>
          isActive ? "text-[#88E70B] underline text-[16px]" : "text-[16px] hover:text-gray-300 transition-colors duration-200"
        }>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) =>
          isActive ? "text-[#88E70B] underline text-[16px]" : "text-[16px] hover:text-gray-300 transition-colors duration-200"
        }>
          About Us
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) =>
          isActive ? "text-[#88E70B] underline text-[16px]" : "text-[16px] hover:text-gray-300 transition-colors duration-200"
        }>
          Contact Us
        </NavLink>
        <NavLink to="/plans" className={({ isActive }) =>
          isActive ? "text-[#88E70B] underline text-[16px]" : "text-[16px] hover:text-gray-300 transition-colors duration-200"
        }>
          Plans
        </NavLink>
      </div>

      {/* Desktop Signup/Login Buttons (visible only at 1029px and above) */}
      <div className="hidden xl:flex gap-7">
        <Link to="/api/login" className="flex gap-2 items-center justify-center group">
          <img src="/login.png" alt="login" className="w-7 h-7" />
          <button className="text-white font-bold text-[16px] group-hover:text-gray-300 transition-colors duration-200">
            Enter Arena
          </button>
        </Link>
        <Link to="/api/register" className="bg-[#88E70B] rounded-tl-lg hover:bg-[#75c209] transition-colors duration-200 px-1">
          <div className="flex items-center justify-center">
            <img src="/biceps.png" alt="sign up" className="w-7 h-7" />
            <button className="px-4 py-2 rounded-lg text-black font-bold text-[16px]">
              Join the Arena
            </button>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;