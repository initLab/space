import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    anonymousApiSlice,
    anonymousMqttApiSlice,
    authenticatedApiSlice,
    authenticatedDeviceApiSlice
} from '../features/apiSlice';

export const store = configureStore({
    reducer: {
        [anonymousApiSlice.reducerPath]: anonymousApiSlice.reducer,
        [anonymousMqttApiSlice.reducerPath]: anonymousMqttApiSlice.reducer,
        [authenticatedApiSlice.reducerPath]: authenticatedApiSlice.reducer,
        [authenticatedDeviceApiSlice.reducerPath]: authenticatedDeviceApiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(anonymousApiSlice.middleware).concat(anonymousMqttApiSlice.middleware)
            .concat(authenticatedApiSlice.middleware).concat(authenticatedDeviceApiSlice.middleware),
});

setupListeners(store.dispatch);
