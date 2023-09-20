import { Box, Drawer, Typography } from '@mui/material';
import { FC } from 'react';

interface DrawerComponentProps {
    isOpen: boolean
    onClose: () => void;
}

export const DrawerComponent: FC<DrawerComponentProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '9px 0 0 9px',
          position: 'absolute',
          height: '570px',
          width: '419px',
          top: 'calc(50% - 285px)'
        },
      }}>
      <Box role="presentation" textAlign="center" width={'250px'} p={2}>
        <Typography variant="h6" component="div">Side panel</Typography>
      </Box>
    </Drawer>
  );
};

