// Internal API for pokemon data
// TO-DO: Put this in ENV file
const POKEMON_API_URL = "http://localhost:5000/api/pokemon";
const USER_POKEMON_LIST_URL = "http://localhost:5000/api/userPokemonList";

/*
    API to gather specific pokemon data
    Parameters: name of specific pokemon (String)
    return: json data of the specific pokemon
*/
export const getSpecificPokemon = async (name) => {
  try {
    const response = await fetch(`${POKEMON_API_URL}/${name}`);
    const data = await response.json();

    if (data !== null) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.log("Error obtaining specific pokemon data: " + error);
    return null;
  }
};

/*
    API to gather all pokemon names from internal api
    Parameters: none
    return: json data of pokemon
*/
export const getPokemonApiData = async () => {
  try {
    const response = await fetch(POKEMON_API_URL);
    const data = await response.json();

    // If user exists, login user
    if (data !== null && response.status === 200) {
      console.log("Data Received");
      return data;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

/*
    API to update user pokemon list
    Parameters: updatedList (array of pokemon obj), user (obj)
    return: none
*/
export const updateList = async (updatedList, user) => {
  const listObj = {
    username: user.username,
    list: updatedList,
  };

  try {
    const response = await fetch(`${USER_POKEMON_LIST_URL}/${user.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listObj),
    });

    const data = await response.json();

    console.log(JSON.stringify(listObj));
    console.log(user.username);
  } catch {
    console.log("Error updating list when adding pokemon: " + error);
  }
};
