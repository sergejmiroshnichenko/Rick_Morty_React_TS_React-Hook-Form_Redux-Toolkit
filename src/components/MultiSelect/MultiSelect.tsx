import { Checkbox, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';


const filterOptionsData = [
  { optionValue: 'Character' },
  { optionValue: 'Location' },
  { optionValue: 'Episodes' },
]

interface MultiSelectProps {
    name: string;
    onOpen: () => void;
    shouldCallOnChange: boolean;
    handleMainSelectChange?: (e: SelectChangeEvent<string[]>) => void;
}

export const MultiSelect: FC<MultiSelectProps> = ({
  onOpen,
  name,
  handleMainSelectChange,
  shouldCallOnChange,
}) => {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <Select
          onOpen={onOpen}
          id="mySelect"
          multiple
          {...field}
          onChange={(e) => {
            field.onChange(e);
            if (shouldCallOnChange && handleMainSelectChange) {
              handleMainSelectChange(e);
            }
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {filterOptionsData.map(filterOption => (
            <MenuItem value={filterOption.optionValue} key={filterOption.optionValue}>
              <ListItemText primary={filterOption.optionValue}/>
              <Checkbox checked={field.value.includes(filterOption.optionValue)}/>
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};
