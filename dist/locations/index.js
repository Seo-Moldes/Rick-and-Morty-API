var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlLocations = "https://rickandmortyapi.com/api/location";
const urlCharacter = "https://rickandmortyapi.com/api/character";
const urlEpisodes = "https://rickandmortyapi.com/api/episode";
export const getLocation = () => __awaiter(void 0, void 0, void 0, function* () {
    const locationButton = document.getElementById("locationButton");
    locationButton === null || locationButton === void 0 ? void 0 : locationButton.addEventListener("click", showLocations);
    try {
        const location = yield fetchLocation();
    }
    catch (error) {
        console.error("Error getting location", error);
    }
});
const fetchLocation = () => __awaiter(void 0, void 0, void 0, function* () {
    let allLocations = [];
    let nextPageUrl = urlLocations;
    while (nextPageUrl) {
        const res = yield fetch(nextPageUrl);
        const data = yield res.json();
        const locations = data.results;
        allLocations = allLocations.concat(locations);
        nextPageUrl = data.info.next;
    }
    return allLocations;
});
export function showLocations() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("prueba");
        const location = yield fetchLocation();
        const containerCards = document.getElementById("containerCards");
        if (!containerCards)
            return;
        containerCards.innerHTML = "";
        const divContainerLocation = document.createElement("div");
        divContainerLocation.setAttribute("class", "g-3 overflow-auto divLocation");
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
    });
}
function showLocation(location) {
    const cardLocation = document.querySelector("#containerCards");
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
            console.error("error geting residents data:", error);
        });
    });
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
