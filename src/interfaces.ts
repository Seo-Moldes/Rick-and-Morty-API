export interface Season {
    id: number;
    name: string;
    episodes: Episode[];
  }
  
 export const seasons: Season[] = [
    { id: 1, name: "Season 1", episodes: [] },
    { id: 2, name: "Season 2", episodes: [] },
    { id: 3, name: "Season 3", episodes: [] },
    { id: 4, name: "Season 4", episodes: [] },
    { id: 5, name: "Season 5", episodes: [] }
    
  ];
  
export  interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
  }

  export interface RootObject {
    info: Info;
    results: Result[];
  }
  
  export interface Info {
    count: number;
    next: string;
    pages: number;
    prev: null;
  }
  
  export interface Result {
    created: Date;
    episode: string[];
    gender: Gender;
    id: number;
    image: string;
    location: Location;
    name: string;
    origin: Location;
    species: Species;
    status: Status;
    type: string;
    url: string;
  }
  
  export enum Gender {
    Female = "Female",
    Male = "Male",
    Unknown = "unknown",
  }
  
  export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
  }
  
  export interface LocationResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Location[];
  }

  
  export enum Species {
    Alien = "Alien",
    Human = "Human",
  }
  
  export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
  }
  export interface ResultCharacter {
  created: Date;
  episode: string[];
  gender: Gender;
  id: number;
  image: string;
  location: Location;
  name: string;
  origin: Location;
  species: Species;
  status: Status;
  type: string;
  url: string;
}
export interface Character {
    id: number;
    name: string;
    status: 'Dead' | 'Alive' | 'unknown'
    species: string
    type: string
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
    origin: CharacterLocation
    location: CharacterLocation
    image: string
    episode: string[]
  }
  export interface CharacterLocation {
    name: string
    url: string
  }