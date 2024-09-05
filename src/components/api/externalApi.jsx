// Internal API for pokemon data
// TO-DO: Put this in ENV file
const EXTERNAL_FAST_MOVES_API = "https://pogoapi.net/api/v1/fast_moves.json";
const EXTERNAL_CHARGED_MOVES_API =
  "https://pogoapi.net/api/v1/charged_moves.json";

/*
    External API to GET fast_moves
    Parameters: none
    return: json data of fast moves
*/
export const getFastMoves = async () => {
  try {
    const response = await fetch(EXTERNAL_FAST_MOVES_API);
    const data = await response.json();

    if (data !== null && data !== undefined) {
      return data;
    }
    return null;
  } catch (error) {
    console.log("Error obtaining fast moves data: " + error);
    return null;
  }
};

/*
    External API to GET charged_moves
    Parameters: none
    return: json data of charged moves
*/
export const getChargedMoves = async () => {
  try {
    const response = await fetch(EXTERNAL_CHARGED_MOVES_API);
    const data = await response.json();

    if (data !== null && data !== undefined) {
      return data;
    }
    return null;
  } catch (error) {
    console.log("Error obtaining charged moves data: " + error);
    return null;
  }
};
