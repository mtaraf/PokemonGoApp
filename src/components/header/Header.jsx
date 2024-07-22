import { useEffect, useState } from "react";
import styles from "../../css/header/header.module.css";
import { Button, Navbar, Nav, Container, Modal, Form } from "react-bootstrap";
import userImage from "../../assets/user.png";

export default function Header({ setPage, setUser, user }) {
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

  // TO-DO: Put this in ENV file
  const USERS_API_URL = "http://localhost:5000/api/users";

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

  // Changes current page displayed
  const changePage = (page) => {
    setPage(page);
  };

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

    const data = await getUser(username, password);

    if (data !== null) {
      setUser({
        username: data.username,
        signedIn: true,
      });
    }
  };

  // API to get user data from database
  const getUser = async (username, password) => {
    try {
      const response = await fetch(`${USERS_API_URL}/${username}&${password}`);
      const data = await response.json();
      console.log(data);

      // If user exists, login user
      if (data !== null && response.status === 200) {
        console.log("Login Success");
        setLoginError("");
        setShow(false);
        return data;
      } else {
        setLoginError("Username or password incorrect, please try again");
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
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

    if (data !== null) {
      setUser({
        username: data.username,
        signedIn: true,
      });
      handleClose();
    }
  };

  // API to post user data from database
  const postUser = async (username, password) => {
    const userObj = {
      username: username,
      password: password,
    };

    //if username not in use
    try {
      const response = await fetch(USERS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        // User added, login user as well
        console.log("User Creation Success");
        return data;
      } else {
        if (data.message.includes("duplicate key error")) {
          setSignUpError("Username is taken! Please try another.");
        }
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
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
          {user.signedIn ? (
            <Button className={styles.button}>
              <div className={styles.userImageContainer}>
                <img src={userImage} className={styles.userImage} />
              </div>
            </Button>
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
