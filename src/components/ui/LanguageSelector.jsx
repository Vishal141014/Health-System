import { useState, useRef, useEffect } from 'react';
import { FiGlobe, FiCheck } from 'react-icons/fi';
import { useLanguage } from '../../utils/LanguageContext';

const LanguageSelector = () => {
  const { language, languages, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Select language"
      >
        <FiGlobe size={18} />
        <span className="hidden sm:inline-block">{languages[language].name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkSurface rounded-md shadow-lg z-10 transition-all py-1">
          {Object.entries(languages).map(([code, { name }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span>{name}</span>
              {language === code && <FiCheck className="text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 