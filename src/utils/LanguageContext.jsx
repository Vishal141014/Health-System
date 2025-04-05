import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const languages = {
  en: {
    name: 'English',
    code: 'en-US',
  },
  hi: {
    name: 'हिन्दी (Hindi)',
    code: 'hi-IN',
  },
  es: {
    name: 'Español (Spanish)',
    code: 'es-ES',
  },
  fr: {
    name: 'Français (French)',
    code: 'fr-FR',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage && languages[savedLanguage] ? savedLanguage : 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      languages, 
      changeLanguage,
      currentLanguage: languages[language] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 