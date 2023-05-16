const urlEpisodes = "https://rickandmortyapi.com/api/episode";

import { Episode, seasons, Season } from "../interfaces.js";

const listSeasons: string[] = [];
const seasonsUl = document.getElementById("episodesList");
export const populateSeasons = async () => {
    try {
      const episodes = await fetchEpisodes();
      let episodeCounter = 0;
  
      seasons.forEach((season) => {
        let episodeRange: Episode[] = [];
        if (season.id === 1) {
          // First season with 11 episodes
          episodeRange = episodes.slice(0, 11);
          episodeCounter = 11; // Actualizamos el contador de episodios
        }  else {
          // Other seasons with 10 episodes
          episodeRange = episodes.slice(episodeCounter, episodeCounter + 10);
          episodeCounter += 10;
        }
      
  
        const seasonLi = document.createElement("li");
        seasonLi.setAttribute("class", "nav-item pe-auto");
        seasonsUl?.appendChild(seasonLi);
  
        const dropD = document.createElement("div");
        dropD.setAttribute("class", "dropdown");
        seasonLi.appendChild(dropD);
  
        const link = document.createElement("button");
        link.setAttribute(
          "class",
          "nav-link pe-auto d-flex align-items-center text-white text-decoration-none dropdown-toggle gap-2"
        );
        
        link.setAttribute("data-bs-toggle", "dropdown");
        link.setAttribute("aria-expanded", "false");
        dropD.appendChild(link);
        const strong = document.createElement("strong");
        strong.textContent = season.name;
        link.appendChild(strong);
        strong.classList.add("color-strong");
        const listEpisodes = document.createElement("ul");
        listEpisodes.setAttribute(
          "class",
          "dropdown-menu dropdown-menu-dark text-small shadow menuList"
        );
        listEpisodes.setAttribute("id", `episodesList-${season.id}`);
        dropD.appendChild(listEpisodes);
        episodeRange.forEach((episode) => {
         
          const episodeLi = document.createElement("li");
          episodeLi.setAttribute("class", "dropdown-item");
          episodeLi.setAttribute("data-elementnumber", episode.id.toString());
          listEpisodes.appendChild(episodeLi);
          const episodeLink = document.createElement("a");
          episodeLink.setAttribute("class", "dropdown-item ");
          episodeLink.setAttribute("type", "button");
          episodeLink.setAttribute("data-elementnumber", episode.id.toString());
          episodeLink.textContent = `Episode: ${episode.id}, ${episode.name}`;
          episodeLi.appendChild(episodeLink);
  
          episodeLink.addEventListener("click", () => {
            const containerMain = document.getElementById("containerCards");
            containerMain?.replaceChildren(); // Eliminar todos los hijos de containerMain
            const episodeDiv = document.createElement("div");
            episodeDiv.setAttribute("class", "row mb-4 text center");
            const titleDiv = document.createElement("div");
            titleDiv.setAttribute(
              "class",
              "col align-items-center justify-center text center"
            );
            episodeDiv.appendChild(titleDiv);
            const h2 = document.createElement("h2");
            h2.textContent = ` ${episode.name}`;
            titleDiv.appendChild(h2);
            h2.classList.add("change-color");
            const h3 = document.createElement("h3");
            h3.classList.add("change-color");
            h3.textContent = `${episode.air_date} | Episode: ${episode.episode}`;
            titleDiv.appendChild(h3);
            const divCharacters = document.createElement("div");
            divCharacters.setAttribute(
              "class",
              "row row-cols-1 row-cols-sm-4 row-cols-md-5 mx-1 g-3"
            );
            episodeDiv.appendChild(divCharacters);
            const cPromises = (episode.characters || []).map(
              (characterURL) => {
                return fetch(characterURL)
                  .then((response) => response.json())
                  .catch((error) => {
                    console.error("Error fetching character data:", error);
                  });
              }
            );
  
            Promise.all(cPromises)
              .then((characterDataArray) => {
                characterDataArray.forEach((characterData) => {
                  const characterDiv = document.createElement("div");
                  characterDiv.setAttribute("class", "col card mx-1" );
                  characterDiv.setAttribute("id", `character${characterData.id}`);7
                  characterDiv.classList.add("change-color-cards");
  
                  const characterImg = document.createElement("img");
                  characterImg.setAttribute("src", characterData.image);
                  characterDiv.appendChild(characterImg);
  
                  const paragraftName = document.createElement("p");
                  paragraftName.textContent = `Name: ${characterData.name}`;
                  characterDiv.appendChild(paragraftName);
  
                  const paragraftStatus = document.createElement("p");
                  paragraftStatus.textContent = `Status: ${characterData.status}`;
                  characterDiv.appendChild(paragraftStatus);
  
                  const paragraftSpecies = document.createElement("p");
                  paragraftSpecies.textContent = `Species: ${characterData.species}`;
                  characterDiv.appendChild(paragraftSpecies);
  
                  divCharacters.appendChild(characterDiv);
                  characterDiv.addEventListener("click", () =>
                    showCharacter(characterData.id)
                    
                  );
              
                });
              })
              .catch((error) => {
                console.error("Error fetching character data:", error);
              });
  
            containerMain?.appendChild(episodeDiv);
          });
        });
      });
    } catch (error) {
      console.error("Error getting the episodes", error);
    }
  };

  const fetchEpisodes = async (): Promise<Episode[]> => {
    let allEpisodes: Episode[] = [];
    let nextPageUrl = urlEpisodes;
  
    while (nextPageUrl) {
      const res = await fetch(nextPageUrl);
      const data = await res.json();
      const episodes: Episode[] = data.results.map((episodeData: any) => {
        return {
          id: episodeData.id,
          name: episodeData.name,
          air_date: episodeData.air_date,
          episode: episodeData.episode,
          characters: episodeData.characters,
        };
      });
      allEpisodes = allEpisodes.concat(episodes);
      nextPageUrl = data.info.next;
    }
    return allEpisodes;
  };

  async function showCharacter(characterData: {
    image: string;
    name: string;
    status: string;
    species: string;
    episode: string[];
  }) {
    // Crear un contenedor para mostrar los detalles del personaje
    const cDetailsContainer = document.createElement("div");
    cDetailsContainer.setAttribute("class", "character-details");
  
    // Mostrar la imagen del personaje
    const characterImage = document.createElement("img");
    characterImage.setAttribute("src", characterData.image);
    cDetailsContainer.appendChild(characterImage);
  
    // Mostrar el nombre del personaje
    const paragraftName = document.createElement("p");
    paragraftName.textContent = `Name: ${characterData.name}`;
    cDetailsContainer.appendChild(paragraftName);
  
    // Mostrar el estado del personaje
    const paragraftStatus = document.createElement("p");
    paragraftStatus.textContent = `Status: ${characterData.status}`;
    cDetailsContainer.appendChild(paragraftStatus);
  
    // Mostrar la especie del personaje
    const paragraftSpecies = document.createElement("p");
    paragraftSpecies.textContent = `Species: ${characterData.species}`;
    cDetailsContainer.appendChild(paragraftSpecies);
  
    // Obtener los episodios del personaje
    try {
      const episodePromise = characterData.episode.map((urlEpisodes: string) =>
        fetch(urlEpisodes).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch episode data");
          }
          return response.json();
        })
      );
  
      const episodes = await Promise.all(episodePromise);
  
      // Mostrar los episodios en los que aparece el personaje
      const episodeLi = document.createElement("ul");
      episodes.forEach((episode) => {
        const episodeIt = document.createElement("li");
        episodeIt.textContent = episode.name;
        episodeLi.appendChild(episodeIt);
      });
      cDetailsContainer.appendChild(episodeLi);
  
      // Mostrar los detalles en el DOM
    } catch (error) {
      console.error("Error fetching episode data:", error);
    }
  }
  