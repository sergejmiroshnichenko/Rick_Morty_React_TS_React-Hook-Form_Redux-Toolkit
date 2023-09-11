import { IAllCharacters } from 'types/ICharacters.types.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { delay } from 'services/delay.ts';


interface CharactersState {
    data: IAllCharacters | null;
    currentPage: number;
    isLoading: 'loading' | 'resolved' | 'rejected' | null;
    error: string;
}

const initialState: CharactersState = {
  data: null,
  currentPage: 1,
  isLoading: null,
  error: '',
}

export const fetchAllCharacters = createAsyncThunk<IAllCharacters, undefined, { rejectValue: string }>(
  'characters/fetchCharacters',
  async (_, { rejectWithValue }) => {
    try {
      await delay(200)
      const response = await axios.get<IAllCharacters>('https://rickandmortyapi.com/api/character');

      if (response.status !== 200) {
        return rejectWithValue('Server error');
      }

      return response.data;

    } catch (error) {
      return rejectWithValue('Error');
    }
  }
)

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<IAllCharacters>) => {
      state.data = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllCharacters.pending, (state) => {
        state.isLoading = 'loading';
        state.error = ''
      })
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        state.isLoading = 'resolved';
        state.data = action.payload;
      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.isLoading = 'rejected';
        state.error = action.payload ?? '';
      })
  }
})

export const { setCurrentPage, setCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
