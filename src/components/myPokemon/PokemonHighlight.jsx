import { Card, ListGroup, ProgressBar, Stack } from "react-bootstrap";
import styles from "../../css/myPokemon/pokemonHighlight.module.css";
import candyImage from "../../assets/candy.jpg";

export default function PokemonHighlight({
  name,
  image,
  candy,
  attack,
  defense,
  hp,
  cp,
  fastMove,
  chargedMove,
}) {
  return (
    <Card className={styles.card}>
      <div className={styles.cp}>cp{cp}</div>
      <div className={styles.mainImageContainer}>
        <img src={image} className={styles.mainImage} />
      </div>
      <div className={styles.name}>{name}</div>

      <div className={styles.candy}>
        <img src={candyImage} className={styles.smallImage} /> {candy}
      </div>

      <div>
        <div className={styles.subTitle}>Moves</div>
        <div className={styles.moves}>{fastMove}</div>
        <div className={styles.moves}>{chargedMove}</div>
      </div>

      <ListGroup className={styles.ivs}>
        <ListGroup.Item className={styles.ivItem}>
          <div className={styles.ivTitle}>IVs</div>
          <div>Attack</div>
          <ProgressBar now={(attack / 15) * 100} className={styles.ivBar} />
        </ListGroup.Item>
        <ListGroup.Item className={styles.ivItem}>
          <div>Defense</div>
          <ProgressBar now={(defense / 15) * 100} className={styles.ivBar} />
        </ListGroup.Item>
        <ListGroup.Item className={styles.ivItem}>
          <div>HP</div>
          <ProgressBar now={(hp / 15) * 100} className={styles.ivBar} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
