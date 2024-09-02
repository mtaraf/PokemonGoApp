import styles from "../../css/myPokemon/pokemonMiniCard.module.css";
import { Card } from "react-bootstrap";

export default function PokemonMiniCard({
  cp,
  image,
  name,
  setCurrent,
  id,
  current,
  user,
}) {
  return (
    <Card
      className={
        user.mode
          ? id === current
            ? styles.focusedCardDarkMode
            : styles.cardDarkMode
          : id === current
          ? styles.focusedCardLightMode
          : styles.cardLightMode
      }
      onClick={() => {
        setCurrent(id);
      }}
    >
      <div className={styles.cardText}>
        <span className={styles.bold}>cp {cp}</span>
      </div>
      <div className={styles.cardImageContainer}>
        <img src={image} className={styles.cardImage} />
      </div>
      <div className={styles.cardText}>{name}</div>
    </Card>
  );
}
