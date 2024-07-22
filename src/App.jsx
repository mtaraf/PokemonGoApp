import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/app.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/header/Header";
import RaidCalculator from "./components/raid/RaidCalculator";
import CurrentRaids from "./components/raid/CurrentRaids";
import MyPokemon from "./components/myPokemon/MyPokemon";

function App() {
  const [user, setUser] = useState({
    username: "",
    signedIn: false,
  });
  const [page, setPage] = useState(0);

  return (
    <>
      <Header setPage={setPage} setUser={setUser} user={user} />
      <Container fluid>
        <Row className={styles.background}>
          <Col xs={{ span: 10, offset: 1 }}>
            {page === 0 ? (
              <>
                <RaidCalculator />
                <CurrentRaids />
              </>
            ) : page === 1 ? (
              <MyPokemon />
            ) : (
              <div>explore</div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
