import styles from "../../css/myPokemon/myPokemon.module.css";
import { Card, Row } from "react-bootstrap";
import PokemonFilter from "./PokemonFilter";
import tempImage from "../../assets/articuno.jpg";
import PokemonMiniCard from "./PokemonMiniCard";
import { useEffect, useState } from "react";

export default function MyPokemon() {
  const [current, setCurrent] = useState(0);

  let userPokemonList = [
    {
      cp: "2000",
      name: "Articuno",
      image: tempImage,
    },
    {
      cp: "2000",
      name: "Articuno",
      image: tempImage,
    },
    {
      cp: "2000",
      name: "Articuno",
      image: tempImage,
    },
    {
      cp: "2000",
      name: "Articuno",
      image: tempImage,
    },
  ];

  return (
    <Card className={styles.container}>
      <div className={styles.flex}>
        <PokemonFilter />
        <Card className={styles.cards}>
          <div className={styles.mainTitle}>My Pokemon</div>
          <Row>
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
      </div>
    </Card>
  );
}
