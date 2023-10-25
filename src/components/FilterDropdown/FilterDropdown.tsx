import styles from './FilterDropdown.module.scss';
import { ChangeEvent, FC, useState } from 'react';
import { InputLabel, SelectChangeEvent } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PrimaryButton } from 'components/Button/Button.tsx';
import { StyledFormControl } from './FilterDropDown.styles.ts';
import { Input } from 'components/Input/Input.tsx';
import { MultiSelect } from 'components/MultiSelect/MultiSelect.tsx';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { setCurrentPage, setFilterData } from 'store/slices/charactersSlice.ts';
import { filterComponents } from 'components/FilterComponents/FilterComponents.tsx';
import { ICharactersFilter } from 'types/ICharacters.types.ts';


export const FilterDropdown: FC = () => {

  const [isActiveSelect, setIsActiveSelect] = useState(false);

  const [keywords, setKeywords] = useState<{ [key: string]: string[] }>({});

  const { filterData } = useAppSelector(state => state.characters)

  const methods = useForm<ICharactersFilter>(
    {
      defaultValues: {
        character: {
          name: '',
          status: '',
          species: '',
          gender: '',
          type: '',
          page: 1
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
    }
  )

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<ICharactersFilter> = (filterData) => {
    console.log('submitting data', filterData)
    localStorage.setItem('searchFilter', JSON.stringify(filterData.character))
    dispatch(setFilterData(filterData))
    dispatch(setCurrentPage(1))
    methods.reset();
    setIsActiveSelect(false);
    setKeywords({});
  };

  const setBackground = () => {
    setIsActiveSelect(true);
  };

  const handleSearchForCharacters = (inputValue: string) => {
    dispatch(setFilterData({
      character: { ...filterData.character, name: inputValue },
      episode: filterData.episode,
      location: filterData.location
    }));
    dispatch(setCurrentPage(1))
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

    setKeywords(selectedKeywords);
  };

  const handleButtonClick = (e: ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
