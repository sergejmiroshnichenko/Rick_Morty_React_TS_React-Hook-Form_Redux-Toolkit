import { Controller, useFormContext } from 'react-hook-form';
import { FC, useCallback } from 'react';
import { debounce, TextField } from '@mui/material';

interface IInputProps {
    name: string;
    label: string;
    setSearchKeyword?: (value: string) => void;
}

export const Input: FC<IInputProps> = ({ name, label, setSearchKeyword, ...props }) => {
  const { control } = useFormContext();

  const handleInputChange = useCallback(
    debounce((value: string) => {
      if (setSearchKeyword) {
        setSearchKeyword(value);
      }
    }, 300),
    [setSearchKeyword]
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...props}
          onChange={(e) => {
            field.onChange(e.target.value);
            handleInputChange(e.target.value)
          }}
          label={label}
          variant="outlined"
          fullWidth
          size="medium"
          type="text"
          value={field.value}
        />
      )}
    />
  );
};