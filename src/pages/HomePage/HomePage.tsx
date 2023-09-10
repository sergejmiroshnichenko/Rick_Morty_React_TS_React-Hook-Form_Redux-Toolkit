import { FC, useEffect } from 'react';
import { Layout } from 'components/Layout/Layout.tsx';
import { ReactComponent as IconCharacters } from 'assets/SVG.svg';
import styles from './HomePage.module.scss';
import { PrimaryButton } from 'components/Button/Button.tsx';
import { useAppDispatch, useAppSelector } from 'components/hooks/redux-hooks.ts';
import { fetchAllCharacters } from 'store/slices/charactersSlice.ts';
import { CharacterCard } from 'components/CharactersCard/CharacterCard.tsx';
import { Audio } from 'react-loader-spinner'
import { Link } from 'react-router-dom';


export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { characters, isLoading, error } = useAppSelector(state => state.characters)

  useEffect(() => {
    dispatch(fetchAllCharacters())
  }, [dispatch])

  return (
    <Layout className={styles.wrapper}>
      <IconCharacters className={styles.iconCharacters}/>
      <h1 className={styles.title}>The Rick and Morty API</h1>

      <main className={styles.main}>
        <PrimaryButton>Filter</PrimaryButton>

        {error ?
          <h1>Error occurred : {error}</h1>

          : isLoading === 'resolved'

            ? <div className={styles.contentContainer}>

              {characters?.map(character => {
                return (
                  <Link to={`/character/${character.id}`}>
                    <CharacterCard key={character.id} {...character} />
                  </Link>
                )
              })}
            </div>

            : <Audio
              height="150"
              width="150"
              color="green"
              ariaLabel="loading"
              wrapperStyle={{ justifyContent: 'center', borderRadius: '9px' }}
            />
        }
      </main>
    </Layout>
  );
};

export default HomePage;
