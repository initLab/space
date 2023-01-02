import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {anonymousApiSlice, authenticatedApiSlice} from '../features/apiSlice'
import {sensorSlice} from '../features/sensorSlice';
import {doorSlice} from '../features/doorSlice.js';

export const store = configureStore({
    reducer: {
        [anonymousApiSlice.reducerPath]: anonymousApiSlice.reducer,
        [authenticatedApiSlice.reducerPath]: authenticatedApiSlice.reducer,
        [sensorSlice.name]: sensorSlice.reducer,
        [doorSlice.name]: doorSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(anonymousApiSlice.middleware).concat(authenticatedApiSlice.middleware),
});

setupListeners(store.dispatch);
