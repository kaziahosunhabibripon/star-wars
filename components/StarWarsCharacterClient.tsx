"use client";

import { useMemo, useState, useTransition, useCallback } from "react";

import SearchBar from "./SearchBar";
import { Character } from "@/types";

import CharacterGrid from "./CharacterGrid";
import Pagination from "./Pagination";
import CharacterDetails from "./CharacterDetails";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialCharacters.length / 10)
  );
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

  const handleSearchClick = useCallback(() => {
    startTransition(() => {
      if (searchQuery.trim() === "") {
        setFilteredCharacters(characters);
        setTotalPages(Math.ceil(characters.length / itemsPerPage));
        setCurrentPage(1);
        return;
      }

      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredCharacters(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setCurrentPage(1);
    });
  }, [characters, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const currentPageCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCharacters.slice(startIndex, endIndex);
  }, [filteredCharacters, currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const paginationElements = useMemo(() => {
    const pages = [];

    pages.push(
      <button key={1} onClick={() => goToPage(1)} className="w-8 h-8 p-0">
        1
      </button>
    );

    if (currentPage > 3) {
      pages.push(<span key="ellipsis1">...</span>);
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;
      pages.push(
        <button key={i} onClick={() => goToPage(i)} className="w-8 h-8 p-0">
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis2">...</span>);
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="w-8 h-8 p-0"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  }, [currentPage, totalPages, goToPage]);

  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded bg-white">
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        clearSearch={() => {
          setSearchQuery("");
          setFilteredCharacters(characters);
          setCurrentPage(1);
          setTotalPages(Math.ceil(characters.length / itemsPerPage));
        }}
        onSearch={handleSearchClick}
      />
      <CharacterGrid
        isLoading={isLoading}
        error={error}
        currentPageCharacters={currentPageCharacters}
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
