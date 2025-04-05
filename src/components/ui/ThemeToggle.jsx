import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../utils/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-primary
                hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-6 h-6 transition-all duration-300 transform">
        {darkMode ? (
          <FiSun className="absolute inset-0 w-full h-full text-yellow-300 transform transition-transform rotate-0" />
        ) : (
          <FiMoon className="absolute inset-0 w-full h-full text-gray-700 transform transition-transform rotate-0" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle; 