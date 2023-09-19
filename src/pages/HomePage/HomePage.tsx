import { FC, useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout.tsx';
import { ReactComponent as IconCharacters } from 'assets/SVG.svg';
import styles from './HomePage.module.scss';
import { PrimaryButton } from 'components/Button/Button.tsx';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { fetchAllCharacters, setCharacters, setPageQuantity } from 'store/slices/charactersSlice.ts';
import { CharacterCard } from 'components/CharactersCard/CharacterCard.tsx';
import { Link } from 'react-router-dom';
import { PaginationBar } from 'components/PaginationBar/PaginationBar.tsx';
import { FilterDropdown } from 'components/FilterDropdown/FilterDropdown.tsx';
import { Loader } from 'components/Loader/Loader.tsx';
import { BASE_URL } from 'services/constants.ts';
import { IAllCharacters } from 'types/ICharacters.types.ts';
import axios from 'axios';


export const HomePage: FC = () => {
  const [isFilterActive, setIsFilterActive] = useState(false)

  const dispatch = useAppDispatch();

  const { data, error, isLoading, currentPage, searchCharacters } = useAppSelector(state => state.characters);

  const toggleButton = () => {
    setIsFilterActive(!isFilterActive)
  }

  useEffect(() => {
    if (!data) {
      dispatch(fetchAllCharacters())
    }
  }, [data, dispatch])

  useEffect(() => {

    axios.get<IAllCharacters>(`${BASE_URL}/character/?page=${currentPage}&name=${searchCharacters}`).then(
      ({ data }) => {
        dispatch(setPageQuantity(data.info.pages));
        dispatch(setCharacters(data));
      }
    );
  }, [searchCharacters, dispatch, currentPage]);

  return (
    <Layout className={styles.wrapper}>
      <IconCharacters className={styles.iconCharacters}/>
      <h1 className={styles.title}>The Rick and Morty API</h1>

      <section className={styles.main}>

        <div className={styles.filterNavigation}>
          <PrimaryButton onClick={toggleButton}>
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
                  {data?.results?.map(character => (
                    <Link to={`/character/${character.id}`} key={character.id}>
                      <CharacterCard {...character} />
                    </Link>
                  ))}
                </div>
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
