const urlCharacter = "https://rickandmortyapi.com/api/character";
const urlEpisodes = "https://rickandmortyapi.com/api/episode";
import { Character, ResultCharacter } from "../interfaces.js";

export const getCharacters = async () => {

  try {
    const characterButton = document.getElementById("characterButton") as HTMLAnchorElement;
    const characters = await fetchCharacter();
    const totalPages = calTotalPages(characters.length);

    characterButton?.addEventListener("click", () =>
      showCharacters(characters, totalPages, 1),

    );

  } catch (error) {
    console.error("Error getting characters", error);
  }
};

const fetchCharacter = async (): Promise<Character[]> => {
  let allCharacters: ResultCharacter[] = [];
  let nextPageUrl = urlCharacter;

  while (nextPageUrl) {
    const res = await fetch(nextPageUrl);
    const data = await res.json();
    const characters: Character[] = data.results.map((characterData: any) => {
      return {
        id: characterData.id,
        name: characterData.name,
        episode: characterData.episode,
        gender: characterData.gender,
        status: characterData.status,
        species: characterData.species,
        image: characterData.image,
        location: characterData.location.name,
        origin: characterData.origin.name

      };

    });

    allCharacters = allCharacters.concat(characters as ResultCharacter[]);
    nextPageUrl = data.info.next;
  }
  return allCharacters as Character[];

};

const pagination = (totalPages: number, page: number, characters: Character[]) => {
  const containerCards = document.getElementById("containerCards");
  const containerP = document.createElement("div");
  containerP.setAttribute("id", "containerP");
  if (!containerP) return;

  containerP.innerHTML = "";
  containerCards?.appendChild(containerP);

  const paginationLi = document.createElement("ul");
  paginationLi.classList.add("pagination");
  containerP.appendChild(paginationLi);
  const prevPage = document.createElement("li");
  prevPage.classList.add("page-item");
  const linkPrevPage = document.createElement("button");
  linkPrevPage.setAttribute("id", "prevPageBtn");
  linkPrevPage.classList.add("page-link");
  linkPrevPage.textContent = "Previous";
  prevPage.appendChild(linkPrevPage);
  paginationLi.appendChild(prevPage);

  //PAGE NUMBER IN RANGE

  const initPage = Math.max(1, page - 2);

  const finalPage = Math.min(totalPages, page + 2);

  for (let i = initPage; i <= finalPage; i++) {
    const itPage = document.createElement("li");
    itPage.classList.add("page-item");
    const pageLink = document.createElement("button");
    pageLink.classList.add("page-link");
    pageLink.setAttribute("id", `page${i}`);
    pageLink.textContent = i.toString();
    itPage.appendChild(pageLink);
    paginationLi.appendChild(itPage);

    // ADD CLICK EVENT TO PAGE BUTTONS

    pageLink.addEventListener("click", () => {

      showCharacters(characters, totalPages, i);
    });

  }

  const pageNext = document.createElement("li");
  pageNext.classList.add("page-item");
  const pageNextLink = document.createElement("button");
  pageNextLink.setAttribute("id", "nextPageBtn");
  pageNextLink.classList.add("page-link");
  pageNextLink.textContent = "Next";
  pageNext.appendChild(pageNextLink);
  paginationLi.appendChild(pageNext);

  // ADD CLICK EVENT TO THE NEXT BUTTON

  pageNextLink.addEventListener("click", () => {
    if (page < totalPages) {
      showCharacters(characters, totalPages, page + 1);
    }
  });

  // ADD CLICK EVENT BUTTON

  linkPrevPage.addEventListener("click", () => {
    if (page > 1) {
      showCharacters(characters, totalPages, page - 1);
    }
  });

};

const calTotalPages = (totalCharacters: number) => {
  const charactersPerPage = 20;
  return Math.ceil(totalCharacters / charactersPerPage);
};

function showCharacters(characters: Character[], totalPages: number, page: number) {
  const containerCards = document.getElementById("containerCards");
  const currentPage = page;
  if (!containerCards) return;

  containerCards.innerHTML = "";
  const charactersPerPage = 20;
  const startIndex = (page - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const charactersShow = characters.slice(startIndex, endIndex);
  const containerCharacters = document.createElement("div");

  containerCharacters.setAttribute(
    "class",
    "row row-cols-1 row-cols-sm-4 row-cols-md-5 mx-1 g-3"
  );
  containerCards.appendChild(containerCharacters);

  //SHOW CHARACTERS
  charactersShow.forEach((character) => {
    const characterDiv = document.createElement("div");
    characterDiv.setAttribute("class", "col card mx-1 change-color-cards");
    characterDiv.setAttribute("id", `character${character.id}`);
    containerCharacters.appendChild(characterDiv);

    const characterImage = document.createElement("img");
    characterImage.setAttribute("src", character.image);
    characterDiv.appendChild(characterImage);

    const pName = document.createElement("p");
    pName.textContent = `Name: ${character.name}`;
    characterDiv.appendChild(pName);

    const pStatus = document.createElement("p");
    pStatus.textContent = `Status: ${character.status}`;
    characterDiv.appendChild(pStatus);

    const pSpecies = document.createElement("p");
    pSpecies.textContent = `Species: ${character.species}`;
    characterDiv.appendChild(pSpecies);

    const pGender = document.createElement("p");
    pGender.textContent = `Gender: ${character.gender}`;
    characterDiv.appendChild(pGender);

    const pOrigin = document.createElement("p");
    pOrigin.textContent = `Origin: ${character.origin}`;
    characterDiv.appendChild(pOrigin);

  });

  pagination(totalPages, page, characters);

};
