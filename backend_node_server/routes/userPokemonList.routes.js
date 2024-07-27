const express = require("express");
const router = express.Router();
const userPokemonListController = require("../controllers/userPokemonList.controller.js");

// Get Requests
router.get("/", userPokemonListController.getAllLists);
router.get("/:username", userPokemonListController.getUserList);

// Post Requests
router.post("/", userPokemonListController.postList);

// Update Requests
router.put("/:username", userPokemonListController.updateList);

module.exports = router;
