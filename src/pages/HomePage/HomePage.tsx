import { FC } from 'react';
import { Layout } from 'components/Layout/Layout.tsx';
import { ReactComponent as IconCharacter } from 'assets/SVG.svg';
import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  return (
    <Layout className={styles.wrapper}>
      <IconCharacter className={styles.iconCharacter} />
      <h1 className={styles.title}>The Rick and Morty API</h1>
    </Layout>
  );
};

export default HomePage;
