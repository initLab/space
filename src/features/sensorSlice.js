import { createSlice } from '@reduxjs/toolkit';

export const sensorSlice = createSlice({
    name: 'sensor',
    initialState: {},
    reducers: {
        setSensor: (state, {
            payload: {
                topic,
                timestamp,
                value,
                message,
            }
        }) => {
            state[topic] = {
                timestamp,
                value,
                message,
            };
        },
    },
});

export const sensorSelector = topic => state => state[sensorSlice.name][topic];
export const {setSensor} = sensorSlice.actions;
