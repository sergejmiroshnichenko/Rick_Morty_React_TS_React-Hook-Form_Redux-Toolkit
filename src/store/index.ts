import { configureStore } from '@reduxjs/toolkit';
import charactersSlice from './slices/charactersSlice.ts';

export const store = configureStore({
  devTools: true,
  reducer: {
    characters: charactersSlice,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;