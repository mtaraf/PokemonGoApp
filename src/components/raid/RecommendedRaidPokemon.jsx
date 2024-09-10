import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import styles from "../../css/raid/recommnededRaidPokemon.module.css";
import PokemonDisplay from "./PokemonDisplay";
import articuno from "../../assets/articuno.jpg";
import { useEffect, useState } from "react";
import { getSpecificPokemon } from "../api/internalApi";

export default function RecommendedRaidPokemon({
  isRaidSelected,
  raidSelected,
  user,
}) {
  // Alert
  const [show, setShow] = useState(false);

  // Pokemon Teams
  const [maximumDamageTeam, setMaximumDamageTeam] = useState([]);
  const [allAroundTeam, setAllAroundTeam] = useState([]);
  const [currentTeam, setCurrentTeam] = useState([]);

  // Pokemon Typing Map
  let map = new Map();

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

    // Dark
    map.set("Dark", [
      { effect: 2, type: "Fighting" },
      { effect: 0, type: "Psychic" },
      { effect: 2, type: "Bug" },
      { effect: 0.5, type: "Ghost" },
      { effect: 0.5, type: "Dark" },
      { effect: 2, type: "Fairy" },
    ]);
  }, [map]);

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
  const calculateTeam = async (data) => {
    if (!user.signedIn) {
      return;
    }

    //console.log(data);
    const raidTypes = data.types;
    const raidCounters = data.counter;
    const userPokemon = user.list;
    //console.log("User list: " + userPokemon[0].name);

    // Get raid pokemon data for defense statistic for damage calculation
    let pokemonQuery = data.id;
    //console.log(pokemonQuery[0] + pokemonQuery.slice(1).toLowerCase());
    const raidPokemonData = await getSpecificPokemon(
      pokemonQuery[0] + pokemonQuery.slice(1).toLowerCase()
    );

    if (raidPokemonData === undefined) {
      console.error("Raid Pokemon Data not found!");
      return;
    }

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
      // Attacker base_attack, Defender base_defense, multiplied by factor of cp (maybe needs fine tuning in the future)
      const attack =
        ((obj.base_attack + Number(obj.attack)) /
          raidPokemonData.base_defense) *
        (obj.cp / 500);

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

      // Duration factors in the charge time
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

      // Add data to a data structure
      sortedUserPokemonList.push({
        pokemon_name: obj.name,
        charged_damage: chargedMoveDamage,
        fast_damage: fastMoveDamage,
        total_damage: chargedMoveDamage + fastMoveDamage,
        pokemon_cp: obj.cp,
        image: obj.image,
        types: obj.types,
      });
    });

    // Sort data structure based on damage
    sortedUserPokemonList.sort((a, b) => {
      if (a.total_damage > b.total_damage) {
        return -1;
      } else if (a.total_damage < b.total_damage) {
        return 1;
      }
      return 0;
    });

    // First 6 pokemon in list represent highest dps, best all around should take into consideration defensive typing
    if (sortedUserPokemonList.length > 6) {
      let tempMaxDamageTeam = [];
      for (let i = 0; i < 6; i++) {
        tempMaxDamageTeam.push(sortedUserPokemonList[i]);
      }
      setMaximumDamageTeam(tempMaxDamageTeam);
      // Set default team display to max damage team on raid selected
      setCurrentTeam(tempMaxDamageTeam);
    }

    // Best All Around Team
    // Find Mean / Standard Deviation of cp of top 6 dps, then filter top dps with best typing that are 2 standard devs from mean at most
    let tempAllAroundTeam = [];
    let addToTeam = true;
    for (let i = 0; i < sortedUserPokemonList.length; i++) {
      // Get Super Effective typings against this pokemon
      let superEffective = [];
      sortedUserPokemonList[i].types.forEach((type) => {
        const typingData = map.get(type);
        superEffective = typingData.filter((item) => item.effect === 2);
      });

      // if raid typing is in the super effective list, set flag to not add pokemon to list
      raidTypes.forEach((typing) => {
        if (addToTeam && superEffective.some((obj) => obj.type === typing)) {
          addToTeam = false;
          console.log("Do not add: " + sortedUserPokemonList[i].pokemon_name);
        }
      });

      if (addToTeam) {
        // Check CP here (if too far from the top then don't add, will have to go back through list and add pokemon with bad typing anyway)

        // add pokemon to list
        tempAllAroundTeam.push(sortedUserPokemonList[i]);
      }

      addToTeam = true;
    }

    setAllAroundTeam(tempAllAroundTeam);
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
          <Col>
            <Button
              className={
                currentTeam === maximumDamageTeam
                  ? styles.selectedButton
                  : styles.button
              }
              onClick={() => {
                setCurrentTeam(maximumDamageTeam);
              }}
            >
              Maximum Damage Team
            </Button>
          </Col>
          <Col>
            <Button
              className={
                currentTeam === allAroundTeam
                  ? styles.selectedButton
                  : styles.button
              }
              onClick={() => {
                setCurrentTeam(allAroundTeam);
              }}
            >
              All-Around Team
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xl={6} lg={12} md={12} sm={12}>
            {currentTeam.length >= 3 ? (
              currentTeam
                .slice(0, 3)
                .map((item, index) => (
                  <PokemonDisplay
                    image={item.image}
                    cp={item.pokemon_cp}
                    name={item.pokemon_name}
                    user={user}
                    key={index}
                  />
                ))
            ) : (
              <div>
                <PokemonDisplay
                  image={articuno}
                  name=""
                  cp="1000"
                  user={user}
                />
                <PokemonDisplay
                  image={articuno}
                  name=""
                  cp="1000"
                  user={user}
                />
                <PokemonDisplay
                  image={articuno}
                  name=""
                  cp="1000"
                  user={user}
                />
              </div>
            )}
          </Col>
          <Col xl={6} lg={12} md={12} sm={12}>
            {currentTeam.length >= 6 ? (
              currentTeam
                .slice(3, 6)
                .map((item, index) => (
                  <PokemonDisplay
                    image={item.image}
                    cp={item.pokemon_cp}
                    name={item.pokemon_name}
                    user={user}
                    key={index}
                  />
                ))
            ) : (
              <div>
                <PokemonDisplay
                  image={articuno}
                  name=""
                  cp="1000"
                  user={user}
                />
                <PokemonDisplay
                  image={articuno}
                  name=""
                  cp="1000"
                  user={user}
                />
                <PokemonDisplay
                  image={articuno}
                  name=""
                  cp="1000"
                  user={user}
                />
              </div>
            )}
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
