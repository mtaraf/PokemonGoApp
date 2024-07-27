import styles from "../../css/myPokemon/myPokemon.module.css";
import {
  Card,
  Row,
  Button,
  Modal,
  Form,
  Container,
  Col,
  Alert,
} from "react-bootstrap";
import PokemonFilter from "./PokemonFilter";
import tempImage from "../../assets/articuno.jpg";
import PokemonMiniCard from "./PokemonMiniCard";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import PokemonHighlight from "./PokemonHighlight";

export default function MyPokemon({ setPage, setUser, user }) {
  // Modal
  const [show, setShow] = useState(false);
  const [modalList, setModalList] = useState([""]);
  const [dynamicModalList, setDynamicModalList] = useState([""]);
  const [modalSearch, setModalSearch] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    cp: false,
    candy: false,
    attack: false,
    defense: false,
    hp: false,
  });

  //Alert
  const [showAlert, setShowAlert] = useState(false);

  // Main
  const [current, setCurrent] = useState(0);
  const [userPokemonList, setUserPokemonList] = useState([]);

  // TO-DO: Put this in ENV file
  const POKEMON_API_URL = "http://localhost:5000/api/pokemon";
  const USER_POKEMON_LIST_URL = "http://localhost:5000/api/userPokemonList";

  const openModal = () => {
    // validate user is signed in
    if (user.signedIn) {
      setShow(true);
    } else {
      // Show alert to log in before adding pokemon
      setShowAlert(true);
    }
  };

  const onHide = () => {
    setShow(false);
    setFormErrorMessage("");
    setErrors({});
  };

  // Add new pokemon item to userPokemonList and updates database with information
  const addPokemonToList = async (e) => {
    // Error checking on form
    const passed = checkValues(
      e.target.form[2].value,
      e.target.form[3].value,
      e.target.form[6].value,
      e.target.form[7].value,
      e.target.form[8].value
    );

    if (!passed) {
      return;
    }

    const pokeName = await e.target.form[1].value;

    //Get image and types from data
    const pokeData = await getSpecificPokemon(
      pokeName.charAt(0).toUpperCase() + pokeName.slice(1)
    );

    let pokemonImage = "";
    let pokemonTypes = [];

    if (pokeData !== null) {
      pokemonImage = pokeData.image;
      pokemonTypes = pokeData.type;
    }

    // Create pokemon object to add to list and database
    const newPokemon = {
      name: e.target.form[1].value,
      cp: e.target.form[2].value,
      candy: e.target.form[3].value,
      fastMove: e.target.form[4].value,
      chargedMove: e.target.form[5].value,
      attack: e.target.form[6].value,
      defense: e.target.form[7].value,
      hp: e.target.form[8].value,
      shiny: e.target.form[9].checked,
      shadow: e.target.form[10].checked,
      image: pokemonImage,
      types: pokemonTypes,
    };

    // add to list
    const tempList = [...userPokemonList, newPokemon];
    setUserPokemonList(tempList);
    setShow(false);

    // Reset Error Checking
    setFormErrorMessage("");
    setErrors({});
    setModalSearch("");

    // TO-DO: Add pokemon to user list on database
    await updateList(tempList);
  };

  // API to update userPokemonList
  const updateList = async (updatedList) => {
    const listObj = {
      username: user.username,
      list: updatedList,
    };

    try {
      const response = await fetch(
        `${USER_POKEMON_LIST_URL}/${user.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listObj),
        }
      );

      const data = await response.json();

      console.log(JSON.stringify(listObj));
      console.log(user.username);
    } catch {
      console.log("Error updating list when adding pokemon: " + error);
    }
  };

  // Error checking for adding new pokemon
  const checkValues = (cp, candy, attack, defense, hp) => {
    let temp = errors;
    let error = false;
    const errMessage = "Please enter valid data for the highlighted fields";

    if (isNaN(parseInt(cp)) || parseInt(cp) <= 0) {
      temp.cp = true;
      error = true;
    }
    if (isNaN(parseInt(candy)) || parseInt(candy) < 0) {
      temp.candy = true;
      error = true;
    }
    if (isNaN(parseInt(attack)) || parseInt(attack) < 0) {
      temp.attack = true;
      error = true;
    }
    if (isNaN(parseInt(defense)) || parseInt(defense) < 0) {
      temp.defense = true;
      error = true;
    }
    if (isNaN(parseInt(hp)) || parseInt(hp) < 0) {
      temp.hp = true;
      error = true;
    }

    if (error) {
      setErrors(temp);
      setFormErrorMessage(errMessage);
      return false;
    }

    return true;
  };

  // Api to gather specific pokemon data
  const getSpecificPokemon = async (name) => {
    try {
      const response = await fetch(`${POKEMON_API_URL}/${name}`);
      const data = await response.json();

      if (data !== null) {
        return data[0];
      }
      return null;
    } catch (error) {
      console.log("Error obtaining specific pokemon data: " + e);
      return null;
    }
  };

  // Api to gather all pokemon names from external api
  const getPokemonApiData = async () => {
    try {
      const response = await fetch(POKEMON_API_URL);
      const data = await response.json();

      // If user exists, login user
      if (data !== null && response.status === 200) {
        console.log("Data Received");
        assignPokemonData(data);
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // Syncs current user pokemon list
  const syncUserPokemonList = () => {
    setUserPokemonList(user.list);
  };

  const assignPokemonData = async (data) => {
    let tempList = [];
    const dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      tempList.push(data[i].pokemon_name.toLowerCase());
    }

    tempList.sort();
    setModalList(tempList);
    setDynamicModalList(tempList);
  };

  useEffect(() => {
    getPokemonApiData();
    if (user.signedIn) {
      syncUserPokemonList();
    }
  }, [user]);

  // filters list of pokemon on modal
  useEffect(() => {
    let tempList = modalList;
    tempList = tempList.filter((item) => item.startsWith(modalSearch));
    setDynamicModalList(tempList);
  }, [modalSearch]);

  return (
    <Container fluid className={styles.container}>
      <Header setPage={setPage} setUser={setUser} user={user} />
      <Row>
        <Col lg={1} />
        <Col lg={10}>
          <Card className={styles.card}>
            <Row>
              <Col md={3} sm={12}>
                <PokemonFilter />
              </Col>
              <Col md={6} sm={12}>
                <Card className={styles.cards}>
                  <div className={styles.mainTitle}>My Pokemon</div>
                  <Alert
                    dismissible
                    show={showAlert}
                    onClose={() => {
                      setShowAlert(false);
                    }}
                    className={styles.alert}
                  >
                    <Alert.Heading>Please Sign-In to Add Pokemon</Alert.Heading>
                  </Alert>
                  <Row>
                    <Button
                      className={styles.button}
                      onClick={() => openModal()}
                    >
                      +
                    </Button>
                    {userPokemonList.map((item, index) => (
                      <PokemonMiniCard
                        key={item.name + index.toString()}
                        index={index}
                        name={item.name}
                        cp={item.cp}
                        image={item.image}
                        setCurrent={setCurrent}
                        current={current}
                      />
                    ))}
                  </Row>
                </Card>
              </Col>
              <Col md={3} sm={12}>
                <PokemonHighlight
                  name={userPokemonList[current]?.name}
                  image={userPokemonList[current]?.image}
                  candy={userPokemonList[current]?.candy}
                  attack={userPokemonList[current]?.attack}
                  defense={userPokemonList[current]?.defense}
                  hp={userPokemonList[current]?.hp}
                  cp={userPokemonList[current]?.cp}
                  fastMove={userPokemonList[current]?.fastMove}
                  chargedMove={userPokemonList[current]?.chargedMove}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={1} />
      </Row>

      <Modal show={show} onHide={() => onHide()}>
        <Modal.Header closeButton>
          <Modal.Title>Add Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select Pokemon</Form.Label>
              <div>
                <Form.Control
                  className={styles.searchFormControl}
                  placeholder="Type to filter list"
                  onChange={(e) => {
                    setModalSearch(e.target.value);
                  }}
                />
              </div>
              <Form.Select className={styles.formSelect}>
                {/* TO-DO: create list for all pokemon to come up */}
                {dynamicModalList.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                placeholder="Current CP"
                className={
                  errors.cp ? styles.errorFormControl : styles.formControl
                }
              />
              <Form.Control
                placeholder="Current Candy"
                className={
                  errors.candy ? styles.errorFormControl : styles.formControl
                }
              />
              <Form.Control
                placeholder="Fast Move"
                className={styles.formControl}
              />
              <Form.Control
                placeholder="Charged Move"
                className={styles.formControl}
              />
              <div className={styles.flex}>
                <Form.Control
                  placeholder="Attack IV"
                  className={
                    errors.attack
                      ? styles.errorIvFormControl
                      : styles.ivFormControl
                  }
                />
                <Form.Control
                  placeholder="Defense IV"
                  className={
                    errors.defense
                      ? styles.errorIvFormControl
                      : styles.ivFormControl
                  }
                />
                <Form.Control
                  placeholder="HP IV"
                  className={
                    errors.hp ? styles.errorIvFormControl : styles.ivFormControl
                  }
                />
              </div>
            </Form.Group>
            <Form.Label muted className={styles.formErrorMessage}>
              {formErrorMessage}
            </Form.Label>
            <Form.Check
              type="checkbox"
              label="Shiny"
              className={styles.formCheckbox}
            />
            <Form.Check
              type="checkbox"
              label="Shadow"
              className={styles.formCheckbox}
            />
            <Button
              className={styles.formButton}
              onClick={(e) => addPokemonToList(e)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
