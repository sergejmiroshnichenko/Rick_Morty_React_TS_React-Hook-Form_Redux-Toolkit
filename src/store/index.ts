import { configureStore } from '@reduxjs/toolkit';
import charactersSlice from './slices/charactersSlice.ts';
import characterByIdSlice from './slices/characterByIdSlice.ts';

export const store = configureStore({
  devTools: true,
  reducer: {
    characters: charactersSlice,
    characterDetails: characterByIdSlice,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;