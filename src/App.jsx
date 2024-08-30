import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/app.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/header/Header";
import RaidCalculator from "./components/raid/RaidCalculator";
import CurrentRaids from "./components/raid/CurrentRaids";
import MyPokemon from "./components/myPokemon/MyPokemon";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState({
    username: "",
    signedIn: false,
    list: [],
    mode: false, // light/dark mode, false is light mode
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<RaidCalculator user={user} setUser={setUser} />}
          />
          <Route
            path="/home"
            element={<RaidCalculator user={user} setUser={setUser} />}
          />
          <Route
            path="/myPokemon"
            element={<MyPokemon user={user} setUser={setUser} />}
          />
          <Route path="/explore" element={<div>explore</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
