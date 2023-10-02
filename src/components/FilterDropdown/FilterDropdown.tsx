import { ChangeEvent, FC, useState } from 'react';
import { InputLabel, SelectChangeEvent } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PrimaryButton } from 'components/Button/Button.tsx';
import { StyledFormControl } from './FilterDropDown.styles.ts';
import styles from './FilterDropdown.module.scss';
import { Input } from 'components/Input/Input.tsx';
import { MultiSelect } from 'components/MultiSelect/MultiSelect.tsx';
import { useAppDispatch } from 'hooks/redux-hooks.ts';
import { fetchAllCharacters, setSearchCharacters } from 'store/slices/charactersSlice.ts';
import { filterComponents } from 'components/FilterComponents/FilterComponents.tsx';

interface FormData {
    selectedOptions: string[];
    // [key: string]: string | string[]
    character: {
        name: string,
        status: string,
        species: string,
        gender: string,
        type: string,
    },
    location: {
        dimension: string,
        name: string,
        type: string,
    },
    episode: {
        name: string,
        episode: string,
    }
}

export const FilterDropdown: FC = () => {

  const [isActiveSelect, setIsActiveSelect] = useState(false);

  const [keywords, setKeywords] = useState<{ [key: string]: string[] }>({});

  const methods = useForm<FormData>({
    defaultValues: {
      character: {
        name: '',
        status: '',
        species: '',
        gender: '',
        type: '',
      },
      location: {
        dimension: '',
        name: '',
        type: '',
      },
      episode: {
        name: '',
        episode: '',
      }
    },
  })

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FormData> = (filterData) => {
    console.log(filterData);
    dispatch(fetchAllCharacters(filterData))
    methods.reset();
    setIsActiveSelect(false);
    setKeywords({});
  };

  // const characterW = useWatch({ name: 'character', control: methods.control });
  // console.log(characterW)

  const setBackground = () => {
    setIsActiveSelect(true);
  };

  const handleSearchForCharacters = (inputValue: string) => {
    dispatch(setSearchCharacters(inputValue));
  }

  const addToMultiSelectFilter = (event: SelectChangeEvent<string[]>) => {

    const selectedKeywords: { [key: string]: string[] } = {};

    if (event.target.value.includes('Character')) {
      selectedKeywords['character'] = [
        'name', 'status', 'species', 'type', 'gender'
      ];
    }
    if (event.target.value.includes('Location')) {
      selectedKeywords['location'] = ['name', 'type', 'dimension'];
    }
    if (event.target.value.includes('Episodes')) {
      selectedKeywords['episodes'] = ['name', 'episodes'];
    }
    console.log('selectedKeywords', Object.values(selectedKeywords))
    console.log('keywords', keywords)

    setKeywords(selectedKeywords);
  };

  const handleButtonClick = (e: ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // setIsActiveSelect(!isActiveSelect)
  }

  return (
    <div className={isActiveSelect ? styles.backgroundOverlay : ''}
      onClick={() => setIsActiveSelect(false)}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={methods.handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}>
          <StyledFormControl>
            <InputLabel>Select Item</InputLabel>
            <MultiSelect name="selectedOptions" onOpen={setBackground}
              onChangeMultiSelect={addToMultiSelectFilter}
            />

            <div className={styles.filterOptionsWrapper}>
              {isActiveSelect ? (
                <>
                  {keywords?.character?.map((field, index) => (
                    <div key={index}>{filterComponents.character[field]}</div>
                  ))}
                  {keywords?.location?.map((field, index) => (
                    <div key={index}>{filterComponents.location[field]}</div>
                  ))}
                  {keywords?.episodes?.map((field, index) => (
                    <div key={index}>{filterComponents.episodes[field]}</div>
                  ))}
                </>
              ) : (
                <Input label={'Add key words to find'} name={'character.name'}
                  setSearchKeyword={handleSearchForCharacters}
                />
              )}
            </div>

            <PrimaryButton color="inherit" onClick={() => handleButtonClick}>FIND</PrimaryButton>
          </StyledFormControl>
        </form>
      </FormProvider>
    </div>
  );
};
