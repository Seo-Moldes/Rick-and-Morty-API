import { populateSeasons } from "./episode/index.js";
import { getCharacters } from "./characters/index.js";
import { getLocation } from "./locations/index.js";
const urlApi = "https://rickandmortyapi.com/api";
const urlCharacter = "https://rickandmortyapi.com/api/character";
const urlLocations = "https://rickandmortyapi.com/api/location";
const urlEpisodes = "https://rickandmortyapi.com/api/episode";
const episodesList = document.getElementById("episodesList");
const loadEpisodesButton = document.getElementById("loadEpisodesButton");
window.onload = function () {
    populateSeasons();
    getCharacters();
    getLocation();
};
