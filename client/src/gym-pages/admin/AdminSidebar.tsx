import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronUp, ChevronDown } from 'lucide-react';
import adminSidebarLinks from '../../actions/getAdminIcons';
import useUserStore from '@/zustand';
import axios from 'axios';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useNavigate()
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close sidebar when clicking on a link on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  // Close sidebar when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const userEmail = useUserStore((state) => state.details?.email);
  const userImage = useUserStore((state) => state.details?.avatar);
  const logoutUrl = import.meta.env.VITE_DB_URL + '/api/users/logout'
  
  const handleLogout = async () => {
    await axios.post(logoutUrl, {}, { withCredentials: true });
    useUserStore.setState({ details: null })
    localStorage.removeItem('user-storage')
    router('/')
  }

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-lg bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-black font-stencil fixed md:static h-screen z-40 transition-all duration-300 ease-in-out
                    ${isOpen ? 'left-0' : '-left-full'} 
                    w-64 sm:w-72 md:w-1/5 md:min-w-48 lg:w-64 xl:w-72
                    flex flex-col border-r-2 border-gray-800 shadow-2xl md:shadow-none`}
      >
        {/* Logo at the top */}
        <div className="flex-shrink-0 flex items-center p-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="max-w-full h-auto"
            loading="lazy"
            width={120}
            height={120}
          />
        </div>

        {/* Links in the middle - grows to take available space */}
        <div className="flex-grow overflow-y-auto px-4 pb-4">
          <div className="flex flex-col space-y-2">
            {adminSidebarLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  className="flex items-center p-3 hover:bg-gray-800 rounded-lg transition-colors group touch-manipulation"
                  key={index}
                  to={item.path}
                  onClick={handleLinkClick}
                >
                  <Icon className="mr-3 text-white group-hover:text-lime-300 transition-colors flex-shrink-0" size={20} />
                  <span className="text-white group-hover:text-lime-300 transition-colors text-sm md:text-base truncate">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User menu dropdown */}
        {isUserMenuOpen && (
          <div className="mx-4 mb-2 bg-gray-700 rounded-lg shadow-inner">
            <div className="py-2">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-white hover:text-lime-300 hover:bg-gray-600 rounded-lg transition-colors touch-manipulation"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* User info at the bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-800">
          <div
            className='flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors touch-manipulation'
            onClick={toggleUserMenu}
          >
            <div className='flex items-center space-x-3 min-w-0 flex-1'>
              {userImage ? (
                <img 
                  src={userImage} 
                  alt="User avatar" 
                  className='rounded-full w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 object-cover' 
                />
              ) : (
                <img 
                  src="/user.png" 
                  alt="Default user avatar" 
                  className='rounded-full w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 object-cover' 
                />
              )}
              <div className='text-xs sm:text-sm text-white hover:text-lime-300 transition-colors truncate min-w-0'>
                {userEmail}
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              {isUserMenuOpen ? (
                <ChevronUp className="text-white" size={16} />
              ) : (
                <ChevronDown className="text-white" size={16} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
