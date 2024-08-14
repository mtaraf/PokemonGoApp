import styles from "../../css/myPokemon/pokemonMiniCard.module.css";
import { Card } from "react-bootstrap";

export default function PokemonMiniCard({
  cp,
  image,
  name,
  setCurrent,
  id,
  current,
}) {
  return (
    <Card
      className={id === current ? styles.focusedCard : styles.card}
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
