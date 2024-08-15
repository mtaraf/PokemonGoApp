import { Card, Row, Col, Container } from "react-bootstrap";
import styles from "../../css/raid/raidCalculator.module.css";
import RaidPokemonSelector from "./RaidPokemonSelector";
import RecommendedRaidPokemon from "./RecommendedRaidPokemon";
import Header from "../header/Header";
import CurrentRaids from "./CurrentRaids";
import { useEffect, useState } from "react";

export default function RaidCalculator({ setPage, setUser, user }) {
  // Raid List
  const [raidList, setRaidList] = useState();

  // Error Checking
  const [raidSelected, setRaidSelected] = useState(false);

  // API for current raids
  const raidApi =
    "https://pokemon-go-api.github.io/pokemon-go-api/api/raidboss.json";

  // Query API for current raids
  const getCurrentRaids = async () => {
    try {
      const response = await fetch(raidApi);
      const data = await response.json();
      console.log(data);

      setRaidList(data.currentList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentRaids();
  }, []);

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
                <RaidPokemonSelector
                  raidList={raidList}
                  setRaidSelected={setRaidSelected}
                />
              </Col>
              <Col md={6}>
                {/* Recommended Pokemon */}
                <RecommendedRaidPokemon
                  raidSelected={raidSelected}
                  user={user}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <CurrentRaids raidList={raidList} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={1} />
      </Row>
    </Container>
  );
}
