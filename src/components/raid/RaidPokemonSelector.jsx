import { Button, Card } from "react-bootstrap";
import styles from "../../css/raid/raidPokemonSelector.module.css";

export default function RaidPokemonSelector() {
  return (
    <Card className={styles.container}>
      <Button className={styles.button}>+</Button>
    </Card>
  );
}
