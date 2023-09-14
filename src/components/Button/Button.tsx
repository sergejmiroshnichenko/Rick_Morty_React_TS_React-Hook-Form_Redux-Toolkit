import { FC, ReactNode } from 'react';
import { StyledButton } from './Button.styles.ts';
import '../../variables.scss'

interface PrimaryButtonProps {
    children: ReactNode;
    onClick: () => void
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children, onClick, ...props }) => {
  return (
    <StyledButton
      variant="contained"
      type="submit"
      size="medium"
      disableElevation
      onClick={onClick}
      {...props}>
      {children}
    </StyledButton>
  );
};