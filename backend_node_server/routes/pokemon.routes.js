const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemon.controller.js");

// Get Requests
router.get("/", pokemonController.getPokemon);

// Post Requests
router.post("/", pokemonController.postPokemon);

module.exports = router;
