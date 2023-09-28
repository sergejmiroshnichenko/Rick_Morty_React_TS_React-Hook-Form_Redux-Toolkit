import { FC, useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout.tsx';
import { ReactComponent as IconCharacters } from 'assets/SVG.svg';
import styles from './HomePage.module.scss';
import { PrimaryButton } from 'components/Button/Button.tsx';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { fetchAllCharacters } from 'store/slices/charactersSlice.ts';
import { CharacterCard } from 'components/CharactersCard/CharacterCard.tsx';
import { Link } from 'react-router-dom';
import { PaginationBar } from 'components/PaginationBar/PaginationBar.tsx';
import { FilterDropdown } from 'components/FilterDropdown/FilterDropdown.tsx';
import { Loader } from 'components/Loader/Loader.tsx';
import { CharactersInteractionMenu } from 'components/CharactersInteractionMenu/CharactersInteractionMenu.tsx';


export const HomePage: FC = () => {
  const [isFilterActive, setIsFilterActive] = useState(false)

  const dispatch = useAppDispatch();

  const { characters, page, error, isLoading, searchCharacters } = useAppSelector(state => state.characters);

  const toggleButton = () => {
    setIsFilterActive(!isFilterActive)
  }

  useEffect(() => {
    if (!characters) {
      dispatch(fetchAllCharacters());
    }
  }, [characters, dispatch])

  useEffect(() => {
    dispatch(fetchAllCharacters({ character: { page, name: searchCharacters } }))
  }, [page, dispatch, searchCharacters])

  return (
    <Layout className={styles.wrapper}>
      <IconCharacters className={styles.iconCharacters}/>
      <h1 className={styles.title}>The Rick and Morty API</h1>

      <section className={styles.main}>

        <div className={styles.filterNavigation}>
          <PrimaryButton color="inherit" onClick={toggleButton}>
            {isFilterActive ? 'REMOVE FILTER' : 'FILTER'}
          </PrimaryButton>

          {isFilterActive && <FilterDropdown/>}
        </div>

        {error ?
          <h1>Error occurred : {error}</h1>

          : isLoading === 'resolved'
            ? (
              <>
                <div className={styles.contentContainer}>
                  {characters?.slice(0, 6).map(character => (
                    <Link to={`/character/${character.id}`} key={character.id}>
                      <CharacterCard {...character} />
                    </Link>
                  ))}
                </div>
                <CharactersInteractionMenu/>
                <PaginationBar/>
              </>
            )
            : <Loader/>
        }
      </section>
    </Layout>
  );
};

export default HomePage;
