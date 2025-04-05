import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white dark:bg-darkSurface shadow-md transition-colors duration-300">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">H</span>
            </div>
            <span className="font-bold text-xl text-gray-800 dark:text-white">HealthAssist</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Home</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">About</Link>
            <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Blog</Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Contact</Link>
            
            <div className="flex items-center space-x-2 ml-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            
            {user ? (
              <div className="relative group ml-2">
                <button className="flex items-center space-x-2 text-primary">
                  <FiUser />
                  <span>{user.email}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkSurface rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/chat" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary">
                    My Chats
                  </Link>
                  {/* Admin link */}
                  <Link to="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary">
                    Admin Panel
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 ml-2"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <LanguageSelector />
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="ml-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2 text-primary">
                      <FiUser />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </div>
                  <Link 
                    to="/chat" 
                    className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Chats
                  </Link>
                  <Link 
                    to="/admin" 
                    className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 