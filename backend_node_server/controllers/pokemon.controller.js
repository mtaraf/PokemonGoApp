const Pokemon = require("../models/pokemon.model.js");

// const getUser = async (req, res) => {
//   try {
//     const { username, password } = req.params;
//     const user = await Users.findOne({
//       username: username,
//       password: password,
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const checkUsers = async (req, res) => {
//   try {
//     const { username } = req.params;
//     const user = await Users.findOne({
//       username: username,
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getPokemon = async (req, res) => {
  try {
    const mons = await Pokemon.find({});
    res.status(200).json(mons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postPokemon = async (req, res) => {
  try {
    await Pokemon.syncIndexes();
    const mon = await Pokemon.create(req.body);
    res.status(200).json(mon);
  } catch (error) {
    res.status(500).json({ message: error.message + req.body });
  }
};

module.exports = {
  getPokemon,
  postPokemon,
};
