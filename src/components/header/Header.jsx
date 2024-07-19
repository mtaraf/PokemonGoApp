import styles from "../../css/header/header.module.css";
import { Button, Navbar, Nav, Container } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar className={styles.container} sticky="top">
      <Container>
        <Navbar.Brand className={styles.title}>PokeGo</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className={styles.nav}>Raids</Nav.Link>
          <Nav.Link className={styles.nav}>MyPokemon</Nav.Link>
          <Nav.Link className={styles.nav}>Explore</Nav.Link>
        </Nav>
        <Button className={styles.signInButton}>Sign-In</Button>
      </Container>
    </Navbar>
  );
}
