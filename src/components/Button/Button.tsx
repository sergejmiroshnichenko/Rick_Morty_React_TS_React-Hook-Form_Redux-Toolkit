import { Button, styled } from '@mui/material'
import { FC, ReactNode } from 'react';
import '../../variables.scss'

interface PrimaryButtonProps {
    children: ReactNode;
}

const StyledButton = styled(Button)({
  backgroundColor: 'var(--silver-color)',
  color: 'var(--main-color)',
  fontSize: 16,
  letterSpacing: 0.5,
  width: 143,
  height: 57,
  '&:hover': {
    backgroundColor: '#e7e1e1',
  },
})

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton
      variant="contained"
      type="submit"
      size="medium"
      disableElevation
      {...props}>
      {children}
    </StyledButton>
  );
};