import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './assets/lang/en.json';
import translationTR from './assets/lang/tr.json';

const selectedLangCode = localStorage.getItem('i18nextLng') || 'EN';

const resources = {
  EN: {
    translation: translationEN,
  },
  TR: {
    translation: translationTR,
  },
};

const options: any = {
  debug: false,
  lng: selectedLangCode,
  fallbackLng: selectedLangCode,
  saveMissing: true,
  interpolation: {
    escapeValue: false,
  },
  resources: resources,
  load: 'languageOnly',
};

i18n.use(LanguageDetector).use(initReactI18next).init(options);

export default i18n;
