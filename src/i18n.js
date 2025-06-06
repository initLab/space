import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { load } from 'js-yaml';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'bg',
        backend: {
            loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}.yaml`,
            parse: data => load(data),
        },
        interpolation: {
            escapeValue: false,
        },
    })
    .then();

export default i18n;
