import { useEffect, useState } from "react";
import styles from "../../css/header/header.module.css";
import { Button, Navbar, Nav, Container, Modal, Form } from "react-bootstrap";

export default function Header({ setPage }) {
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Make sure there is atleast one character for username and password to enable submit button
  useEffect(() => {
    if (!username || !password) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [username, password]);

  // Changes current page displayed
  const changePage = (page) => {
    setPage(page);
  };

  // closes modal
  const handleClose = () => {
    setShow(false);
  };

  // opens modal
  const openSignInMenu = () => {
    setShow(true);
  };

  // handles login when submit button for sign in modal is clicked
  const handleLogin = (e) => {
    const username = e.target.form[0].value;
    const password = e.target.form[0].value;
  };

  return (
    <>
      <Navbar className={styles.container} sticky="top">
        <Container>
          <Navbar.Brand className={styles.title}>PokeGo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className={styles.nav} onClick={() => changePage(0)}>
              Raids
            </Nav.Link>
            <Nav.Link className={styles.nav} onClick={() => changePage(1)}>
              MyPokemon
            </Nav.Link>
            <Nav.Link className={styles.nav} onClick={() => changePage(2)}>
              Explore
            </Nav.Link>
          </Nav>
          <Button className={styles.button} onClick={() => openSignInMenu()}>
            Sign-In
          </Button>
        </Container>
      </Navbar>

      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Sign-In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className={styles.bottomFormControl}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className={styles.modalButton}
              disabled={disabled}
              onClick={(e) => handleLogin(e)}
            >
              Submit
            </Button>
            <Button className={styles.modalButton}>
              New User? Sign-Up Today!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
