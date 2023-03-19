import {createSlice} from '@reduxjs/toolkit';

export const doorSlice = createSlice({
    name: 'door',
    initialState: {
        locked: null,
        unlocked: null,
    },
    reducers: {
        setState: (state, {
            payload: {
                property,
                value,
            },
        }) => {
            state[property] = value;
        },
    },
});

export const doorStateSelector = property => state => state[doorSlice.name]?.[property];

export const doorLockStatusSelector = () => state => {
    const doorState = state[doorSlice.name];
    const locked = doorState.locked;
    const unlocked = doorState.unlocked;

    if (locked === null || unlocked === null) {
        return 'uninitialized';
    }

    if (locked && unlocked === false) {
        return 'locked';
    }

    if (locked === false && unlocked) {
        return 'unlocked';
    }

    if (locked === false && unlocked === false) {
        return 'busy';
    }

    if (locked && unlocked) {
        return 'invalid';
    }
};

export const {setState} = doorSlice.actions;
