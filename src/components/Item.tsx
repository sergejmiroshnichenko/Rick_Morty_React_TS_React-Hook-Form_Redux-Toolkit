import { useEffect } from 'react';
import { getCharacters } from 'services/api.ts';

export default function Characters() {

  useEffect(() => {
    const fetchCharacters = async () => {

      const { results } = await getCharacters();
      // console.log('results', results)

    }
    fetchCharacters();
  }, []);

  return (
    <>
    </>
  );
}