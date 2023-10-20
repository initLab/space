import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import * as locales from 'date-fns/locale';

export default function ActionLogEntry({
    entry,
}) {
    const dateTime = parseISO(entry.createdAt);
    const { i18n } = useTranslation();
    const lang = i18n.resolvedLanguage;
    const locale = lang === 'en' ? 'en-US' : lang;

    return (<tr>
        <td>{format(dateTime, 'dd.MM.yyyy HH:mm:ss')} ({formatDistanceToNow(dateTime, {
            addSuffix: true,
            locale: locales[locale],
        })})</td>
        <td>{entry.deviceId}</td>
        <td>{entry.action}</td>
        <td>{entry.User.name} ({entry.User.username})</td>
        <td>{entry.Application.name}</td>
    </tr>);
}
