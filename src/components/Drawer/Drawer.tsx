import styles from './Drawer.module.scss'
import { Box, Button, Drawer, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import { useAppSelector } from 'hooks/redux-hooks.ts';

interface DrawerComponentProps {
    isOpen: boolean
    onClose: () => void;
}

interface historyItem {
    title: string,
    text: string | ReactElement,
}

export const DrawerComponent: FC<DrawerComponentProps> = ({ isOpen, onClose }) => {

  const { characterDetails } = useAppSelector(state => state.characterDetails)

  const historyItems: historyItem[] = []

  const addToHistory = (title: string, text: string | ReactElement) => {
    const newItem = { title, text }
    historyItems.push(newItem)
  }

  if (characterDetails) {
    const text = <p>Передивився інформацію що до <b> {characterDetails.name} </b></p>
    addToHistory('Character', text);
  }

  const searchFilter = JSON.parse(String(localStorage.getItem('searchFilter')));

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '9px 0 0 9px',
          position: 'absolute',
          height: '570px',
          width: '419px',
          top: 'calc(50% - 285px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        },
      }}>
      <Box role="presentation" textAlign="left" width={'300px'} p={2}>
        <Typography
          fontWeight={500}
          letterSpacing="0.04em"
          variant="h6"
          component="div">
                    History
        </Typography>
        {historyItems.map(({ title, text }) => (
          <div key={title}>
            <Typography color="rgba(0, 0, 0, 0.6)" variant="h6">{title}</Typography>
            <Typography>{text}</Typography>
          </div>
        ))}

        {searchFilter && (
          <div className={styles.searchFilter}>
            <Typography color="rgba(0, 0, 0, 0.6)" variant="subtitle2">Character:</Typography>
            {Object.keys(searchFilter).slice(0, -1).map(key => (
              <Typography key={key} variant="subtitle2">
                {key}: {searchFilter[key]}
              </Typography>
            ))}
          </div>
        )}

      </Box>
      <Button color="primary" variant="text" onClick={onClose}>Close</Button>
    </Drawer>
  );
};



