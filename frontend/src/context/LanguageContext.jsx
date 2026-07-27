import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../constants/translations';

const LanguageContext = createContext({
  lang: 'fr',
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang');
    return saved || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key, params = {}) => {
    const text = translations[lang]?.[key] || translations['fr']?.[key] || key;
    if (params && Object.keys(params).length > 0) {
      return Object.entries(params).reduce((acc, [k, v]) => acc.replace(`{${k}}`, v), text);
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);