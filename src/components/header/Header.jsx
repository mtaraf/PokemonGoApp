import { useEffect, useState } from "react";
import styles from "../../css/header/header.module.css";
import { Button, Navbar, Nav, Container, Modal, Form } from "react-bootstrap";
import userImage from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import { getUser, getUserList, postUser } from "../api/internalApi";

export default function Header({ setPage, setUser, user }) {
  const navigate = useNavigate();
  const changePage = (page) => navigate(page);

  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //error checking
  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(true);
  const [passwordNumberError, setPasswordNumberError] = useState(true);

  // Make sure there is atleast one character for username and password to enable submit button
  useEffect(() => {
    if (!username || !password) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    // Error checking for pasword length
    if (password.length > 7) {
      setPasswordLengthError(false);
    } else {
      setPasswordLengthError(true);
    }

    // Error checking for number in password
    if (/\d/.test(password)) {
      setPasswordNumberError(false);
    } else {
      setPasswordNumberError(true);
    }
  }, [username, password]);

  // closes modal
  const handleClose = () => {
    setShow(false);
    setDisplaySignUp(false);
  };

  // opens modal
  const openSignInMenu = () => {
    setShow(true);
  };

  // handles login when submit button for sign in modal is clicked
  const handleLogin = async (e) => {
    const username = e.target.form[0].value;
    const password = e.target.form[1].value;

    const success = await getUser(username, password);

    let data = null;

    if (success) {
      setLoginError("");
      setShow(false);
      data = await getUserList(username);
    }

    if (data !== null && data.length !== 0) {
      setUser({
        username: e.target.form[0].value,
        list: data[0].list,
        signedIn: true,
        mode: success.mode,
      });
    } else {
      setUser({
        username: e.target.form[0].value,
        list: [],
        signedIn: true,
        mode: success.mode,
      });
    }
  };

  // handles login when submit button for sign in modal is clicked
  const handleSignUp = async (e) => {
    const username = e.target.form[0].value;
    const password = e.target.form[1].value;

    if (passwordLengthError || passwordNumberError) {
      setSignUpError("Please use valid password");
      return;
    }

    const data = await postUser(username, password);

    if (data.message?.includes("duplicate key error")) {
      setSignUpError("Username is taken! Please try another.");
      return;
    }

    if (data !== null && data !== undefined) {
      setUser({
        username: data.username,
        signedIn: true,
      });
      handleClose();
    }
  };

  return (
    <>
      <Navbar
        className={
          user.mode ? styles.containerDarkMode : styles.containerLightMode
        }
        sticky="top"
      >
        <Container>
          <Navbar.Brand className={styles.title}>PokeGo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              className={styles.nav}
              onClick={() => changePage("/home")}
            >
              Raids
            </Nav.Link>
            <Nav.Link
              className={styles.nav}
              onClick={() => changePage("/myPokemon")}
            >
              MyPokemon
            </Nav.Link>
            <Nav.Link
              className={styles.nav}
              onClick={() => changePage("/explore")}
            >
              Explore
            </Nav.Link>
          </Nav>
          {user?.signedIn ? (
            // <Button className={styles.button}>
            //   <div className={styles.userImageContainer}>
            //     <img src={userImage} className={styles.userImage} />
            //   </div>
            // </Button>
            <UserDropDown user={user} setUser={setUser} />
          ) : (
            <Button className={styles.button} onClick={() => openSignInMenu()}>
              Sign-In
            </Button>
          )}
        </Container>
      </Navbar>

      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{displaySignUp ? "Join Today!" : "Sign-In"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for sign-up and login */}

          {displaySignUp ? (
            <Form>
              <Form.Group>
                <Form.Label>Enter Username</Form.Label>
                <Form.Control
                  placeholder=""
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className={styles.bottomFormControl}>
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.bottomMargin}
                />
                <Form.Text muted>
                  <div
                    className={
                      passwordLengthError || passwordNumberError
                        ? styles.formError
                        : ""
                    }
                  >
                    Please meet requirements:
                  </div>
                  <ul>
                    <li className={passwordLengthError ? styles.formError : ""}>
                      At least 8 letters
                    </li>
                    <li className={passwordNumberError ? styles.formError : ""}>
                      A number
                    </li>
                  </ul>
                </Form.Text>
              </Form.Group>
              <Form.Text className={styles.formError}>{signUpError}</Form.Text>
              <Button
                className={styles.modalButton}
                disabled={disabled}
                onClick={(e) => handleSignUp(e)}
              >
                Submit
              </Button>
            </Form>
          ) : (
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder=""
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className={styles.bottomFormControl}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Text className={styles.formError}>{loginError}</Form.Text>
              <Button
                className={styles.modalButton}
                disabled={disabled}
                onClick={(e) => handleLogin(e)}
              >
                Submit
              </Button>
              <Button
                className={styles.modalButton}
                onClick={() => {
                  setDisplaySignUp(true);
                }}
              >
                New User? Sign-Up Today!
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
