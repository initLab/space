export function getDoorActions(door) {
    const lockStatus = door?.statuses?.lock;
    const validLockStatus = typeof lockStatus === 'string';

    const actions = door.supported_actions;

    if (!validLockStatus) {
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

export function getLightActions(light) {
    const activityStatus = light?.statuses?.active;
    const validActiveStatus = typeof activityStatus === 'boolean';

    const actions = light.supported_actions;

    if (!validActiveStatus) {
        // fallback - return all actions
        return actions;
    }

    return actions.filter(action => action !== (activityStatus ? 'turn_on' : 'turn_off'));
}
