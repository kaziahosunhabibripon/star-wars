"use client";

import { useState, useTransition, useCallback } from "react";

import SearchBar from "./SearchBar";
import { Character } from "@/types";
import CharacterGrid from "./CharacterGrid";
import Pagination from "./Pagination";
import CharacterDetails from "./CharacterDetails";
import { usePagination } from "@/hooks/usePagination";

interface StarWarsCharacterClientProps {
  initialCharacters: Character[];
}

export default function StarWarsCharacterClient({
  initialCharacters,
}: StarWarsCharacterClientProps) {
  const [characters] = useState<Character[]>(initialCharacters);
  const [filteredCharacters, setFilteredCharacters] =
    useState<Character[]>(initialCharacters);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const itemsPerPage = 10;

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    paginationElements,
    setCurrentPage,
  } = usePagination(filteredCharacters, itemsPerPage);

  const handleSearchClick = useCallback(() => {
    startTransition(() => {
      if (searchQuery.trim() === "") {
        setFilteredCharacters(characters);
        setCurrentPage(1);
        setSearchQuery("");
        return;
      }

      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredCharacters(filtered);
      setCurrentPage(1);
      setSearchQuery("");
    });
  }, [characters, searchQuery, setCurrentPage]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="container mx-auto p-6 border border-gray-300 rounded bg-pink-50">
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        clearSearch={() => {
          setSearchQuery("");
          setFilteredCharacters(characters);
          setCurrentPage(1);
        }}
        onSearch={handleSearchClick}
      />
      <CharacterGrid
        isLoading={isLoading}
        error={error}
        currentPageCharacters={currentItems}
        searchQuery={searchQuery}
        setSelectedCharacter={setSelectedCharacter}
      />
      <Pagination
        isLoading={isLoading}
        filteredCharacters={filteredCharacters}
        goToPage={goToPage}
        currentPage={currentPage}
        paginationElements={paginationElements}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
      />
      {selectedCharacter && (
        <CharacterDetails
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
}
