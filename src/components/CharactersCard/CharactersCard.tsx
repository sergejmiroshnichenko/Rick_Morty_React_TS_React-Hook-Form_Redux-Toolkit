import { FC } from 'react';
import { ICharacter } from 'types/ICharacters.ts';
import styles from './CharactersCard.module.scss'


export const CharactersCard: FC<ICharacter> = ({ image, status, name, species, location, origin }) => {

  const statusStyles: { [key: string]: string } = {
    Dead: styles.dotRed,
    Alive: styles.dotGreen,
    unknown: styles.dotGrey,
  };

  const dotStyle = statusStyles[status] || '';

  return (
    <div className={styles.cardWrapper}>
      <img src={image} width={229} height={220} alt="character image"/>

      <div className={styles.infoCharacter}>
        <p className={styles.nameCharacter}>{name}</p>
        <div className={styles.statusCharacter}>
          <p className={`${styles.dot} ${dotStyle}`}></p>
          <p>{status} - {species}</p>
        </div>
        <span>Last known location:</span>
        <p className={styles.locationCharacter}>{location.name}</p>
        <span>First seen in:</span>
        <p className={styles.locationCharacter}>{origin.name}</p>
      </div>
    </div>
  )
};

export default CharactersCard;
