import { Alert, Card, Col, Row } from "react-bootstrap";
import styles from "../../css/raid/recommnededRaidPokemon.module.css";
import PokemonDisplay from "./PokemonDisplay";
import articuno from "../../assets/articuno.jpg";
import { useEffect, useState } from "react";

export default function RecommendedRaidPokemon({
  isRaidSelected,
  raidSelected,
  user,
}) {
  // Alert
  const [show, setShow] = useState(false);

  // Pokemon Typing Map
  const map = new Map();

  // Initialize maps on create
  useEffect(() => {
    // Normal
    map.set("Normal", [
      { effect: 2, type: "Fighting" },
      { effect: 0, type: "Ghost" },
    ]);

    // Fire
    map.set("Fire", [
      { effect: 0.5, type: "Fire" },
      { effect: 2, type: "Water" },
      { effect: 0.5, type: "Grass" },
      { effect: 0.5, type: "Ice" },
      { effect: 2, type: "Ground" },
      { effect: 0.5, type: "Bug" },
      { effect: 2, type: "Rock" },
      { effect: 0.5, type: "Steel" },
      { effect: 0.5, type: "Fairy" },
    ]);

    // Water
    map.set("Water", [
      { effect: 0.5, type: "Fire" },
      { effect: 0.5, type: "Water" },
      { effect: 2, type: "Electric" },
      { effect: 2, type: "Grass" },
      { effect: 0.5, type: "Ice" },
      { effect: 0.5, type: "Steel" },
    ]);

    // Electric
    map.set("Electric", [
      { effect: 0.5, type: "Electric" },
      { effect: 2, type: "Ground" },
      { effect: 0.5, type: "Flying" },
      { effect: 0.5, type: "Steel" },
    ]);

    // Grass
    map.set("Grass", [
      { effect: 2, type: "Fire" },
      { effect: 0.5, type: "Water" },
      { effect: 0.5, type: "Electric" },
      { effect: 0.5, type: "Grass" },
      { effect: 2, type: "Ice" },
      { effect: 2, type: "Poison" },
      { effect: 0.5, type: "Ground" },
      { effect: 2, type: "Flying" },
      { effect: 2, type: "Bug" },
    ]);

    // Ice
    map.set("Ice", [
      { effect: 2, type: "Fire" },
      { effect: 0.5, type: "Ice" },
      { effect: 2, type: "Fighting" },
      { effect: 2, type: "Rock" },
      { effect: 2, type: "Steel" },
    ]);

    // Fighting
    map.set("Fighting", [
      { effect: 2, type: "Flying" },
      { effect: 2, type: "Psychic" },
      { effect: 0.5, type: "Bug" },
      { effect: 0.5, type: "Rock" },
      { effect: 0.5, type: "Dark" },
      { effect: 2, type: "Fairy" },
    ]);

    // Poison
    map.set("Poison", [
      { effect: 0.5, type: "Grass" },
      { effect: 0.5, type: "Fighting" },
      { effect: 0.5, type: "Poison" },
      { effect: 2, type: "Ground" },
      { effect: 2, type: "Psychic" },
      { effect: 0.5, type: "Bug" },
      { effect: 0.5, type: "Fairy" },
    ]);

    // Ground
    map.set("Ground", [
      { effect: 2, type: "Water" },
      { effect: 0, type: "Electric" },
      { effect: 2, type: "Grass" },
      { effect: 2, type: "Ice" },
      { effect: 0.5, type: "Poison" },
      { effect: 0.5, type: "Rock" },
    ]);

    // Flying
    map.set("Flying", [
      { effect: 0.5, type: "Fighting" },
      { effect: 2, type: "Electric" },
      { effect: 0.5, type: "Grass" },
      { effect: 2, type: "Ice" },
      { effect: 0, type: "Ground" },
      { effect: 0.5, type: "Bug" },
      { effect: 2, type: "Rock" },
    ]);

    // Psychic
    map.set("Psychic", [
      { effect: 0.5, type: "Fighting" },
      { effect: 0.5, type: "Psychic" },
      { effect: 2, type: "Bug" },
      { effect: 2, type: "Ghost" },
      { effect: 2, type: "Dark" },
    ]);

    // Bug
    map.set("Bug", [
      { effect: 2, type: "Fire" },
      { effect: 0.5, type: "Grass" },
      { effect: 0.5, type: "Fighting" },
      { effect: 0.5, type: "Ground" },
      { effect: 2, type: "Flying" },
      { effect: 2, type: "Rock" },
    ]);

    // Rock
    map.set("Rock", [
      { effect: 0.5, type: "Normal" },
      { effect: 0.5, type: "Fire" },
      { effect: 2, type: "Water" },
      { effect: 2, type: "Grass" },
      { effect: 2, type: "Fighting" },
      { effect: 0.5, type: "Poison" },
      { effect: 2, type: "Ground" },
      { effect: 0.5, type: "Flying" },
      { effect: 2, type: "Steel" },
    ]);

    // Ghost
    map.set("Ghost", [
      { effect: 0, type: "Normal" },
      { effect: 0, type: "Fighting" },
      { effect: 0.5, type: "Poison" },
      { effect: 0.5, type: "Bug" },
      { effect: 2, type: "Ghost" },
      { effect: 2, type: "Dark" },
    ]);

    // Dragon
    map.set("Dragon", [
      { effect: 0.5, type: "Fire" },
      { effect: 0.5, type: "Water" },
      { effect: 0.5, type: "Electric" },
      { effect: 0.5, type: "Grass" },
      { effect: 2, type: "Ice" },
      { effect: 2, type: "Dragon" },
      { effect: 2, type: "Fairy" },
    ]);

    // Steel
    map.set("Steel", [
      { effect: 0.5, type: "Normal" },
      { effect: 2, type: "Fire" },
      { effect: 0.5, type: "Ice" },
      { effect: 0.5, type: "Grass" },
      { effect: 2, type: "Fighting" },
      { effect: 0, type: "Poison" },
      { effect: 2, type: "Ground" },
      { effect: 0.5, type: "Flying" },
      { effect: 0.5, type: "Psychic" },
      { effect: 0.5, type: "Bug" },
      { effect: 0.5, type: "Rock" },
      { effect: 0.5, type: "Dragon" },
      { effect: 0.5, type: "Steel" },
      { effect: 0.5, type: "Fairy" },
    ]);

    // Fairy
    map.set("Fairy", [
      { effect: 0.5, type: "Fighting" },
      { effect: 2, type: "Poison" },
      { effect: 0.5, type: "Bug" },
      { effect: 0, type: "Dragon" },
      { effect: 0.5, type: "Dark" },
      { effect: 2, type: "Steel" },
    ]);
  }, []);

  useEffect(() => {
    if (raidSelected !== undefined) {
      console.log("Raid selected: " + raidSelected.id);
      calculateTeam(raidSelected);
    }
  }, [raidSelected]);

  // Show alert if raid is selected when user is not signed in
  useEffect(() => {
    if (isRaidSelected && !user.signedIn) {
      setShow(true);
    }
  }, [isRaidSelected]);

  // Calculate the best pokemon for the raid selected
  const calculateTeam = (data) => {
    console.log(data);
    const raidTypes = data.types;
    const raidCounters = data.counter;
    const userPokemon = user.list;
    console.log("User list: " + userPokemon[0].name);

    let sortedUserPokemonList = [];

    let fastMoveDamage = 0;
    let fastMoveType = "";
    let chargedMoveDamage = 0;
    let chargedMoveType = "";

    let raidTypeEffectiveness = [];
    raidTypes.forEach((type) =>
      raidTypeEffectiveness.push.apply(raidTypeEffectiveness, map.get(type))
    );

    userPokemon.forEach((obj) => {
      const attack =
        (obj.base_attack + Number(obj.attack)) /
        (obj.base_defense + Number(obj.defense));

      // Fast Move Calculation
      fastMoveDamage =
        (obj.fastMove.power / (obj.fastMove.duration / 1000)) * attack;
      fastMoveType = obj.fastMove.type;
      if (obj.types.includes(fastMoveType)) {
        fastMoveDamage *= 1.2;
      }

      if (raidCounters[fastMoveType] !== undefined) {
        fastMoveDamage *= raidCounters[fastMoveType];
      } else {
        const notEffectiveType = raidTypeEffectiveness.find(
          (obj) => obj.type === fastMoveType
        );
        if (notEffectiveType !== undefined) {
          fastMoveDamage *= notEffectiveType.effect;
        }
      }

      fastMoveDamage = Math.floor(fastMoveDamage * 0.5) + 1;

      // Charged Move Calculation
      chargedMoveDamage =
        (obj.chargedMove.power / (obj.chargedMove.duration / 1000)) * attack;
      chargedMoveType = obj.chargedMove.type;
      if (obj.types.includes(chargedMoveType)) {
        chargedMoveDamage *= 1.2;
      }

      if (raidCounters[chargedMoveType] !== undefined) {
        chargedMoveDamage *= raidCounters[chargedMoveType];
      } else {
        const notEffectiveType = raidTypeEffectiveness.find(
          (obj) => obj.type === chargedMoveType
        );
        if (notEffectiveType !== undefined) {
          chargedMoveDamage *= notEffectiveType.effect;
        }
      }

      chargedMoveDamage = Math.floor(chargedMoveDamage * 0.5) + 1;

      console.log(obj);
      console.log(attack);
      console.log("Fast Move Damage: " + fastMoveDamage);
      console.log("Charged Move Damage: " + chargedMoveDamage);

      // Multiply the damage calculated by some factor of cp

      // Add data to a data structure then sort based on best damage and best typing
    });

    // Sort data structure based on damage and best typings
  };

  return (
    <>
      <Card
        className={
          user.mode ? styles.containerDarkMode : styles.containerLightMode
        }
      >
        <div className={styles.title}>Best Pokemon</div>
        <Row>
          <Col xl={6} lg={12} md={12} sm={12}>
            <PokemonDisplay
              image={articuno}
              name="articuno"
              cp="1000"
              user={user}
            />
            <PokemonDisplay image={articuno} name="" cp="1000" user={user} />
            <PokemonDisplay image={articuno} name="" cp="1000" user={user} />
          </Col>
          <Col xl={6} lg={12} md={12} sm={12}>
            <PokemonDisplay image={articuno} name="" cp="1000" user={user} />
            <PokemonDisplay image={articuno} name="" cp="1000" user={user} />
            <PokemonDisplay image={articuno} name="" cp="1000" user={user} />
          </Col>
        </Row>
      </Card>

      <Alert
        variant="danger"
        show={show}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>
          Please sign-in to get your recommended team!
        </Alert.Heading>
      </Alert>
    </>
  );
}
