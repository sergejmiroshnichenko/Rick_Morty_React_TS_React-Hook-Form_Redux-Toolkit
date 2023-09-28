import { Checkbox, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { filterOptionsData } from './MultiSelect.data.ts';


interface MultiSelectProps {
    name: string;
    onOpen: () => void;
    onChangeMultiSelect?: (e: SelectChangeEvent<string[]>) => void;
}

export const MultiSelect: FC<MultiSelectProps> = ({ onOpen, name, onChangeMultiSelect }) => {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <Select
          onOpen={onOpen}
          id="multiSelect"
          multiple
          {...field}
          onChange={(e) => {
            field.onChange(e);
            if (onChangeMultiSelect) {
              onChangeMultiSelect(e);
            }
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {filterOptionsData.map(({ optionValue }) => (
            <MenuItem value={optionValue} key={optionValue}>
              <ListItemText primary={optionValue}/>
              <Checkbox checked={field.value.includes(optionValue)}/>
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};
