import { useState } from 'react';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PrimaryButton } from 'components/Button/Button.tsx';
import { StyledFormControl } from './FilterDropDown.styles.ts';
import { FilterOptionsData } from './FilterDropDown.data.ts';
import styles from './FilterDropdown.module.scss';

export interface FormData {
    selectedOptions: string[];
}

export const FilterDropdown = () => {
  const { handleSubmit, control } = useForm<FormData>();

  const [keywords, setKeywords] = useState<string[]>([]);

  const [isActiveSelect, setIsActiveSelect] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const setBackground = () => {
    console.log('open');
    setIsActiveSelect(true);
  };

  const handleMainSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedKeywords: string[] = [];
    if (event.target.value.includes('Character')) {
      selectedKeywords.push('Add Name', 'Add Status', 'Add Species', 'Add Type', 'Add Gender');
    }
    if (event.target.value.includes('Location')) {
      selectedKeywords.push('Add Name', 'Add Type', 'Add Dimension');
    }
    if (event.target.value.includes('Episodes')) {
      selectedKeywords.push('Add Name', 'Add Episodes');
    }
    setKeywords(selectedKeywords);
  };

  const getFilterData = () => {
    setIsActiveSelect(!isActiveSelect)
  }

  return (
    <div className={isActiveSelect ? styles.backgroundOverlay : ''}
      onClick={() => setIsActiveSelect(false)}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}>
        <StyledFormControl>
          <InputLabel>Select Item</InputLabel>
          <Controller
            name="selectedOptions"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                onOpen={setBackground}
                multiple
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleMainSelectChange(e);
                }}
                renderValue={(selected) => selected.join(', ')}
              >
                {FilterOptionsData.map(filterOption => (
                  <MenuItem value={filterOption.optionValue} key={filterOption.optionValue}>
                    <ListItemText primary={filterOption.optionValue}/>
                    <Checkbox checked={field.value.includes(filterOption.optionValue)}/>
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormControl>
            <InputLabel>Add key words to find</InputLabel>
            <Select
              multiple
              value={keywords}
              onChange={(e) => setKeywords(e.target.value as string[])}
              renderValue={(selected) => selected.join(', ')}
            >
              {keywords.map((keyword) => (
                <MenuItem key={keyword} value={keyword}>
                  <ListItemText primary={keyword}/>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <PrimaryButton onClick={getFilterData}>FIND</PrimaryButton>
        </StyledFormControl>
      </form>
    </div>
  );
};
