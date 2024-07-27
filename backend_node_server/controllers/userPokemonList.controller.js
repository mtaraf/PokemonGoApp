const UserPokemonList = require("../models/userPokemonList.model.js");

const getAllLists = async (req, res) => {
  try {
    const mons = await UserPokemonList.find({});
    res.status(200).json(mons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserList = async (req, res) => {
  try {
    const { username } = req.params;
    const mons = await UserPokemonList.find({
      username: username,
    });
    res.status(200).json(mons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postList = async (req, res) => {
  try {
    await UserPokemonList.syncIndexes();
    const mon = await UserPokemonList.create(req.body);
    res.status(200).json(mon);
  } catch (error) {
    res.status(500).json({ message: error.message + req.body });
  }
};

const updateList = async (req, res) => {
  try {
    const { username } = req.params;
    await UserPokemonList.syncIndexes();
    const list = await UserPokemonList.findOneAndUpdate(
      { username: username },
      req.body
    );

    res.status(200).json(list);
  } catch (error) {
    console.log({ message: error.message + req.body });
  }
};

module.exports = {
  getAllLists,
  getUserList,
  postList,
  updateList,
};
