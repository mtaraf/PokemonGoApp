const mongoose = require("mongoose");

const UserPokemonListSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    list: [
      {
        name: {
          type: String,
        },
        cp: {
          type: String,
        },
        candy: {
          type: String,
        },
        fastMove: {
          type: Object,
        },
        chargedMove: {
          type: Object,
        },
        attack: {
          type: String,
        },
        defense: {
          type: String,
        },
        hp: {
          type: String,
        },
        shiny: {
          type: Boolean,
        },
        shadow: {
          type: Boolean,
        },
        image: {
          type: String,
        },
        types: [],
      },
    ],
  },
  {
    timestamps: true, // CreatedAt and UpdatedAt
  }
);

const UserPokemonList = mongoose.model(
  "UserPokemonList",
  UserPokemonListSchema
);

module.exports = UserPokemonList;
