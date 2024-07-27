const express = require("express");
const app = express();
const mongoose = require("mongoose");
const usersRouter = require("./routes/users.routes.js");
const pokemonRouter = require("./routes/pokemon.routes.js");
const userPokemonListRouter = require("./routes/userPokemonList.routes.js");

// middle-ware
app.use(express.json());
app.use(function (req, res, next) {
  express.json();

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

app.use("/api/users", usersRouter);
app.use("/api/pokemon", pokemonRouter);
app.use("/api/userPokemonList", userPokemonListRouter);

mongoose
  .connect(
    "mongodb+srv://marcostaraf:Mt11499!@pokemongocluster.ueic2py.mongodb.net/Poke-API?retryWrites=true&w=majority&appName=pokemonGoCluster"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(5000, () => console.log("Listening on port 5000"));
  })
  .catch(() => console.log("Connection Failed"));
