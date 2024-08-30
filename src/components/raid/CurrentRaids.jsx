import { Card, Row, Col } from "react-bootstrap";
import styles from "../../css/raid/currentRaids.module.css";
import RaidDisplay from "./RaidDisplay";
import articuno from "../../assets/articuno.jpg";
import { useState, useEffect } from "react";

export default function CurrentRaids({ raidList, user }) {
  return (
    <Card
      className={
        user.mode ? styles.containerDarkMode : styles.containerLightMode
      }
    >
      <div className={styles.title}>Current Raids</div>

      {/* Display raids by level */}
      <Row>
        <div
          className={
            user.mode ? styles.subTitleDarkMode : styles.subTitleLightMode
          }
        >
          Tier 1
        </div>
        {raidList?.lvl1.map((raid) => (
          <Col md={3} key={raid.assets.image}>
            <RaidDisplay
              name={raid.names.English}
              image={raid.assets.image}
              cp={raid.cpRange}
              types={raid.types}
              user={user}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <div
          className={
            user.mode ? styles.subTitleDarkMode : styles.subTitleLightMode
          }
        >
          Tier 3
        </div>
        {raidList?.lvl3.map((raid) => (
          <Col md={3} key={raid.assets.image}>
            <RaidDisplay
              name={raid.names.English}
              image={raid.assets.image}
              cp={raid.cpRange}
              types={raid.types}
              user={user}
            />
          </Col>
        ))}
      </Row>
      <div
        className={
          user.mode ? styles.subTitleDarkMode : styles.subTitleLightMode
        }
      >
        Tier 5
      </div>
      {raidList?.lvl5.map((raid) => (
        <Col md={3} key={raid.assets.image}>
          <RaidDisplay
            name={raid.names.English}
            image={raid.assets.image}
            cp={raid.cpRange}
            types={raid.types}
            key={raid.assets.image}
            user={user}
          />
        </Col>
      ))}
      <Row>
        <div
          className={
            user.mode ? styles.subTitleDarkMode : styles.subTitleLightMode
          }
        >
          Mega
        </div>
        {raidList?.mega.map((raid) => (
          <Col md={3} key={raid.assets.image}>
            <RaidDisplay
              name={raid.names.English}
              image={raid.assets.image}
              cp={raid.cpRange}
              types={raid.types}
              key={raid.assets.image}
              user={user}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
}
