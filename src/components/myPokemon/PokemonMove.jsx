import { Col, Row } from "react-bootstrap";
import styles from "../../css/myPokemon/pokemonMove.module.css";

export default function PokemonMove({ type, name, value }) {
  return (
    <Row className={styles.container}>
      <Col xs={10} className={styles.flex}>
        <img src={type} />
        <div className={styles.name}>{name}</div>
      </Col>
      <Col>
        <div className={styles.text}>{value}</div>
      </Col>
    </Row>
  );
}
