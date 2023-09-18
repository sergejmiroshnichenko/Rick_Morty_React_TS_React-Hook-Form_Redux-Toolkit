import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { TextField } from '@mui/material';

interface IInputProps {
    name: string;
    label: string;
}

export const Input: FC<IInputProps> = ({ name, label, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          onChange={(e) => field.onChange(e.target.value)}
          label={label}
          variant="outlined"
          fullWidth
          size="medium"
          type="text"
        />
      )}
    />
  );
};