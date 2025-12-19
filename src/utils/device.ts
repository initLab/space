import type { PortierDevice } from "../portier-types";

export function getDoorActions(door: PortierDevice) {
    const lockStatus = door?.statuses?.lock;

    const actions = door.supported_actions;

    if (typeof lockStatus !== 'string') return actions;

    if (lockStatus === 'unlocked') return actions.filter(action => action !== 'unlock');

    if (lockStatus === 'locked') return actions.filter(action => !['open', 'lock'].includes(action));

    // this shows a loading icon
    if (['locking', 'unlocking', 'busy'].includes(lockStatus)) return [];

// fallback - return all actions
    return actions;
}

export function getLightActions(light: PortierDevice) {
    const activityStatus = light?.statuses?.active;

    const actions = light.supported_actions;

    // fallback - return all actions
    if (typeof activityStatus !== 'boolean') return actions;

    return actions.filter(action => action !== (activityStatus ? 'turn_on' : 'turn_off'));
}

export function getHvacActions(device: PortierDevice) {
    if (device.type === 'fan') {
        return getLightActions(device);
    }

    return device.supported_actions;
}
