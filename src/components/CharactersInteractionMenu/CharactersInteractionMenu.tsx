import { useState } from 'react';
import MenuIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as HistoryIcon } from 'assets/history-icon.svg'
import { ReactComponent as DownloadIcon } from 'assets/download-icon.svg'
import { DrawerComponent } from 'components/Drawer/Drawer.tsx';
import styles from './CharactersInteractionMenu.module.scss'
import cx from 'classnames';

export const CharactersInteractionMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className={styles.buttonWrapper}>
        {isMenuOpen ? (
          <>
            <div className={cx(styles.iconButton, styles.smallButton)}
              onClick={openDrawer}>
              <HistoryIcon fontSize="medium"/>
            </div>
            <div className={cx(styles.iconButton, styles.smallButton)}
            >
              <DownloadIcon fontSize="medium"/>
            </div>
            <div className={cx(styles.iconButton, styles.mediumButton)} onClick={toggleMenu}>
              <CloseIcon fontSize="medium"/>
            </div>
          </>
        ) : (
          <div className={cx(styles.iconButton, styles.mediumButton)} onClick={toggleMenu}>
            <MenuIcon fontSize="medium"/>
          </div>
        )}
      </div>
      <DrawerComponent isOpen={isDrawerOpen} onClose={closeDrawer}/>
    </>
  );
};
