import { Button, Card, Form, Modal } from "react-bootstrap";
import styles from "../../css/raid/raidPokemonSelector.module.css";
import { useState } from "react";
import RaidDisplay from "./RaidDisplay";
import retry from "../../assets/retry.png";

export default function RaidPokemonSelector({
  raidList,
  setRaidSelected,
  user,
}) {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const displaySelectedRaid = (e) => {
    // Get Selected Raid
    const selectData = e.target.form[0].value;
    const pokemonName = selectData.substring(1, selectData.length);
    const raidLevel = selectData.substring(0, 1);

    var data = {};

    // Find Raid Data
    if (raidLevel === "1") {
      data = raidList.lvl1.find((item) => item.names.English === pokemonName);
    } else if (raidLevel === "3") {
      data = raidList.lvl3.find((item) => item.names.English === pokemonName);
    } else if (raidLevel === "5") {
      data = raidList.lvl5.find((item) => item.names.English === pokemonName);
    } else if (raidLevel === "9") {
      data = raidList.mega.find((item) => item.names.English === pokemonName);
    }

    setDisplayData(data);
    console.log(data);

    handleClose();
    setDisplay(true);
    setRaidSelected(true);
  };

  return (
    <>
      <Card
        className={
          user.mode ? styles.containerDarkMode : styles.containerLightMode
        }
      >
        {display ? (
          <div>
            <RaidDisplay
              name={displayData.names.English}
              cp={displayData.cpRange}
              image={displayData.assets.image}
              types={displayData.types}
              user={user}
            />
            <Button
              className={styles.retryButton}
              onClick={() => {
                setShow(true);
              }}
            >
              <img src={retry} className={styles.retryImage} />
            </Button>
          </div>
        ) : (
          <Button
            className={
              user.mode ? styles.buttonDarkMode : styles.buttonLightMode
            }
            onClick={() => handleOpen()}
          >
            +
          </Button>
        )}
      </Card>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton className={styles.modalTitle}>
          Raid Selector
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label className={styles.modalLabel}>Select Raid</Form.Label>
            <Form.Select className={styles.modalSelect}>
              {raidList?.lvl1.map((raid, index) => (
                <option key={index} value={"1" + raid.names.English}>
                  {raid.names.English}
                </option>
              ))}
              {raidList?.lvl3.map((raid, index) => (
                <option key={index} value={"3" + raid.names.English}>
                  {raid.names.English}
                </option>
              ))}
              {raidList?.lvl5.map((raid, index) => (
                <option key={index} value={"5" + raid.names.English}>
                  {raid.names.English}
                </option>
              ))}
              {raidList?.mega.map((raid, index) => (
                <option key={index} value={"9" + raid.names.English}>
                  {raid.names.English}
                </option>
              ))}
            </Form.Select>
            <Button
              className={styles.submitButton}
              onClick={(e) => displaySelectedRaid(e)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
