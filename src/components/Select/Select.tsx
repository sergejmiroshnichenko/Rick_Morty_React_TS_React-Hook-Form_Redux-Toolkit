import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { FC } from 'react';

interface SelectFieldProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
}

export const SelectComponent: FC<SelectFieldProps> = ({ name, label, options }) => {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
          >
            {options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  <ListItemText primary={option.label}/>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    />
  );
};