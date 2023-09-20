import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { FC, useEffect } from 'react';
import styles from '../HomePage/HomePage.module.scss';
import { Layout } from 'components/Layout/Layout.tsx';
import { ReactComponent as IconCharacters } from 'assets/SVG.svg';
import { useParams } from 'react-router-dom';
import { characterByIdClear, fetchCharacterById } from 'store/slices/characterByIdSlice.ts';
import { CharacterCard } from 'components/CharactersCard/CharacterCard.tsx';
import { CharacterProps } from 'types/ICharacters.types.ts';
import { Loader } from 'components/Loader/Loader.tsx';
import { CharactersInteractionMenu } from 'components/CharactersInteractionMenu/CharactersInteractionMenu.tsx';


const CharacterDetailsPage: FC<CharacterProps> = () => {

  const { id } = useParams()

  const dispatch = useAppDispatch()

  const { characterDetails, error, isLoading } = useAppSelector(state => state.characterDetails)

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterById(+id))
    }
    return () => {
      dispatch(characterByIdClear())
    }
  }, [dispatch, id])

  return (
    <Layout className={styles.wrapper}>
      <IconCharacters className={styles.iconCharacters}/>
      <h1 className={styles.title}>The Rick and Morty API</h1>

      <section className={styles.mainDetails}>
        {error ?
          <h1>Error occurred : {error}</h1>
          : isLoading === 'resolved'
            ?
            <>
              {characterDetails && (
                <CharacterCard
                  image={characterDetails.image}
                  status={characterDetails.status}
                  name={characterDetails.name}
                  species={characterDetails.species}
                  location={characterDetails.location}
                  origin={characterDetails.origin}
                  id={characterDetails.id}
                  isCharacter
                />
              )}
              <CharactersInteractionMenu/>
            </>
            : <Loader/>
        }
      </section>
    </Layout>
  );
};

export default CharacterDetailsPage;
