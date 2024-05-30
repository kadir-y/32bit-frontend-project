import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getPreferedLanguage, getSystemLanguage } from "./utils/languageTools"; 

// translation files for american english language
import loginEnUSTranslation from "./locales/en-US/login-translation.json";
import appEnUSTranslation from "./locales/en-US/app-translation.json";
import keyboardEnUSTranslation from "./locales/en-US/keyboard-translation.json";

// translation files for turkish language
import loginTrTRTranslation from "./locales/tr-TR/login-translation.json";
import appTrTRTranslation from "./locales/tr-TR/app-translation.json";
import keyboardTrTRTranslation from "./locales/tr-TR/keyboard-translation.json";

// translation files for biritish english language
import loginEnGBTranslation from "./locales/en-GB/login-translation.json";
import appEnGBTranslation from "./locales/en-GB/app-translation.json";
import keyboardEnGBTranslation from "./locales/en-GB/keyboard-translation.json";


// include translation files
const resources = {
  "tr-TR": {
    login: loginTrTRTranslation,
    app: appTrTRTranslation,
    keyboard: keyboardTrTRTranslation
  },
  "en-US": {
    login: loginEnUSTranslation,
    app: appEnUSTranslation,
    keyboard: keyboardEnUSTranslation
  },
  "en-GB": {
    login: loginEnGBTranslation,
    app: appEnGBTranslation,
    keyboard: keyboardEnGBTranslation
  }
};

const preferedLanguage = getPreferedLanguage();
const language = preferedLanguage ? preferedLanguage : getSystemLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: language, // Initialation language
    fallbackLng: "en-US", // Fallback language if the translation is not found
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;