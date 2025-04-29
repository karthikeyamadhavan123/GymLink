import { useState } from 'react';
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
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} className='cursor-pointer' /> : <Menu size={24} className='cursor-pointer' />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-black font-stencil fixed md:static h-screen z-40 transition-all duration-300 
                    ${isOpen ? 'left-0 w-64' : '-left-full'} 
                    md:left-0 md:w-1/5 md:min-w-48 flex flex-col border-r-2 justify-between md:flex lg:flex sm:flex xs:hidden`}
      >
        {/* Logo at the top */}
        <div className="flex-shrink-0 flex items-center p-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="text-xl font-bold"
            loading="lazy"
            width={120}
            height={120}
          />
        </div>

        {/* Links in the middle - grows to take available space */}
        <div className="flex-grow overflow-y-auto px-4">
          <div className="flex flex-col space-y-4">
            {adminSidebarLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  className="flex items-center p-2 hover:bg-gray-800 rounded-md transition-colors"
                  key={index}
                  to={item.path}
                >
                  <Icon className="mr-3 text-white" size={20} />
                  <span className="text-white">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User info at the bottom - now properly fixed at bottom */}
        {isUserMenuOpen && (
            <div className="mt-4 pl-12 bg-gray-700 w-full rounded-md">
              <div className="py-1">
                <button
                  className="block px-2 py-1 text-sm text-white hover:text-lime-300 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        <div className="mt-auto flex-shrink-0 p-4 border-t border-gray-800">
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={toggleUserMenu}
          >
            <div className='flex items-center space-x-3'>
              {userImage ? (
                <img src={userImage} alt="userimage" className='rounded-md w-10 h-10' />
              ) : (
                <img src="/user.png" alt="user" className='rounded-md w-10 h-10' />
              )}
              <div className='text-sm hover:text-lime-300 text-white hover:transition-all hover:ease-in-out truncate'>
                {userEmail}
              </div>
            </div>
            {isUserMenuOpen ? (
              <ChevronUp className="text-white" size={16} />
            ) : (
              <ChevronDown className="text-white" size={16} />
            )}
          </div>

        
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;