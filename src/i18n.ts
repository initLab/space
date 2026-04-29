import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import resources from 'virtual:i18next-loader';
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        // I hate this, but i18next changed the format
        resources: Object.fromEntries(Object.entries(resources).map(x => [x[0], ({translation: x[1]})])),
        detection: {
            supportedLanguages: ["en", "bg"],
        },
        react: {
            wait: true,
            useSuspense: true,
        }
    }, (err, t) => {
        if(err) console.error(err);
    })
    .then();

i18next.on("failedLoading", (lng, ns, msg) => console.error(msg));

export default i18next;
