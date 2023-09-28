import { FC, ReactNode } from 'react';
import '../../variables.scss'
import { Button } from '@mui/material';

interface PrimaryButtonProps {
    children: ReactNode;
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    onClick: () => void
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children, onClick, color, ...props }) => {
  return (
    <Button
      variant={'contained'}
      color={color}
      type="submit"
      size="medium"
      disableElevation
      onClick={onClick}
      {...props}
      style={{
        width: '160px',
        height: '57px',
        fontSize: 16,
        letterSpacing: '-0.03em',
      }}
    >
      {children}
    </Button>
  );
};