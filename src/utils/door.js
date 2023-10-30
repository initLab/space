export function getDoorActions(door) {
    const lockStatus = door?.statuses?.lock;
    const isMonitored = typeof lockStatus === 'string';

    const actions = door.supported_actions;

    if (!isMonitored) {
        return actions;
    }

    if (lockStatus === 'unlocked') {
        return actions.filter(action => action !== 'unlock');
    }

    if (lockStatus === 'locked') {
        return actions.filter(action => !['open', 'lock'].includes(action));
    }

    if (['locking', 'unlocking', 'busy'].includes(lockStatus)) {
        // this shows a loading icon
        return [];
    }

    // fallback - return all actions
    return actions;
}
