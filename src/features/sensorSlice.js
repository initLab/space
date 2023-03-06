import { createSlice } from '@reduxjs/toolkit';

export const sensorSlice = createSlice({
    name: 'sensor',
    initialState: {},
    reducers: {
        setSensor: (state, {
            payload: {
                topic,
                data,
                message,
            }
        }) => {
            state[topic] = {
                data,
                message,
            };
        },
    },
});

export const sensorSelector = topic => state => state[sensorSlice.name][topic];
export const {setSensor} = sensorSlice.actions;
