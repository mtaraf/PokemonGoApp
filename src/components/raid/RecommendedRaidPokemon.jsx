import { Card, Col, Row } from "react-bootstrap";
import styles from "../../css/raid/recommnededRaidPokemon.module.css";
import PokemonDisplay from "./PokemonDisplay";
import articuno from "../../assets/articuno.jpg";

export default function RecommendedRaidPokemon() {
  return (
    <Card className={styles.container}>
      <div className={styles.title}>Best Pokemon</div>
      <Row>
        <Col xl={6} lg={12} md={12} sm={12}>
          <PokemonDisplay image={articuno} name="articuno" cp="1000" />
          <PokemonDisplay image={articuno} name="" cp="1000" />
          <PokemonDisplay image={articuno} name="" cp="1000" />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12}>
          <PokemonDisplay image={articuno} name="" cp="1000" />
          <PokemonDisplay image={articuno} name="" cp="1000" />
          <PokemonDisplay image={articuno} name="" cp="1000" />
        </Col>
      </Row>
    </Card>
  );
}
