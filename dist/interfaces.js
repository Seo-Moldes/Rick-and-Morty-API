export const seasons = [
    { id: 1, name: "Season 1", episodes: [] },
    { id: 2, name: "Season 2", episodes: [] },
    { id: 3, name: "Season 3", episodes: [] },
    { id: 4, name: "Season 4", episodes: [] },
    { id: 5, name: "Season 5", episodes: [] }
];
export var Gender;
(function (Gender) {
    Gender["Female"] = "Female";
    Gender["Male"] = "Male";
    Gender["Unknown"] = "unknown";
})(Gender || (Gender = {}));
export var Species;
(function (Species) {
    Species["Alien"] = "Alien";
    Species["Human"] = "Human";
})(Species || (Species = {}));
export var Status;
(function (Status) {
    Status["Alive"] = "Alive";
    Status["Dead"] = "Dead";
    Status["Unknown"] = "unknown";
})(Status || (Status = {}));
