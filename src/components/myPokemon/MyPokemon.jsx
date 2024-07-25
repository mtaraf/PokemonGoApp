import styles from "../../css/myPokemon/myPokemon.module.css";
import {
  Card,
  Row,
  Button,
  Modal,
  Form,
  Container,
  Col,
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

  // Main
  const [current, setCurrent] = useState(0);
  const [userPokemonList, setUserPokemonList] = useState([
    {
      name: "Articuno",
      cp: "2000",
      candy: "124",
      fastMove: "Water Pulse",
      chargedMove: "Dragon Pulse",
      attack: "11",
      defense: "6",
      hp: "12",
      shiny: false,
      shadow: false,
      image: tempImage,
      types: ["water", "ice"],
    },
    {
      name: "Articuno",
      cp: "2000",
      candy: "124",
      fastMove: "Water Pulse",
      chargedMove: "Dragon Pulse",
      attack: "11",
      defense: "6",
      hp: "12",
      shiny: false,
      shadow: false,
      image: tempImage,
      types: ["water", "ice"],
    },
  ]);

  // TO-DO: Put this in ENV file
  const POKEMON_API_URL = "http://localhost:5000/api/pokemon";

  const openModal = () => {
    setShow(true);
  };

  const onHide = () => {
    setShow(false);
  };

  const addPokemonToList = (e) => {
    // TO-DO: Error checking on form

    // TO-DO: Get image and types from data

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
      image: tempImage,
      types: [],
    };

    console.log(newPokemon);

    const tempList = [...userPokemonList, newPokemon];
    setUserPokemonList(tempList);
    setShow(false);
    // TO-DO: Add pokemon to user list on database
  };

  // Api to gather all pokemon names from external api
  const getPokemonApiData = async () => {
    try {
      const response = await fetch(POKEMON_API_URL);
      const data = await response.json();

      console.log(data.length);

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

  // Api to get details of specific pokemon
  const getPokemonDetails = async (pokemon) => {};

  useEffect(() => {
    getPokemonApiData();
  }, []);

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
                  name={userPokemonList[current].name}
                  image={userPokemonList[current].image}
                  candy={userPokemonList[current].candy}
                  attack={userPokemonList[current].attack}
                  defense={userPokemonList[current].defense}
                  hp={userPokemonList[current].hp}
                  cp={userPokemonList[current].cp}
                  fastMove={userPokemonList[current].fastMove}
                  chargedMove={userPokemonList[current].chargedMove}
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
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                placeholder="Current CP"
                className={styles.formControl}
              />
              <Form.Control
                placeholder="Current Candy"
                className={styles.formControl}
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
                  className={styles.ivFormControl}
                />
                <Form.Control
                  placeholder="Defense IV"
                  className={styles.ivFormControl}
                />
                <Form.Control
                  placeholder="HP IV"
                  className={styles.ivFormControl}
                />
              </div>
            </Form.Group>
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
