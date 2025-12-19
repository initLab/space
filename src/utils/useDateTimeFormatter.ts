import {useTranslation} from 'react-i18next';
import {format, formatDistanceToNow, isValid} from 'date-fns';
import {bg, enUS} from 'date-fns/locale';

export function useDateTimeFormatter() {
    const {i18n} = useTranslation();
    const lang = i18n.resolvedLanguage;

    return {
        formatDefault: (dateTime: Date) => isValid(dateTime) ? format(dateTime, 'dd.MM.yyyy HH:mm:ss') : '',
        formatDistanceToNow: (dateTime: Date) => isValid(dateTime) ? formatDistanceToNow(dateTime, {
            addSuffix: true,
            locale: lang === 'en' ? enUS : bg,
        }) : '',
    };
}
