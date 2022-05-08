import i18n from "i18next";
import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import { load } from 'js-yaml';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: 'en',
        backend: {
            loadPath: '/locales/{{lng}}.yaml',
            parse: data => load(data),
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
