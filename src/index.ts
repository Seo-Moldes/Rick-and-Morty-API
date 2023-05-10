const urlApi = "https://rickandmortyapi.com/api";

fetch(urlApi)
    .then((response) => response.json())
    .then((data) => { 
    
      console.log(data);
    
    })