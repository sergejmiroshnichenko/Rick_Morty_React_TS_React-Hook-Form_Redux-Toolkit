import { FC, useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout.tsx';
import { ReactComponent as IconCharacters } from 'assets/SVG.svg';
import styles from './HomePage.module.scss';
import { PrimaryButton } from 'components/Button/Button.tsx';
import { useAppDispatch, useAppSelector } from 'components/hooks/redux-hooks.ts';
import { fetchAllCharacters, setCharacters, setCurrentPage } from 'store/slices/charactersSlice.ts';
import { CharacterCard } from 'components/CharactersCard/CharacterCard.tsx';
import { Link } from 'react-router-dom';
import { IAllCharacters } from 'types/ICharacters.types.ts';
import axios from 'axios';
import { Pagination, Stack } from '@mui/material';
import { Audio } from 'react-loader-spinner';


export const HomePage: FC = () => {
  const [isFilterActive, setIsFilterActive] = useState(false)

  const dispatch = useAppDispatch();

  const { data, error, isLoading, currentPage } = useAppSelector(state => state.characters);

  const toggleButton = () => {
    setIsFilterActive(!isFilterActive)
  }

  const findHandleClick = () => {
  }

  useEffect(() => {
    if (!data) {
      dispatch(fetchAllCharacters())
    }
  }, [data, dispatch])

  useEffect(() => {
    axios.get<IAllCharacters>(`https://rickandmortyapi.com/api/character/?page=${currentPage}`).then(
      ({ data }) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(setCharacters(data));
      }
    );
  }, [currentPage, dispatch]);

  return (
    <Layout className={styles.wrapper}>
      <IconCharacters className={styles.iconCharacters}/>
      <h1 className={styles.title}>The Rick and Morty API</h1>

      <main className={styles.main}>
        <PrimaryButton onClick={toggleButton}>{!isFilterActive ? 'FILTER' : 'REMOVE FILTER'}</PrimaryButton>

        {isFilterActive && <PrimaryButton onClick={findHandleClick}>FIND</PrimaryButton>}

        {error ?
          <h1>Error occurred : {error}</h1>

          : isLoading === 'resolved'
            ? (
              <>
                <div className={styles.contentContainer}>

                  {data?.results?.slice(0, 6).map(character => {
                    return (
                      <Link to={`/character/${character.id}`}>
                        <CharacterCard key={character.id} {...character} />
                      </Link>
                    )
                  })}
                </div>
                <Stack spacing={2}>
                  <Pagination
                    count={6}
                    page={currentPage}
                    variant="outlined"
                    shape="rounded"
                    size="large"
                    onChange={(_, numPage) => {
                      dispatch(setCurrentPage(numPage));
                    }}
                    sx={{
                      '.css-wjh20t-MuiPagination-ul': {
                        display: 'flex',
                        justifyContent: 'center',
                      },
                      '.css-kvsszq-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
                        background: '#F5F5F5',
                        color: '#202329',
                        '&:hover': {
                          background: '#9E9E9E',
                        },
                      },
                      '.css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-disabled': {
                        background: '#9E9E9E',
                        color: 'rgba(39, 43, 51, 0.6)'
                      },
                      '.MuiPaginationItem-page': {
                        background: '#3C3E44',
                        color: '#F5F5F5',
                        fontSize: 16
                      },
                      '.MuiPaginationItem-previousNext ': {
                        background: '#F5F5F5',
                        color: '#272B33',
                        '&:hover': {
                          background: '#9E9E9E',
                        },
                      },
                    }}
                  />
                </Stack>
              </>
            )

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
