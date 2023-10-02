import { FilterComponentsProps } from './FilterComponents.types.ts';
import { Input } from 'components/Input/Input.tsx';
import { SelectComponent } from 'components/Select/Select.tsx';
import { genderOptions, statusOptions } from './FilterComponents.data.ts';

export const filterComponents: FilterComponentsProps = {
  character: {
    name: (
      <Input label={'Add Name'} name={'character.name'}/>
    ),
    status: (
      <SelectComponent
        name="character.status"
        label="Add Status"
        options={statusOptions}
      />
    ),
    species: (
      <Input label={'Add Species'} name={'character.species'}/>
    ),
    gender: (
      <SelectComponent
        name="character.gender"
        label="Add Gender"
        options={genderOptions}
      />
    ),
    type: (
      <Input label={'Add Type'} name={'character.type'}/>
    ),
  },
  location: {
    name: (
      <Input label="Add NameLocation" name={'location.name'}/>
    ),
    type: (
      <Input label="Add TypeLocation" name={'location.type'}/>
    ),
    dimension: (
      <Input label="Add Dimension" name={'location.dimension'}/>
    ),
  },
  episodes: {
    name: (
      <Input label="Add NameEpisode" name={'episode.name'}/>
    ),
    episodes: (
      <Input label="Add Episode" name={'episode.episode'}/>
    ),
  },
}