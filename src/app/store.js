import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    authenticatedDeviceApiSlice
} from '../features/apiSlice';

export const store = configureStore({
    reducer: {
        [authenticatedDeviceApiSlice.reducerPath]: authenticatedDeviceApiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authenticatedDeviceApiSlice.middleware),
});

setupListeners(store.dispatch);
