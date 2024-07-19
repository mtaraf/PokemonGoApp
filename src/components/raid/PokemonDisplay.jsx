import { Card } from "react-bootstrap";
import styles from "../../css/raid/pokemonDisplay.module.css";
import pokeball from "../../assets/pokeball.jpg";

export default function PokemonDisplay({ image, name, cp }) {
  return (
    <Card className={styles.container}>
      {name ? (
        <div className={styles.flex}>
          <div className={styles.imageContainer}>
            <img src={image} className={styles.image} />
          </div>
          <div className={styles.title}>{name}</div>
          <div className={styles.stats}>CP: {cp}</div>
        </div>
      ) : (
        <div className={styles.flex}>
          <div className={styles.imageContainer}>
            <img src={pokeball} className={styles.image} />
          </div>
          <div className={styles.title}>------</div>
          <div className={styles.stats}>------</div>
        </div>
      )}
    </Card>
  );
}
