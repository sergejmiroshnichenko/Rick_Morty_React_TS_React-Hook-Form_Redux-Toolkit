import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { TextField } from '@mui/material';
import { setCurrentPage } from 'store/slices/charactersSlice.ts';
import { useAppDispatch } from 'hooks/redux-hooks.ts';

interface IInputProps {
    name: string;
    label: string;
    isSearchKeyword?: boolean;
    setSearchKeyword?: (value: string) => void;
}

export const Input: FC<IInputProps> = ({ name, label, isSearchKeyword, setSearchKeyword, ...props }) => {
  const { control } = useFormContext();
  const dispatch = useAppDispatch()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          onChange={(e) => {
            dispatch(setCurrentPage(1))
            field.onChange(e.target.value);
            if (isSearchKeyword && setSearchKeyword) {
              setSearchKeyword(e.target.value)
            }
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