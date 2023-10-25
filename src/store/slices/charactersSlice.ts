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
    characters: ICharacter[];
    locations: ILocation[],
    episodes: IEpisode[],
    isLoading: 'loading' | 'resolved' | 'rejected' | null;
    error: string;
    page: number;
    pageQuantity: number;
    filteredCharacters: ICharacter[]
    filterData: ICharactersFilter
}

const initialState: CharactersState = {
  characters: [],
  locations: [],
  episodes: [],
  isLoading: null,
  error: '',
  page: 1,
  pageQuantity: 0,
  filteredCharacters: [],
  filterData: {
    character: {
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      page: 1,
    },
    location: {
      name: '',
      type: '',
      dimension: '',
    },
    episode: {
      name: '',
      episode: '',
    },
  }
}

const getIdFromUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
}
export const fetchAllCharacters = createAsyncThunk<IGetFilterCharacterRequest,
    Partial<ICharactersFilter> | undefined, {
    rejectValue: string
}>(
  'characters/fetchCharacters',
  async (params, { rejectWithValue }) => {
    try {
      await delay(200);
      const [characterResponse, locationResponse, episodeResponse] = await Promise.all([
        axios.get<IGetCharactersRequest>(`${BASE_URL}/character`, { params: { ...params?.character } }),
        axios.get<IGetLocationsRequest>(`${BASE_URL}/location`, { params: { ...params?.location } }),
        axios.get<IGetEpisodesRequest>(`${BASE_URL}/episode`, { params: { ...params?.episode } })
      ])
      
      if (characterResponse.status !== 200 &&
                locationResponse.status !== 200 &&
                episodeResponse.status !== 200) {
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
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageQuantity: (state, action: PayloadAction<number>) => {
      state.pageQuantity = action.payload;
    },
    // setFilteredCharacters: (state) => {
    //   state.filteredCharacters = state.characters
    //     ? state.characters.filter(character => {
    //       const locationId = getIdFromUrl(character.location.url);
    //       return state.locations.some(location => locationId === String(location.id));
    //     })
    //     : null;
    // },
    setFilteredCharacters: (state, action: PayloadAction<ICharacter[]>) => {
      state.filteredCharacters = action.payload
    },
    setFilterData: (state, action: PayloadAction<ICharactersFilter>) => {
      state.filterData = action.payload
    }
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

        // filter name location

        const filterData = state.characters.filter(character => {
          const characterLocationId = getIdFromUrl(character.location.url)
          return state.locations.some(location => characterLocationId === String(location.id));
        })
        console.log('filterData', filterData)

      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.isLoading = 'rejected';
        state.error = action.payload ?? '';
      })
  }
})

export const {
  setCurrentPage,
  setFilteredCharacters,
  setFilterData
} = charactersSlice.actions;

export default charactersSlice.reducer;


