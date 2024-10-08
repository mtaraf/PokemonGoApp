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
import PokemonMiniCard from "./PokemonMiniCard";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import PokemonHighlight from "./PokemonHighlight";
import EmptyPokemonHighlight from "./EmptyPokemonHighlight";
import {
  updateList,
  getSpecificPokemon,
  getPokemonApiData,
} from "../api/internalApi";
import { getFastMoves, getChargedMoves } from "../api/externalApi";

export default function MyPokemon({ setPage, setUser, user }) {
  // Modal
  const [show, setShow] = useState(false);
  const [modalList, setModalList] = useState([""]);
  const [dynamicModalList, setDynamicModalList] = useState([]);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    cp: false,
    candy: false,
    attack: false,
    defense: false,
    hp: false,
  });

  // Displays pokemon moves in modal
  const [pokemonMoveData, setPokemonMoveData] = useState([]);
  const [currentPokemonMoves, setCurrentPokemonMoves] = useState({
    id: "",
    fastMoves: [],
    chargedMoves: [],
  });

  // Moves
  const [chargedMoves, setChargedMoves] = useState([]);
  const [fastMoves, setFastMoves] = useState([]);

  //Alert
  const [showAlert, setShowAlert] = useState(false);

  // Main
  const [current, setCurrent] = useState();
  const [highlightPokemonIndex, setHighlightPokemonIndex] = useState();
  const [userPokemonList, setUserPokemonList] = useState([]);
  const [displayPokemonList, setDisplayPokemonList] = useState([]);

  //Use Effects
  useEffect(() => {
    assignPokemonData();
    if (user.signedIn) {
      syncUserPokemonList();
      console.log(user.list);
    }
  }, [user.signedIn]);

  // Keeps selected pokemon in highlight even when order/filter chanhed
  useEffect(() => {
    const index = displayPokemonList.findIndex((item) => item._id === current);
    setHighlightPokemonIndex(index);
  }, [current, displayPokemonList]);

  // Whenever user list changes, update display list
  useEffect(() => {
    setDisplayPokemonList(userPokemonList);
    setUser({
      username: user.username,
      signedIn: user.signedIn,
      list: userPokemonList,
      mode: user.mode,
    });
  }, [userPokemonList]);

  useEffect(() => {
    getPokemonMoves();
  }, []);

  const getPokemonMoves = async () => {
    const chargedMovesData = await getChargedMoves();
    const fastMoveData = await getFastMoves();

    setChargedMoves(chargedMovesData);
    setFastMoves(fastMoveData);
  };

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
    console.log(e);
    // Error checking on form
    const passed = checkValues(
      e.target.form[1].value,
      e.target.form[2].value,
      e.target.form[5].value,
      e.target.form[6].value,
      e.target.form[7].value
    );

    if (!passed) {
      return;
    }

    const pokeName = await e.target.form[0].value;

    //Get image and types from data
    const pokeData = await getSpecificPokemon(
      pokeName.charAt(0).toUpperCase() + pokeName.slice(1)
    );

    let pokemonImage = "";
    let pokemonTypes = [];
    let base_attack = 0;
    let base_defense = 0;

    if (pokeData === null) {
      console.log("Error obtaining pokeData for specific pokemon");
      return;
    } else {
      pokemonImage = pokeData.image;
      pokemonTypes = pokeData.type;
      base_attack = pokeData.base_attack;
      base_defense = pokeData.base_defense;
    }

    // Moves
    const chargedMove = chargedMoves.find(
      (item) => item.name === e.target.form[4].value
    );
    const fastMove = fastMoves.find(
      (item) => item.name === e.target.form[3].value
    );
    console.log(chargedMove);

    // Create pokemon object to add to list and database
    const newPokemon = {
      name: e.target.form[0].value,
      cp: e.target.form[1].value,
      candy: e.target.form[2].value,
      fastMove: fastMove,
      chargedMove: chargedMove,
      attack: e.target.form[5].value,
      defense: e.target.form[6].value,
      hp: e.target.form[7].value,
      shiny: e.target.form[8].checked,
      shadow: e.target.form[9].checked,
      image: pokemonImage,
      types: pokemonTypes,
      base_attack: base_attack,
      base_defense: base_defense,
    };

    // add to list
    const tempList = [...userPokemonList, newPokemon];
    setUserPokemonList(tempList);
    setShow(false);

    // Reset Error Checking
    setFormErrorMessage("");
    setErrors({});

    // Reset Move Sets
    setCurrentPokemonMoves({
      id: "",
      fastMoves: [],
      chargedMoves: [],
    });

    await updateList(tempList, user);
  };

  // Delete pokemon from list
  const removePokemon = async (name) => {
    let list = userPokemonList;
    console.log(list);
    console.log(name);
    const index = list.findIndex((item) => item.name === name);
    console.log(index);

    if (index > -1) {
      list.splice(index, 1);
    }

    console.log(list);

    setUserPokemonList(list);
    setCurrent("");
    await updateList(list, user);
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

  // Syncs current user pokemon list
  const syncUserPokemonList = () => {
    setUserPokemonList(user.list);
  };

  const assignPokemonData = async () => {
    const data = await getPokemonApiData();
    console.log("Assign Pokemon Data: " + data.length);
    let tempList = [];
    let moveList = [];

    const dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      tempList.push(data[i].pokemon_name.toLowerCase());
      moveList.push({
        fastMoves: data[i].fast_moves,
        chargedMoves: data[i].charged_moves,
        id: data[i].pokemon_name.toLowerCase(),
      });
    }

    tempList.sort();

    setModalList(tempList);
    setDynamicModalList(tempList);
    setPokemonMoveData(moveList);
  };

  // Dynamically updates pokemon moves in modal
  const modalDisplayPokemonMoves = (e) => {
    console.log(e.target.value);
    const name = e.target.value;
    const data = pokemonMoveData.find((item) => item.id === name);
    console.log(data);
    setCurrentPokemonMoves(data);
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
        <Col lg={1} />
        <Col lg={10}>
          <Card
            className={user.mode ? styles.cardDarkMode : styles.cardLightMode}
          >
            <Row>
              <Col md={3} sm={12}>
                <PokemonFilter
                  setList={setDisplayPokemonList}
                  userList={userPokemonList}
                  displayList={displayPokemonList}
                  user={user}
                />
              </Col>
              <Col md={6} sm={12}>
                <Card
                  className={
                    user.mode ? styles.cardsDarkMode : styles.cardsLightMode
                  }
                >
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
                      className={
                        user.mode
                          ? styles.buttonDarkMode
                          : styles.buttonLightMode
                      }
                      onClick={() => openModal()}
                    >
                      +
                    </Button>
                    {displayPokemonList.map((item, index) => (
                      <PokemonMiniCard
                        key={index}
                        id={item._id}
                        name={item.name}
                        cp={item.cp}
                        image={item.image}
                        setCurrent={setCurrent}
                        current={current}
                        user={user}
                      />
                    ))}
                  </Row>
                </Card>
              </Col>
              <Col md={3} sm={12}>
                {displayPokemonList[highlightPokemonIndex] ? (
                  <PokemonHighlight
                    name={displayPokemonList[highlightPokemonIndex]?.name}
                    image={displayPokemonList[highlightPokemonIndex]?.image}
                    candy={displayPokemonList[highlightPokemonIndex]?.candy}
                    attack={displayPokemonList[highlightPokemonIndex]?.attack}
                    defense={displayPokemonList[highlightPokemonIndex]?.defense}
                    hp={displayPokemonList[highlightPokemonIndex]?.hp}
                    cp={displayPokemonList[highlightPokemonIndex]?.cp}
                    fastMove={
                      displayPokemonList[highlightPokemonIndex]?.fastMove
                    }
                    chargedMove={
                      displayPokemonList[highlightPokemonIndex]?.chargedMove
                    }
                    types={displayPokemonList[highlightPokemonIndex]?.types}
                    removePokemon={removePokemon}
                    user={user}
                  />
                ) : (
                  <EmptyPokemonHighlight />
                )}
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
              <Form.Select
                className={styles.formSelect}
                onChange={(e) => modalDisplayPokemonMoves(e)}
              >
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
              <Form.Select className={styles.formSelect}>
                {currentPokemonMoves?.fastMoves.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </Form.Select>
              <Form.Select className={styles.formSelect} placeholder="Charged">
                {currentPokemonMoves?.chargedMoves.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </Form.Select>
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
