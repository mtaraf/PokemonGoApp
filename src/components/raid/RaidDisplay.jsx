import { Card } from "react-bootstrap";
import styles from "../../css/raid/raidDisplay.module.css";

export default function RaidDisplay({ title, image, cp }) {
  return (
    <Card className={styles.container}>
      <div>Stars</div>
      <div className={styles.imageContainer}>
        <img src={image} className={styles.image} />
      </div>
      <div className={styles.title}>{title}</div>
      <div>{cp}</div>
    </Card>
  );
}
