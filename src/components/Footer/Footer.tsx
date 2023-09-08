import { FC } from 'react';
import styles from './Footer.module.scss';
import { ReactComponent as Logo } from 'assets/logo-footer.svg';
import { ReactComponent as GitHub } from 'assets/github.svg';
import { ReactComponent as Twitter } from 'assets/twitter.svg';
import { ReactComponent as Favorite } from 'assets/favourite.svg';


export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.title}>PERFORMED AS PART OF A TEST CASE FOR THE COMPANY</p>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <ul className={styles.list}>
        <li>
          <a target="_blank" rel="noopener noreferrer"
            href={'https://github.com/sergejmiroshnichenko/Rick_Morty_React_TS'}>
            <GitHub />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/incode_group"><Twitter /></a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href=""><Favorite /></a>
        </li>
      </ul>
      <p className={styles.date}>2023</p>
    </footer>
  );
};
