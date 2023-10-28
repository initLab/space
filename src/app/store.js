import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    anonymousApiSlice,
    anonymousMqttApiSlice,
    authenticatedApiSlice,
    authenticatedDeviceApiSlice
} from '../features/apiSlice';
import { doorSlice } from '../features/doorSlice.js';

export const store = configureStore({
    reducer: {
        [anonymousApiSlice.reducerPath]: anonymousApiSlice.reducer,
        [anonymousMqttApiSlice.reducerPath]: anonymousMqttApiSlice.reducer,
        [authenticatedApiSlice.reducerPath]: authenticatedApiSlice.reducer,
        [authenticatedDeviceApiSlice.reducerPath]: authenticatedDeviceApiSlice.reducer,
        [doorSlice.name]: doorSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(anonymousApiSlice.middleware).concat(anonymousMqttApiSlice.middleware)
            .concat(authenticatedApiSlice.middleware).concat(authenticatedDeviceApiSlice.middleware),
});

setupListeners(store.dispatch);
