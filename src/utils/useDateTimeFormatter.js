import { useTranslation } from 'react-i18next';
import { format, formatDistanceToNow } from 'date-fns';
import * as locales from 'date-fns/locale';

export function useDateTimeFormatter() {
    const { i18n } = useTranslation();
    const lang = i18n.resolvedLanguage;
    const locale = lang === 'en' ? 'en-US' : lang;

    return {
        formatDefault: dateTime => format(dateTime, 'dd.MM.yyyy HH:mm:ss'),
        formatDistanceToNow: dateTime => formatDistanceToNow(dateTime, {
            addSuffix: true,
            locale: locales[locale],
        }),
    };
}
