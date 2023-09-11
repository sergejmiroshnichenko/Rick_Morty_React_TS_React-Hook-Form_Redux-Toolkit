import axios from 'axios';
import { IAllCharacters } from 'types/ICharacters.types.ts';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacters = async () => {
  const { data } = await instance.get<IAllCharacters>('/character');
  return data;
}

// export const getCharacterDetails = async id => {
//     const { data } = await instance.get(`/character/${id}`);
//     return data;
// }