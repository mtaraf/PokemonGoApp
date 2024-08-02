import { ProgressBar } from "react-bootstrap";
import styles from "../../css/myPokemon/pokemonMove.module.css";

export default function PokemonMove({ type, name, value }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={type} />
        {name}
      </div>
      <ProgressBar now={(value / 200) * 100} className={styles.bar} />
      <div className={styles.right}>{value}</div>
    </div>
  );
}
