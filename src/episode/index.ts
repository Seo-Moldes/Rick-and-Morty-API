const urlEpisodes = "https://rickandmortyapi.com/api/episode";

import { Episode, seasons } from "../interfaces.js";

const listSeasons: string[] = [];
const seasonsUl = document.getElementById("episodesList");
export const populateSeasons = async () => {
  try {
    const episodes = await fetchEpisodes();
    let episodeCounter = 0;
    //SHOW SEASONS
    seasons.forEach((season) => {
      let episodeRange: Episode[] = [];
      if (season.id === 1) {
        episodeRange = episodes.slice(0, 11);
        episodeCounter = 11;
      } else {
        // 10 MORE EPISODES
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
          containerMain?.replaceChildren(); 
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
                characterDiv.setAttribute("class", "col card mx-1");
                characterDiv.setAttribute("id", `character${characterData.id}`); 7
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

