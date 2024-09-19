import { parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { useDateTimeFormatter } from '../../utils/useDateTimeFormatter.js';

const ActionLogEntry = ({
    entry,
}) => {
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
};

ActionLogEntry.propTypes = {
    entry: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        deviceId: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        User: PropTypes.shape({
            name: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }).isRequired,
        Application: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default ActionLogEntry;
