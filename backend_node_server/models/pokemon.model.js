const mongoose = require("mongoose");

const PokemonSchema = mongoose.Schema(
  {
    form: {
      type: String,
    },

    pokemon_name: {
      type: String,
      unique: true,
    },

    pokemon_id: {
      type: Number,
    },

    image: {
      type: String,
    },

    type: [],

    charged_moves: [],

    fast_moves: [],

    base_attack: {
      type: Number,
    },

    base_defense: {
      type: Number,
    },
  },
  {
    timestamps: true, // CreatedAt and UpdatedAt
  }
);

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

module.exports = Pokemon;
