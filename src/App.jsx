import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/app.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/header/Header";
import RaidCalculator from "./components/raid/RaidCalculator";
import CurrentRaids from "./components/raid/CurrentRaids";

function App() {
  return (
    <>
      <Header />
      <Container fluid>
        <Row className={styles.background}>
          <Col xs={{ span: 10, offset: 1 }}>
            <RaidCalculator />
            <CurrentRaids />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
