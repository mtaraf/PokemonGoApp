import { Card, Row } from "react-bootstrap";
import styles from "../../css/raid/currentRaids.module.css";
import RaidDisplay from "./RaidDisplay";
import articuno from "../../assets/articuno.jpg";
import { useState, useEffect } from "react";

export default function CurrentRaids() {
  const [raidList, setRaidList] = useState();

  // API for current raids
  const raidApi =
    "https://pokemon-go-api.github.io/pokemon-go-api/api/raidboss.json";

  // Query API for current raids
  const getCurrentRaids = async () => {
    try {
      const response = await fetch(raidApi);
      const data = await response.json();
      console.log(data);

      setRaidList(data.currentList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentRaids();
  }, []);

  return (
    <Card className={styles.container}>
      <div className={styles.title}>Current Raids</div>

      {/* Display raids by level */}
      <Row>
        <div className={styles.subTitle}>Tier 1</div>
        {raidList?.lvl1.map((raid) => (
          <RaidDisplay
            name={raid.names.English}
            image={raid.assets.image}
            cp={raid.cpRange}
            types={raid.types}
          />
        ))}
      </Row>
      <Row>
        <div className={styles.subTitle}>Tier 3</div>
        {raidList?.lvl3.map((raid) => (
          <RaidDisplay
            name={raid.names.English}
            image={raid.assets.image}
            cp={raid.cpRange}
            types={raid.types}
          />
        ))}
      </Row>
      <div className={styles.subTitle}>Tier 5</div>
      {raidList?.lvl5.map((raid) => (
        <RaidDisplay
          name={raid.names.English}
          image={raid.assets.image}
          cp={raid.cpRange}
          types={raid.types}
        />
      ))}
      <Row>
        <div className={styles.subTitle}>Mega</div>
        {raidList?.mega.map((raid) => (
          <RaidDisplay
            name={raid.names.English}
            image={raid.assets.image}
            cp={raid.cpRange}
            types={raid.types}
          />
        ))}
      </Row>
    </Card>
  );
}
