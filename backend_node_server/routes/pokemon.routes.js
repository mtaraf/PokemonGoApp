const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemon.controller.js");

// Get Requests
router.get("/", pokemonController.getPokemon);
router.get("/:name", pokemonController.getSpecificPokemon);

// Post Requests
router.post("/", pokemonController.postPokemon);

// Update Requests
router.put("/:name", pokemonController.updatePokemon);

module.exports = router;
