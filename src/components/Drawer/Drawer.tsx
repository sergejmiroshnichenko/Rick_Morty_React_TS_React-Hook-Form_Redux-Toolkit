import { Box, Button, Drawer, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import { useAppSelector } from 'hooks/redux-hooks.ts';

interface DrawerComponentProps {
    isOpen: boolean
    onClose: () => void;
}

interface historyItem {
    title: string,
    text: string | ReactElement
}

export const DrawerComponent: FC<DrawerComponentProps> = ({ isOpen, onClose }) => {

  const { characterDetails } = useAppSelector(state => state.characterDetails)

  const { characters } = useAppSelector(state => state.characters)

  // console.log('filteredData +++', data)

  const historyItems: historyItem[] = []

  const addToHistory = (title: string, text: string | ReactElement) => {
    const newItem = { title, text }
    historyItems.push(newItem)
  }

  if (characterDetails) {
    const text = <p>Передивився інформацію що до <b> {characterDetails.name} </b></p>
    addToHistory('Character', text);
  }

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
        {historyItems.map((item, index) => (
          <div key={index}>
            <Typography color="rgba(0, 0, 0, 0.6)" variant="h6">{item.title}</Typography>
            <Typography>{item.text}</Typography>
          </div>
        ))}

        {characters?.map((item, index) => (
          <div key={index}>
            {index}.{item.name} {item.status} {item.species}
          </div>
        ))}

      </Box>
      <Button color="primary" variant="text" onClick={onClose}>Close</Button>
    </Drawer>
  );
};



