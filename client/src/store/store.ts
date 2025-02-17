import { configureStore } from '@reduxjs/toolkit';
import synthReducer from './synthSlice';

export const store = configureStore({
  reducer: {
    synth: synthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
