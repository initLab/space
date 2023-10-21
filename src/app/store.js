import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { anonymousApiSlice, authenticatedApiSlice, authenticatedDeviceApiSlice } from '../features/apiSlice';
import { sensorSlice } from '../features/sensorSlice';
import { doorSlice } from '../features/doorSlice.js';

export const store = configureStore({
    reducer: {
        [anonymousApiSlice.reducerPath]: anonymousApiSlice.reducer,
        [authenticatedApiSlice.reducerPath]: authenticatedApiSlice.reducer,
        [authenticatedDeviceApiSlice.reducerPath]: authenticatedDeviceApiSlice.reducer,
        [sensorSlice.name]: sensorSlice.reducer,
        [doorSlice.name]: doorSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(anonymousApiSlice.middleware).concat(authenticatedApiSlice.middleware)
            .concat(authenticatedDeviceApiSlice.middleware),
});

setupListeners(store.dispatch);
