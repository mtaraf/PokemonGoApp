import { Card, Row, Col, Container } from "react-bootstrap";
import styles from "../../css/raid/raidCalculator.module.css";
import RaidPokemonSelector from "./RaidPokemonSelector";
import RecommendedRaidPokemon from "./RecommendedRaidPokemon";
import Header from "../header/Header";
import CurrentRaids from "./CurrentRaids";

export default function RaidCalculator({ setPage, setUser, user }) {
  return (
    <Container fluid className={styles.container}>
      <Header setPage={setPage} setUser={setUser} user={user} />
      <Row>
        <Col md={1} />
        <Col md={10}>
          <Card className={styles.card}>
            <Row>
              <Col md={6}>
                {/* Raid Pokemon Selector */}
                <RaidPokemonSelector />
              </Col>
              <Col md={6}>
                {/* Recommended Pokemon */}
                <RecommendedRaidPokemon />
              </Col>
            </Row>
            <Row>
              <Col>
                <CurrentRaids />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={1} />
      </Row>
    </Container>
  );
}
