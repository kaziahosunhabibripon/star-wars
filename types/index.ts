import { ReactElement } from "react";

export interface Character {
  id: number;
  name: string;
  height: number;
  mass: number | string;
  gender: string;
  homeworld: string;
  wiki: string;
  image: string;
  born: number | string;
  bornLocation: string;
  died: number | string;
  diedLocation: string;
  species: string;
  hairColor: string;
  eyeColor: string;
  skinColor: string;
  cybernetics: string;
  affiliations: string[];
  masters: string[];
  apprentices: string[];
  formerAffiliations: string[];
}
export interface CharacterGridProps {
  isLoading: boolean;
  error: string | null;
  currentPageCharacters: Character[];
  searchQuery: string;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
}

export type PaginationProps = {
  isLoading: boolean;
  filteredCharacters: Character[];
  goToPage: (page: number) => void;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  paginationElements: React.ReactNode[];
};
export interface SearchBarProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  onSearch: () => void;
}

export interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  goToPage: (page: number) => void;
  paginationElements: ReactElement[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
export interface CharacterDetailsProps {
  character: Character;
  onClose: () => void;
}
