import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getPreferedLanguage, getSystemLanguage } from './utils/languageTools'; 

// translation files for english language
import loginEnUSTranslation from './locales/en-US/login-translation.json';

// translation files for turkish language
import loginTrTranslation from './locales/tr-TR/login-translation.json';

// include translation files
const resources = {
  'tr-TR': {
    login: loginTrTranslation
  },
  'en-US': {
    login: loginEnUSTranslation
  }
};

i18n
  .use(initReactI18next) // React entegrasyonunu başlatın
  .init({
    resources,
    lng: getPreferedLanguage() && getSystemLanguage(), // Başlangıç dilini ayarlayın
    fallbackLng: 'en-US', // Yedek dil
    interpolation: {
      escapeValue: false // JSX içinde değişkenlerin kullanımını etkinleştirin
    }
  });

export default i18n;