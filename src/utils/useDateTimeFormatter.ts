import {useTranslation} from 'react-i18next';
import {format, isValid, formatDistanceToNow} from 'date-fns';
import {bg, enUS} from 'date-fns/locale';

export function useDateTimeFormatter() {
    const {i18n} = useTranslation();
    const lang = i18n.resolvedLanguage;

    const formatDefault =
        (dateTime: Date) => isValid(dateTime) ? format(dateTime, 'dd.MM.yyyy HH:mm:ss') : '';
    const distance = (dateTime: Date) => isValid(dateTime) ? formatDistanceToNow(dateTime, {
        addSuffix: true,
        locale: lang === 'en' ? enUS : bg,
    }) : '';

    const formatTimestampDate = (ts: Date) => `${formatDefault(ts)} (${formatDistanceToNow(ts)})`;
    const formatTimestamp = (ts: number) => formatTimestampDate(new Date(ts));


    return {
        formatDefault,
        formatDistanceToNow: distance,
        formatTimestampDate,
        formatTimestamp

    };
}
