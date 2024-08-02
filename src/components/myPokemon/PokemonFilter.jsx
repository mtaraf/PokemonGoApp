import { Button, Card, Form, ListGroup } from "react-bootstrap";
import styles from "../../css/myPokemon/pokemonFilter.module.css";
import { useEffect, useState } from "react";

export default function PokemonFilter({ setList, userList, displayList }) {
  const [current, setCurrent] = useState(0);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (filter.length > 0) {
      let tempList = [...userList];
      console.log(tempList);

      // filters list depending on types
      const resultList = tempList.filter((item) => {
        for (let i = 0; i < filter.length; i++) {
          if (item.types.includes(filter[i])) {
            return true;
          }
        }
        return false;
      });

      setList(resultList);
    } else {
      // if no filters selected, default list shown
      setList(userList);
    }
  }, [filter]);

  const changeFilter = (filterItem) => {
    let tempFilter = [...filter];

    if (tempFilter.includes(filterItem)) {
      const index = tempFilter.findIndex((item) => item === filterItem);
      tempFilter.splice(index, 1);
    } else {
      tempFilter.push(filterItem);
    }

    setFilter(tempFilter);
  };

  const orderList = (value) => {
    let tempList = [...displayList];

    // Sort by CP
    if (value === "cp") {
      tempList.sort((a, b) => a.cp - b.cp);
    }
    // Sort by Name
    else if (value === "name") {
      tempList.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 0;
        }
        return 0;
      });
    }
    // TO-DO: Sort by Favorite
    else if (value === "favorite") {
    }
    console.log(tempList);

    setList(tempList);

    return tempList;
  };

  const filters = [
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
      <div className={styles.title}>Order</div>
      <div>
        <Button
          className={
            current === 0 ? styles.currentFilterButton : styles.filterButton
          }
          onClick={() => {
            setCurrent(0);
            orderList("cp");
          }}
        >
          <img />
          <div>Combat Power</div>
        </Button>
        <Button
          className={
            current === 1 ? styles.currentFilterButton : styles.filterButton
          }
          onClick={() => {
            setCurrent(1);
            orderList("name");
          }}
        >
          <img />
          <div>Name</div>
        </Button>
        <Button
          className={
            current === 2 ? styles.currentFilterButton : styles.filterButton
          }
          onClick={() => {
            setCurrent(2);
            orderList("favorite");
          }}
        >
          <img />
          <div>Favorite</div>
        </Button>
        <div className={styles.title}>Filters</div>
        <Form className={styles.form}>
          {filters.map((item) => (
            <div className={styles.filterItem} key={item.label}>
              <Form.Check
                id={item.label}
                onChange={() => changeFilter(item.label)}
              />
              <div className={styles.filterItemImageContainter}>
                <img src={item.image} className={styles.filterImage} />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </Form>
      </div>
    </Card>
  );
}
