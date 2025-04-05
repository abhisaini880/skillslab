import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import problemsReducer from './slices/problemsSlice';
import submissionsReducer from './slices/submissionsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        problems: problemsReducer,
        submissions: submissionsReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;