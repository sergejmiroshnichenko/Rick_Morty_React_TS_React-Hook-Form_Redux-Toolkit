import {
  ICharacter,
  ICharactersFilter,
  IEpisode,
  IGetCharactersRequest,
  IGetEpisodesRequest,
  IGetFilterCharacterRequest,
  IGetLocationsRequest,
  ILocation
} from 'types/ICharacters.types.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { delay } from 'services/delay.ts';
import { BASE_URL } from 'services/constants.ts';


interface CharactersState {
    characters: ICharacter[] | null;
    locations: ILocation[],
    episodes: IEpisode[],
    isLoading: 'loading' | 'resolved' | 'rejected' | null;
    error: string;
    searchCharacters: string;
    page: number;
    pageQuantity: number;
}

const initialState: CharactersState = {
  characters: null,
  locations: [],
  episodes: [],
  isLoading: null,
  error: '',
  searchCharacters: '',
  page: 1,
  pageQuantity: 0,
}

export const fetchAllCharacters = createAsyncThunk<IGetFilterCharacterRequest,
    Partial<ICharactersFilter> | undefined, { rejectValue: string }>(
      'characters/fetchCharacters',
      async (params, { rejectWithValue }) => {
        try {
          await delay(200);
          const [characterResponse, locationResponse, episodeResponse] = await Promise.all([
            axios.get<IGetCharactersRequest>(`${BASE_URL}/character`, { params: { ...params?.character } }),
            axios.get<IGetLocationsRequest>(`${BASE_URL}/location`, { params: { ...params?.location } }),
            axios.get<IGetEpisodesRequest>(`${BASE_URL}/episode`, { params: { ...params?.episode } })
          ])

          console.log('response >>>>>', characterResponse.data);

          if (characterResponse.status !== 200 && locationResponse.status !== 200 && episodeResponse.status !== 200) {
            return rejectWithValue('Server error');
          }
          return {
            characters: characterResponse.data,
            location: locationResponse.data,
            episode: episodeResponse.data
          };
        } catch (error) {
          return rejectWithValue('Error');
        }
      }
    );

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<IGetCharactersRequest>) => {
      state.characters = action.payload.results;
    },
    setSearchCharacters: (state, action: PayloadAction<string>) => {
      state.searchCharacters = action.payload;
      state.page = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageQuantity: (state, action: PayloadAction<number>) => {
      state.pageQuantity = action.payload;
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
        state.characters = action.payload.characters.results;
        state.episodes = action.payload.episode.results;
        state.locations = action.payload.location.results;
        state.pageQuantity = action.payload.characters.info.pages;
      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.isLoading = 'rejected';
        state.error = action.payload ?? '';
      })
  }
})

export const { setCurrentPage, setCharacters, setSearchCharacters, setPageQuantity } = charactersSlice.actions;
export default charactersSlice.reducer;
