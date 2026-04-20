import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';
import {load} from 'js-yaml';

import resources from 'virtual:i18next-loader';

i18n
    .use(initReactI18next)
    .on('failedLoading', (lng, ns, msg) => console.error(msg))
    .init({
        interpolation: {
            escapeValue: false,
        },
        // I hate this, but i18next changed the format
        resources: Object.fromEntries(Object.entries(resources).map(x => [x[0], ({translation: x[1]})])),
        detection: {
            supportedLanguages: ["en", "bg"],
        },
    })
    .then();

export default i18n;
