import { FormControl, styled } from '@mui/material';

export const StyledFormControl = styled(FormControl)({
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
    height: '57px',

    '&:hover': {
      backgroundColor: '#e7e1e1',
    },
  },
})