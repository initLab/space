import { parseISO } from 'date-fns';
import { useDateTimeFormatter } from '../../utils/useDateTimeFormatter.js';

export default function ActionLogEntry({
    entry,
}) {
    const {
        formatDefault,
        formatDistanceToNow,
    } = useDateTimeFormatter();

    const dateTime = parseISO(entry.createdAt);

    return (<tr>
        <td>{formatDefault(dateTime)} ({formatDistanceToNow(dateTime)})</td>
        <td>{entry.deviceId}</td>
        <td>{entry.action}</td>
        <td>{entry.User.name} ({entry.User.username})</td>
        <td>{entry.Application.name}</td>
    </tr>);
}
