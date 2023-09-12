import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormData } from 'types/IFormData.types.ts';
import { PrimaryButton } from 'components/Button/Button.tsx';
import { useState } from 'react';

const StyledFormControl = styled(FormControl)({
  backgroundColor: '#F5F5F5',
  borderRadius: '4px 4px 0 0',
  flexDirection: 'row',
  background: 'transparent',
  marginLeft: '155px',
  gap: 25,
  label: {
    letterSpacing: 0.5,
    color: '#272B33',
  },
  '.css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
    background: '#F5F5F5',
    width: '260px',

    '&:hover': {
      backgroundColor: '#e7e1e1',
    },

    '&:first-of-type': {
      width: '213px'
    },
  },
})

export const FilterDropdown = () => {
  const { handleSubmit, control } = useForm<FormData>();

  const [keywords, setKeywords] = useState<string[]>([]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const getFilterData = () => {
    console.log('click')
  }

  const handleMainSelectChange = (event: SelectChangeEvent<string[]>) => {

    const selectedKeywords = [];
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

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <StyledFormControl>
        <InputLabel>Select Item</InputLabel>
        <Controller
          name="selectedOptions"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Select
              multiple
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleMainSelectChange(e);
              }}
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Character">
                <ListItemText primary="Character"/>
                <Checkbox checked={field.value.includes('Character')}/>
              </MenuItem>
              <MenuItem value="Location">
                <ListItemText primary="Location"/>
                <Checkbox checked={field.value.includes('Location')}/>
              </MenuItem>
              <MenuItem value="Episodes">
                <ListItemText primary="Episodes"/>
                <Checkbox checked={field.value.includes('Episodes')}/>
              </MenuItem>
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
  );
};