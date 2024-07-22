import { Card } from "react-bootstrap";
import styles from "../../css/raid/raidDisplay.module.css";

export default function RaidDisplay({ name, image, cp, types }) {
  return (
    <Card className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} className={styles.image} />
      </div>
      <div className={styles.title}>{name}</div>
      <div>
        CP: {cp[0]} - {cp[1]}
      </div>
    </Card>
  );
}
