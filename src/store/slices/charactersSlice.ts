import { IAllCharacters, ICharacter } from 'types/ICharacters.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { delay } from 'services/delay.ts';


interface CharactersState {
    characters: ICharacter[];
    isLoading: 'loading' | 'resolved' | 'rejected' | null;
    error: string;
}

const initialState: CharactersState = {
  characters: [],
  isLoading: null,
  error: '',
}

export const fetchAllCharacters = createAsyncThunk<ICharacter[], undefined, { rejectValue: string }>(
  'characters/fetchCharacters',
  async (_, { rejectWithValue }) => {
    try {
      await delay(200)
      const response = await axios.get<IAllCharacters>('https://rickandmortyapi.com/api/character');

      if (response.status !== 200) {
        return rejectWithValue('Server error');
      }
      console.log('response', response.data.results)
      return response.data.results;
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
)

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllCharacters.pending, (state) => {
        state.isLoading = 'loading';
        state.error = ''
      })
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        state.isLoading = 'resolved';
        state.characters = action.payload
      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.isLoading = 'rejected';
        state.error = action.payload ?? '';
      })
  }
})

export default charactersSlice.reducer;
