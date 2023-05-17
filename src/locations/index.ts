const urlLocations = "https://rickandmortyapi.com/api/location";
import { Location, LocationResponse } from "../interfaces.js";

const urlCharacter = "https://rickandmortyapi.com/api/character";
const urlEpisodes = "https://rickandmortyapi.com/api/episode";

export const getLocation = async () => {
  const locationButton = document.getElementById("locationButton") as HTMLAnchorElement;

  locationButton?.addEventListener("click", showLocations);

  try {
    const location = await fetchLocation();

  } catch (error) {
    console.error("Error getting location", error);
  }
};

const fetchLocation = async (): Promise<Location[]> => {
  let allLocations: Location[] = [];
  let nextPageUrl: string | null = urlLocations;

  while (nextPageUrl) {
    const res = await fetch(nextPageUrl);
    const data: LocationResponse = await res.json();
    const locations: Location[] = data.results;
    allLocations = allLocations.concat(locations);
    nextPageUrl = data.info.next;
  }
  return allLocations;
};

export async function showLocations() {
  console.log("prueba");
  const location = await fetchLocation();
  const containerCards = document.getElementById("containerCards") as HTMLElement;
  if (!containerCards) return;

  containerCards.innerHTML = "";

  const divContainerLocation = document.createElement("div");
  divContainerLocation.setAttribute(
    "class",
    "g-3 overflow-auto divLocation"
  );
  divContainerLocation.style.maxHeight = "800px";
  containerCards.appendChild(divContainerLocation);
  const ulListOfLocations = document.createElement("ul");
  ulListOfLocations.classList.add("list-group");
  divContainerLocation.appendChild(ulListOfLocations);

  location.forEach((location) => {
    const listLocation = document.createElement("li");
    listLocation.setAttribute("class", "list-group-item");
    const linkLocation = document.createElement("a");
    linkLocation.setAttribute("class", "link-item");
    linkLocation.textContent = location.name;
    linkLocation.addEventListener("click", () => showLocation(location));
    listLocation.appendChild(linkLocation);
    ulListOfLocations.appendChild(listLocation);
  });
}

function showLocation(location: Location) {
  const cardLocation = document.querySelector("#containerCards") as HTMLElement;
  cardLocation.replaceChildren();
  const divLocation = document.createElement("div");
  divLocation.classList.add("div-location");
  cardLocation.appendChild(divLocation);
  const h2Location = document.createElement("h2");
  h2Location.classList.add("h2-location");
  h2Location.setAttribute("class", "text-white");
  h2Location.textContent = location.name;
  cardLocation.appendChild(h2Location);
  const pLocation = document.createElement("p");
  pLocation.setAttribute("class", "text-white");
  pLocation.classList.add("p-location");
  pLocation.textContent = `Location: ${location.type}, ${location.dimension}`;
  cardLocation.appendChild(pLocation);

  const divResident = document.createElement("div");
  divResident.setAttribute("class", "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5");
  cardLocation.appendChild(divResident);
  const residentPromise = location.residents.map((urlCharacter) => {

    return fetch(urlCharacter)
    .then((response) => response.json())
    .catch((error) => {
      console.error("error geting residents data:", error)
    })

  })

  Promise.all(residentPromise)
  .then((arrayCharacter) => {
    arrayCharacter.forEach((character) => {
      const divCharacter = document.createElement("div");
      divCharacter.setAttribute("class", "col");
      divResident.appendChild(divCharacter);
      const residentImage = document.createElement("img");
      residentImage.setAttribute("src", character.image);
      divCharacter.appendChild(residentImage);

      const residentName = document.createElement("h3");
      residentName.setAttribute("class", "text-white");
      residentName.textContent = `Name: ${character.name}`;
      const residentStatus = document.createElement("p");
      residentStatus.setAttribute("class", "text-white");
      residentStatus.textContent = `Status: ${character.status}`;
      divCharacter.appendChild(residentStatus);
      const residentSpecies = document.createElement("p");
      residentSpecies.setAttribute("class", "text-white");
      residentSpecies.textContent = `Species: ${character.species}`;
      divCharacter.appendChild(residentSpecies);







    });
  })
  .catch((error) => {
    console.error("error obteniendo datos de los residentes:", error);
  });

  

}



