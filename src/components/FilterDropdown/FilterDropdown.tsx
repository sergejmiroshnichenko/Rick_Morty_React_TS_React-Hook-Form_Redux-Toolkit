import { ChangeEvent, FC, useState } from 'react';
import { InputLabel, SelectChangeEvent } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PrimaryButton } from 'components/Button/Button.tsx';
import { StyledFormControl } from './FilterDropDown.styles.ts';
import styles from './FilterDropdown.module.scss';
import { SelectComponent } from 'components/Select/Select.tsx';
import { Input } from 'components/Input/Input.tsx';
import { MultiSelect } from 'components/MultiSelect/MultiSelect.tsx';
import { useAppDispatch } from 'hooks/redux-hooks.ts';
import { fetchFilterCharacters } from 'store/slices/filterCharacterSlice.ts';
import { setSearchCharacters } from 'store/slices/charactersSlice.ts';

interface FormData {
    selectedOptions: string[];

    // [key: string]: string | string[]
    name: string,
    status: string,
    species: string,
    gender: string,
    type: string,
    // dimension: string,
    // nameLocation: string,
    // typeLocation: string,
    // nameEpisode: string,
    // episode: string,
}

export const FilterDropdown: FC = () => {

  const [isActiveSelect, setIsActiveSelect] = useState(false);

  const [keywords, setKeywords] = useState<{ [key: string]: string[] }>({});

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      status: '',
      species: '',
      gender: '',
      type: '',
      // dimension: '',
      // nameLocation: '',
      // typeLocation: '',
      // nameEpisode: '',
      // episode: '',
    },
  })

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    dispatch(fetchFilterCharacters({
      name: data.name,
      gender: data.gender,
      status: data.status,
      type: data.type,
      species: data.species,
    }))
    methods.reset();
    setIsActiveSelect(false);
    setKeywords({});
  };

  const setBackground = () => {
    setIsActiveSelect(true);
  };

  const handleSearchForCharacters = (searchCharacters: string) => {
    dispatch(setSearchCharacters(searchCharacters))
  }

  const handleMainSelectChange = (event: SelectChangeEvent<string[]>) => {

    const selectedKeywords: { [key: string]: string[] } = {};

    if (event.target.value.includes('Character')) {
      selectedKeywords['character'] = ['name', 'status', 'species', 'type', 'gender'];
    }
    // if (event.target.value.includes('Location')) {
    //   selectedKeywords['location'] = ['nameLocation', 'typeLocation', 'dimension'];
    // }
    // if (event.target.value.includes('Episodes')) {
    //   selectedKeywords['episodes'] = ['nameEpisodes', 'episodes'];
    // }
    console.log('selectedKeywords', Object.values(selectedKeywords))
    console.log('keywords', keywords)

    setKeywords(selectedKeywords);

  };

  const getFilterData = () => {
    setIsActiveSelect(!isActiveSelect);
  }

  const handleButtonClick = (e: ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getFilterData();
  }

    type FilterComponents = {
        character: {
            [key: string]: JSX.Element;
        };
        // location: {
        //     [key: string]: JSX.Element;
        // };
        // episodes: {
        //     [key: string]: JSX.Element;
        // };
    };

    const filterComponents: FilterComponents = {
      character: {
        name: (
          <Input label={'Add Name'} name={'name'}/>
        ),
        status: (
          <SelectComponent
            name="status"
            label="Add Status"
            options={[
              { value: 'Alive', label: 'Alive' },
              { value: 'Dead', label: 'Dead' },
              { value: 'Unknown', label: 'Unknown' },
            ]}
          />
        ),
        species: (
          <SelectComponent
            name="species"
            label="Add Species"
            options={[
              { value: 'Human', label: 'Human' },
              { value: 'Humanoid', label: 'Humanoid' },
              { value: 'Alien', label: 'Alien' },
              { value: 'Animal', label: 'Animal' },
              { value: 'Robot', label: 'Robot' },
            ]}
          />
        ),
        gender: (
          <SelectComponent
            name="gender"
            label="Add Gender"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Genderless ', label: 'Genderless ' },
              { value: 'Unknown ', label: 'Unknown ' },
            ]}
          />
        ),
        type: (
          <SelectComponent
            name="type"
            label="Add Type"
            options={[
              { value: 'Pickle', label: 'Pickle' },
              { value: 'Superhuman', label: 'Superhuman' },
              { value: 'Elephant-Person', label: 'Elephant-Person' },
              { value: 'Clone', label: 'Clone' },
              { value: 'Dog', label: 'Dog' },
            ]}
          />
        ),
      },
      // location: {
      //   nameLocation: (
      //     <Input label="Add NameLocation" name={'nameLocation'}/>
      //   ),
      //   typeLocation: (
      //     <Input label="Add TypeLocation" name={'typeLocation'}/>
      //   ),
      //   dimension: (
      //     <Input label="Add Dimension" name={'dimension'}/>
      //   ),
      // },
      // episodes: {
      //   nameEpisodes: (
      //     <Input label="Add NameEpisode" name={'nameEpisode'}/>
      //   ),
      //   episodes: (
      //     <Input label="Add Episode" name={'episode'}/>
      //   ),
      // },
    }

    return (
      <div className={isActiveSelect ? styles.backgroundOverlay : ''}
        onClick={() => setIsActiveSelect(false)}>
        <FormProvider {...methods}>
          <form noValidate onSubmit={methods.handleSubmit(onSubmit)}
            onClick={(e) => e.stopPropagation()}>
            <StyledFormControl>
              <InputLabel>Select Item</InputLabel>
              <MultiSelect name="selectedOptions" shouldCallOnChange onOpen={setBackground}
                handleMainSelectChange={handleMainSelectChange}
              />

              <div style={{ background: 'white', width: 260, borderRadius: '4px' }}>
                {isActiveSelect ? (
                  <>
                    {keywords?.character && keywords.character.map((field, index) => (
                      <div key={index}>{filterComponents.character[field]}</div>
                    ))}
                    {/*{keywords?.location && keywords.location.map((field, index) => (*/}
                    {/*  <div key={index}>{filterComponents.location[field]}</div>*/}
                    {/*))}*/}
                    {/*{keywords?.episodes && keywords.episodes.map((field, index) => (*/}
                    {/*  <div key={index}>{filterComponents.episodes[field]}</div>*/}
                    {/*))}*/}
                  </>
                ) : (
                  <Input label={'Add key words to find'} name={''} isSearchKeyword
                    setSearchKeyword={handleSearchForCharacters}
                  />
                )}
              </div>

              <PrimaryButton onClick={() => handleButtonClick}>FIND</PrimaryButton>
            </StyledFormControl>
          </form>
        </FormProvider>
      </div>
    );
};
