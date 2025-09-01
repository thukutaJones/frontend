// i18n/config.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en/common.json";
import ny from "@/locales/ny/common.json";
import tum from "@/locales/tum/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ny: { translation: ny },
    tum: { translation: tum },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
