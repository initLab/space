import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {anonymousApiSlice, authenticatedApiSlice} from '../features/apiSlice'
import {authSlice} from '../features/authSlice';
import {formSlice} from '../features/formSlice';
import {sensorSlice} from "../features/sensorSlice";

export const store = configureStore({
    reducer: {
        [anonymousApiSlice.reducerPath]: anonymousApiSlice.reducer,
        [authenticatedApiSlice.reducerPath]: authenticatedApiSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [formSlice.name]: formSlice.reducer,
        [sensorSlice.name]: sensorSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(anonymousApiSlice.middleware).concat(authenticatedApiSlice.middleware),
});

setupListeners(store.dispatch);
