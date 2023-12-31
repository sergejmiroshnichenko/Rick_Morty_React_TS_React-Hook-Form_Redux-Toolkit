import { ICharacter } from 'types/ICharacters.types.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { delay } from 'services/delay.ts';
import { BASE_URL } from 'services/constants.ts';


interface CharacterByIdState {
    characterDetails: ICharacter | null;
    isLoading: 'loading' | 'resolved' | 'rejected' | null;
    error: string;
}

const initialState: CharacterByIdState = {
  characterDetails: null,
  isLoading: null,
  error: '',
}

export const fetchCharacterById = createAsyncThunk<ICharacter, number, { rejectValue: string }>(
  'character/fetchCharacterById',
  async (characterId, { rejectWithValue }) => {
    try {
      await delay(200)
      const response = await axios.get<ICharacter>(`${BASE_URL}/character/${characterId}`);

      if (response.status !== 200) {
        return rejectWithValue('Server error');
      }

      return response.data;

    } catch (error) {
      return rejectWithValue('Error');
    }
  }
)


const characterByIdSlice = createSlice({
  name: 'characterById',
  initialState,
  reducers: {
    characterByIdClear: (state) => {
      state.characterDetails = null
      state.isLoading = null
      state.error = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCharacterById.pending, (state) => {
        state.isLoading = 'loading';
        state.error = ''
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.isLoading = 'resolved';
        state.characterDetails = action.payload
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.isLoading = 'rejected';
        state.error = action.payload ?? '';
      })
  }
})

export const { characterByIdClear } = characterByIdSlice.actions
export default characterByIdSlice.reducer;
