import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)({
  backgroundColor: 'var(--silver-color)',
  color: 'var(--main-color)',
  fontSize: 16,
  letterSpacing: '-0.03em',
  width: 160,
  height: 57,
  '&:hover': {
    backgroundColor: '#e7e1e1',
  },
})