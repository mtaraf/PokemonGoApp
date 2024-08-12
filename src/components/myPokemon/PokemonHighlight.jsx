import { Card, ListGroup, ProgressBar, Stack } from "react-bootstrap";
import styles from "../../css/myPokemon/pokemonHighlight.module.css";
import candyImage from "../../assets/candy.jpg";
import PokemonMove from "./PokemonMove";

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
}) {
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

  return (
    <Card className={styles.card}>
      <div className={styles.cp}>cp {cp}</div>
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
          type="https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_FIRE.png"
          name="Fire Fist"
          value="10"
        />
        <PokemonMove
          type="https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_FIRE.png"
          name="Fire Fist"
          value="10"
        />
        <div className={styles.moves}>{fastMove}</div>
        <div className={styles.moves}>{chargedMove}</div>
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
  );
}
