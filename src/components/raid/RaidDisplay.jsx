import { Card } from "react-bootstrap";
import styles from "../../css/raid/raidDisplay.module.css";

export default function RaidDisplay({ name, image, cp, types }) {
  // TO-DO: Move to DB
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
    <Card className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} className={styles.image} />
      </div>
      <div className={styles.typeImageContainer}>
        {types.map((type) => (
          <img
            src={pokemonTypes.find((item) => item.label === type).image}
            className={styles.typeImage}
          />
        ))}
      </div>
      <div className={styles.title}>{name}</div>
      <div>
        CP: {cp[0]} - {cp[1]}
      </div>
    </Card>
  );
}
