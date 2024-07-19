import { Card, Row } from "react-bootstrap";
import styles from "../../css/raid/raidCalculator.module.css";
import RaidPokemonSelector from "./RaidPokemonSelector";
import RecommendedRaidPokemon from "./RecommendedRaidPokemon";

export default function RaidCalculator() {
  return (
    <Card className={styles.container}>
      <Row>
        {/* Raid Pokemon Selector */}
        <RaidPokemonSelector />

        {/* Recommended Pokemon */}
        <RecommendedRaidPokemon />
      </Row>
    </Card>
  );
}
