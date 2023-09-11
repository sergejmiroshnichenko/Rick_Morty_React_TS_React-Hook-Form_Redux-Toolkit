import { FC } from 'react';
import { CharacterProps } from 'types/ICharacters.types.ts';
import styles from './CharacterCard.module.scss'


export const CharacterCard: FC<CharacterProps> = ({ image, status, name, species, location, origin, isCharacter }) => {

  const statusStyles: { [key: string]: string } = {
    Dead: styles.dotRed,
    Alive: styles.dotGreen,
    unknown: styles.dotGrey,
  };

  const dotStyle = statusStyles[status] || '';

  return (
    <div className={`${styles.cardWrapper} ${isCharacter && styles.detailsPageCard}`}>
      <img src={image} alt={`${name} image`}/>

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

