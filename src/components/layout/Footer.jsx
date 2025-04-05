import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { useTheme } from '../../utils/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { darkMode } = useTheme();

  return (
    <footer className={`${darkMode ? 'bg-darkSurface' : 'bg-gray-800'} text-white transition-colors duration-300`}>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">HealthAssist</h3>
            <p className="text-gray-400 mb-4">
              AI-powered healthcare assistance designed to provide guidance and support for your health concerns.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">Health Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-white transition-colors duration-200">AI Health Chat</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Emergency Locator</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">Health Resources</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-400">
              <p>123 Health Street</p>
              <p>Wellness City, HC 12345</p>
              <p className="mt-3">Email: info@healthassist.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} HealthAssist. All rights reserved.</p>
          <p className="mt-2 text-sm">
            <span className="mr-4 hover:text-white cursor-pointer transition-colors duration-200">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors duration-200">Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 