import { Card, Row, Col, Container } from "react-bootstrap";
import styles from "../../css/raid/raidCalculator.module.css";
import RaidPokemonSelector from "./RaidPokemonSelector";
import RecommendedRaidPokemon from "./RecommendedRaidPokemon";
import Header from "../header/Header";
import CurrentRaids from "./CurrentRaids";
import { useEffect, useState } from "react";
import { getCurrentRaids } from "../api/externalApi";

export default function RaidCalculator({ setPage, setUser, user }) {
  // Raid List
  const [raidList, setRaidList] = useState();

  // Error Checking
  const [isRaidSelected, setIsRaidSelected] = useState(false);
  const [raidSelected, setRaidSelected] = useState();

  useEffect(() => {
    getRaids();
  }, []);

  const getRaids = async () => {
    const data = await getCurrentRaids();
    setRaidList(data.currentList);
  };

  return (
    <Container
      fluid
      className={
        user.mode ? styles.containerDarkMode : styles.containerLightMode
      }
    >
      <Header setPage={setPage} setUser={setUser} user={user} />
      <Row>
        <Col md={1} />
        <Col md={10}>
          <Card
            className={user.mode ? styles.cardDarkMode : styles.cardLightMode}
          >
            <Row>
              <Col md={6}>
                {/* Raid Pokemon Selector */}
                <RaidPokemonSelector
                  raidList={raidList}
                  setIsRaidSelected={setIsRaidSelected}
                  setRaidSelected={setRaidSelected}
                  user={user}
                />
              </Col>
              <Col md={6}>
                {/* Recommended Pokemon */}
                <RecommendedRaidPokemon
                  isRaidSelected={isRaidSelected}
                  raidSelected={raidSelected}
                  user={user}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <CurrentRaids raidList={raidList} user={user} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={1} />
      </Row>
    </Container>
  );
}
