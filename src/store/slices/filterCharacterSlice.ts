import { IAllCharacters } from 'types/ICharacters.types.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { delay } from 'services/delay.ts';
import { BASE_URL } from 'services/constants.ts';


interface FilterCharactersState {
    data: IAllCharacters | null;
    currentPage: number;
    isLoading: 'loading' | 'resolved' | 'rejected' | null;
    error: string;
}

const initialState: FilterCharactersState = {
  data: null,
  currentPage: 1,
  isLoading: null,
  error: '',
}

export const fetchFilterCharacters = createAsyncThunk<IAllCharacters, { [key: string]: string }, {
    rejectValue: string
}>(
  'characters/fetchCharacters',
  async ({ name, gender, status, type, species }, { rejectWithValue }) => {
    try {
      await delay(300)
      const response = await axios
        .get<IAllCharacters>(`${BASE_URL}/character/?page=3&name=${name}&status=${status}&gender=${gender}&type=${type}&species=${species}`);
      console.log('response', response.data)
      if (response.status !== 200) {
        return rejectWithValue('Server error');
      }

      return response.data;

    } catch (error) {
      return rejectWithValue('Error');
    }
  }
)

const filterCharacterSlice = createSlice({
  name: 'filterCharacter',
  initialState,
  reducers: {
    setFilteredCharacterData: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilterCharacters.pending, (state) => {
        state.isLoading = 'loading';
        state.error = ''
      })
      .addCase(fetchFilterCharacters.fulfilled, (state, action) => {
        state.isLoading = 'resolved';
        state.data = action.payload;
        state.currentPage = 1;
      })
      .addCase(fetchFilterCharacters.rejected, (state, action) => {
        state.isLoading = 'rejected';
        state.error = action.payload ?? '';
      })
  }
})


export const { setFilteredCharacterData } = filterCharacterSlice.actions;
export default filterCharacterSlice.reducer;
