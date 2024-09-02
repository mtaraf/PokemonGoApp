import {
  Button,
  Card,
  Dropdown,
  ListGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import styles from "../../css/myPokemon/pokemonHighlight.module.css";
import candyImage from "../../assets/candy.jpg";
import PokemonMove from "./PokemonMove";
import { useEffect, useState } from "react";

export default function PokemonHighlight({
  name,
  image,
  candy,
  attack,
  defense,
  hp,
  cp,
  fastMove,
  chargedMove,
  types,
  removePokemon,
  user,
}) {
  // Delete Modal
  const [show, setShow] = useState(false);

  // Moves
  const [chargedMoves, setChargedMoves] = useState([]);
  const [fastMoves, setFastMoves] = useState([]);
  const [fast, setFast] = useState({});
  const [charged, setCharged] = useState({});

  const pokemonTypes = [
    {
      label: "Fire",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_FIRE.png",
    },
    {
      label: "Water",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_WATER.png",
    },
    {
      label: "Grass",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_GRASS.png",
    },
    {
      label: "Ice",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_ICE.png",
    },
    {
      label: "Steel",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_STEEL.png",
    },
    {
      label: "Rock",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_ROCK.png",
    },
    {
      label: "Psychic",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_PSYCHIC.png",
    },

    {
      label: "Poison",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_POISON.png",
    },
    {
      label: "Normal",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_NORMAL.png",
    },
    {
      label: "Ground",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_GROUND.png",
    },
    {
      label: "Ghost",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_GHOST.png",
    },
    {
      label: "Flying",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_FLYING.png",
    },
    {
      label: "Fighting",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_FIGHTING.png",
    },
    {
      label: "Fairy",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_FAIRY.png",
    },
    {
      label: "Electric",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_ELECTRIC.png",
    },
    {
      label: "Dragon",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_DRAGON.png",
    },
    {
      label: "Dark",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_DARK.png",
    },
    {
      label: "Bug",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_BUG.png",
    },
  ];

  const EXTERNAL_FAST_MOVES_API = "https://pogoapi.net/api/v1/fast_moves.json";
  const EXTERNAL_CHARGED_MOVES_API =
    "https://pogoapi.net/api/v1/charged_moves.json";

  useEffect(() => {
    getChargedMoves();
    getFastMoves();
  }, []);

  useEffect(() => {
    setFast(fastMoves.find((item) => item.name === fastMove));
    setCharged(chargedMoves.find((item) => item.name === chargedMove));
  }, [fastMove, chargedMove]);

  // External API to GET fast_moves
  const getFastMoves = async () => {
    try {
      const response = await fetch(EXTERNAL_FAST_MOVES_API);
      const data = await response.json();

      if (data !== null) {
        setFastMoves(data);
        setFast(data.find((item) => item.name === fastMove));
      }
      return null;
    } catch (error) {
      console.log("Error obtaining specific pokemon data: " + e);
      return null;
    }
  };

  // External API to GET charged_moves
  const getChargedMoves = async () => {
    try {
      const response = await fetch(EXTERNAL_CHARGED_MOVES_API);
      const data = await response.json();

      if (data !== null) {
        setChargedMoves(data);
      }
      return null;
    } catch (error) {
      console.log("Error obtaining specific pokemon data: " + e);
      return null;
    }
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <Card className={user.mode ? styles.cardDarkMode : styles.cardLightMode}>
        <div className={styles.flex}>
          <span className={styles.cp}>cp {cp}</span>
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle
              className={styles.dropdownButton}
            ></Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenu} align="end">
              <Dropdown.Item
                className={styles.dropdownItem}
                onClick={() => {
                  setShow(true);
                }}
              >
                Delete
              </Dropdown.Item>
              <Dropdown.Item className={styles.dropdownItem}>
                Favorite
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className={styles.mainImageContainer}>
          <img src={image} className={styles.mainImage} />
        </div>
        <div className={styles.name}>
          {name}
          <div className={styles.typeImage}>
            {types?.map((type, index) => (
              <img
                src={pokemonTypes.find((item) => item.label === type).image}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className={styles.candy}>
          {name} candy: <img src={candyImage} className={styles.smallImage} />{" "}
          {candy}
        </div>

        <div>
          <div className={styles.subTitle}>Moves</div>
          <PokemonMove
            type={pokemonTypes.find((item) => item.label === fast?.type)?.image}
            name={fast?.name}
            value={fast?.power}
          />
          <PokemonMove
            type={
              pokemonTypes.find((item) => item.label === charged?.type)?.image
            }
            name={charged?.name}
            value={charged?.power}
          />
        </div>

        <ListGroup className={styles.ivs}>
          <ListGroup.Item className={styles.ivItem}>
            <div className={styles.ivTitle}>IVs</div>
            <div>Attack</div>
            <ProgressBar now={(attack / 15) * 100} className={styles.ivBar} />
          </ListGroup.Item>
          <ListGroup.Item className={styles.ivItem}>
            <div>Defense</div>
            <ProgressBar now={(defense / 15) * 100} className={styles.ivBar} />
          </ListGroup.Item>
          <ListGroup.Item className={styles.ivItem}>
            <div>HP</div>
            <ProgressBar now={(hp / 15) * 100} className={styles.ivBar} />
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <Modal show={show} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          Are you sure you want to delete this pokemon?
        </Modal.Header>
        <Modal.Body>
          <div className={styles.modalDisplay}>
            <Button
              className={styles.modalButton}
              onClick={() => {
                removePokemon(name);
                closeModal();
              }}
            >
              Yes
            </Button>
            <Button className={styles.modalButton} onClick={() => closeModal()}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
