import { Card, Dropdown, Form } from "react-bootstrap";
import styles from "../../css/header/userDropDown.module.css";
import defaultPic from "../../assets/user.png";
import { useEffect, useState } from "react";

export default function UserDropDown({ user, setUser }) {
  const [currentMode, setCurrentMode] = useState(false);

  useEffect(() => {
    setCurrentMode(user.mode);
  }, [user.mode]);

  // Update user light/dark mode
  const updateUserMode = () => {
    const newUserObj = {
      username: user.username,
      signedIn: user.signedIn,
      list: user.list,
      mode: !currentMode,
    };
    setUser(newUserObj);
    console.log(newUserObj.mode);
  };

  // Api to update user data

  return (
    <Dropdown className={styles.dropDown}>
      <Dropdown.Toggle className={styles.dropDownToggle}></Dropdown.Toggle>
      <Dropdown.Menu className={styles.dropDownMenu}>
        <Card className={styles.card}>
          <div>
            <img src={defaultPic} />
            {user.username}
          </div>
          <hr />
          <div>
            <Form.Check
              label="Dark Mode"
              type="switch"
              id="darkModeSwitch"
              className={styles.darkModeSwitch}
              checked={currentMode}
              onChange={() => updateUserMode()}
            />
          </div>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
}
