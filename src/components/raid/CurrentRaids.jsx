import { Card, Row } from "react-bootstrap";
import styles from "../../css/raid/currentRaids.module.css";
import RaidDisplay from "./RaidDisplay";
import articuno from "../../assets/articuno.jpg";

export default function CurrentRaids() {
  return (
    <Card className={styles.container}>
      <div className={styles.title}>Current Raids</div>
      <Row>
        <RaidDisplay title="Articuno" image={articuno} cp="4000" />
        <RaidDisplay title="Articuno" image={articuno} cp="4000" />
        <RaidDisplay title="Articuno" image={articuno} cp="4000" />
        <RaidDisplay title="Articuno" image={articuno} cp="4000" />
        <RaidDisplay title="Articuno" image={articuno} cp="4000" />
      </Row>
    </Card>
  );
}
