import styles from "../../css/myPokemon/pokemonMiniCard.module.css";
import { Card } from "react-bootstrap";

export default function PokemonMiniCard({
  cp,
  image,
  name,
  setCurrent,
  index,
  current,
}) {
  return (
    <Card
      className={index === current ? styles.focusedCard : styles.card}
      onClick={() => {
        setCurrent(index);
      }}
    >
      <div className={styles.cardText}>
        cp <span className={styles.bold}>{cp}</span>
      </div>
      <div className={styles.cardImageContainer}>
        <img src={image} className={styles.cardImage} />
      </div>
      <div className={styles.cardText}>{name}</div>
    </Card>
  );
}
