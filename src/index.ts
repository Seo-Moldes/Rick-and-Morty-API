import { populateSeasons } from "./episode/index.js";

const urlApi = "https://rickandmortyapi.com/api";
const urlCharacter = "https://rickandmortyapi.com/api/character";
const urlLocations = "https://rickandmortyapi.com/api/location";
const urlEpisodes = "https://rickandmortyapi.com/api/episode";
const episodesList = document.getElementById("episodesList");
const loadEpisodesButton = document.getElementById("loadEpisodesButton");

window.onload = function() {
  populateSeasons();
}


// const getEpisodes = async (): Promise<Episode[]> => {
//   let allEpisodes: Episode[] = [];
//   let nextPageUrl = urlEpisodes;

//   while (nextPageUrl) {
//     const res = await fetch(nextPageUrl);
//     const data = await res.json();
//     const episodes: Episode[] = data.results.map((episodeData: any) => {
//       return {
//         id: episodeData.id,
//         name: episodeData.name,
//         air_date: episodeData.air_date,
//         episode: episodeData.episode,
//         characters: episodeData.characters,
//         url: episodeData.url,
//         created: episodeData.created
//       };
//     });
//     allEpisodes = allEpisodes.concat(episodes);
//     nextPageUrl = data.info.next;
//   }
//   return allEpisodes;
// };

// interface Episode {
//   id: number;
//   name: string;
//   air_date: string;
//   episode: string;
//   characters: string[];
//   url: string;
//   created: string;
// }

// fetch(urlEpisodes)
//   .then((response) => response.json())
//   .then(async (data) => {
//     const episodes = await getEpisodes();
//     const initialEpisodes = episodes.slice(0, 10); // Obtener los primeros 10 episodios
//     initialEpisodes.forEach((episode) => {
//       const liEpisodes = document.createElement("li");
//       liEpisodes.setAttribute("class", "nav-item");
//       episodesList?.appendChild(liEpisodes);
//       const aEpisodes = document.createElement("button");
//       aEpisodes.setAttribute("id", `episode${episode.id}`);
//       aEpisodes.setAttribute("class", "nav-link link-body-emphasis");
//       liEpisodes.appendChild(aEpisodes);
//       aEpisodes.textContent = `Episode ${episode.id}`;
//       console.log(episode.id);
//     });
//     loadEpisodesButton?.addEventListener("click", () => {
//       const remainingEpisodes = episodes.slice(10); // Obtener los episodios restantes
//       remainingEpisodes.forEach((episode) => {
//         const liEpisodes = document.createElement("li");
//         episodesList?.appendChild(liEpisodes);
//         const aEpisodes = document.querySelector(`#episode${episode.id}`);
//         if(aEpisodes) {
//           aEpisodes.setAttribute("id", "linkEpisodes");
//           aEpisodes.classList.add("pointer-cursor");
//           aEpisodes.setAttribute("class", "nav-link link-body-emphasis");
//           liEpisodes.appendChild(aEpisodes);
//           aEpisodes.textContent = `Episode ${episode.id}`;
//           console.log(episode.id);
//           aEpisodes.addEventListener("click", () => {
//             const containerMain = document.getElementById("containerMain");
//             console.log("funciona");
//             containerMain?.replaceChildren(); // Eliminar todos los hijos de containerMain
//             const episodeDiv = document.createElement("div");
//             episodeDiv.setAttribute("class", "row mb-4 text center");
//             const titleDiv = document.createElement("div");
//             titleDiv.setAttribute(
//               "class",
//               "col align-items-center justify-center text center"
//             );
//             episodeDiv.appendChild(titleDiv);
//             const h2Title = document.createElement("h2");
//             h2Title.textContent = ` ${episode.name}`;
//             titleDiv.appendChild(h2Title);
//             const h3Details = document.createElement("h3");
//             h3Details.textContent = `${episode.air_date} | Episode:${episode.episode}`;
//             titleDiv.appendChild(h3Details);
//             const divContainerCharacters = document.createElement("div");
//             divContainerCharacters.setAttribute(
//               "class",
//               "row row-cols-1 row-cols-sm-4 row-cols-md-5 mx-1 g-3"
//             );
//             episodeDiv.appendChild(divContainerCharacters);
//             const characterPromises = (episode.characters || []).map(
//               (characterURL) => {
//                 return fetch(characterURL)
//                   .then((response) => response.json())
//                   .catch((error) => {
//                     console.error("Error fetching character data:", error);
//                   });
//               });
//         });
//       }});
    

//       loadEpisodesButton?.remove(); // Eliminar el botón "Load Episodes" después de cargar todos los episodios

//       // Agregar barra de desplazamiento
//       episodesList?.setAttribute("class", "overflow-auto");
//     });

//   });




  // function getEpisodesContainerMain() {

  //   fetch(urlEpisodes)
  //     .then((response) => response.json())
  //     .then((data) => {
  
  
  //       data.results.forEach((episode: any) => {
  //         const containerCards = document.querySelector("#containerCards");
          
  //         const aEpisodes = document.querySelector("#linkEpisodes");
  //         console.log("funciona");
  //         containerCards?.replaceChildren();
  //         const containerDiv = document.createElement("div");
  //         containerDiv.setAttribute("class", "container row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3");
  //         containerCards?.appendChild(containerDiv);
  //         const tittleh2 = document.createElement("h2");
  //         tittleh2.textContent = episode.id;
  //         containerDiv.appendChild(tittleh2);
  //         const paragraph = document.createElement("p");
  //         paragraph.textContent = `${episode.air_date} | ${episode.episode}`;
  //         containerCards?.appendChild(paragraph);
  //         console.log("funciona");
  
  //       })
  
  //     }
  //     )
  // }
  
  
 
  // function getEpisodesContainerMain() {
  //   fetch(urlEpisodes)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       data.results.forEach((episode: any) => {
  //         const aEpisodes = document.querySelector("#linkEpisodes");
  //         aEpisodes?.addEventListener("click", () => {
  //           const divRect = document.querySelector("#divRect");
  //           while (divRect?.firstChild) {
  //             divRect?.removeChild(divRect.firstChild);
  //           }
  //           const episodeInfo = document.createElement("div");
  //           episodeInfo.textContent = JSON.stringify(episode);
  //           divRect?.appendChild(episodeInfo);
  //         });
  //       });
  //     });
  // }
  
  
