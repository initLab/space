import {createSlice} from '@reduxjs/toolkit'

export const formSlice = createSlice({
    name: 'form',
    initialState: {},
    reducers: {
        setForm: (state, {
            payload: {
                formName,
                values,
            }
        }) => {
            state[formName] = values;
        },
    },
});

export const formSelector = formName => state => state[formSlice.name][formName];
export const { setForm } = formSlice.actions;
