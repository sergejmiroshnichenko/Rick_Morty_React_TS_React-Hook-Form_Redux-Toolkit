import { configureStore } from '@reduxjs/toolkit';
import charactersSlice from './slices/charactersSlice.ts';
import characterByIdSlice from './slices/characterByIdSlice.ts';
import filterCharacterSlice from './slices/filterCharacterSlice.ts'

export const store = configureStore({
  devTools: true,
  reducer: {
    characters: charactersSlice,
    characterDetails: characterByIdSlice,
    filterCharacters: filterCharacterSlice,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;