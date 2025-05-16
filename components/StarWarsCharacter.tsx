"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import SearchBar from "./SearchBar";
import { Character } from "@/types";

import CharacterGrid from "./CharacterGrid";
import Pagination from "./Pagination";
import CharacterDetails from "./CharacterDetails";
// import CharacterDetails from "./CharacterDetails";
function StarWarsCharacter() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const itemsPerPage = 10;

  // Fetch all characters from the new API
  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://akabab.github.io/starwars-api/api/all.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: Character[] = await response.json();
        setCharacters(data || []);
        setFilteredCharacters(data || []);
        setTotalPages(Math.ceil((data || []).length / itemsPerPage));
      } catch (err) {
        setError(
          "Failed to load Star Wars characters. Please try again later."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  // Handle search
  useEffect(() => {
    startTransition(() => {
      if (searchQuery.trim() === "") {
        setFilteredCharacters(characters);
        setTotalPages(Math.ceil(characters.length / itemsPerPage));
        return;
      }

      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredCharacters(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setCurrentPage(1); // Reset to first page when searching
    });
  }, [searchQuery, characters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Get current page characters - memoized to prevent recalculation on every render
  const currentPageCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCharacters.slice(startIndex, endIndex);
  }, [filteredCharacters, currentPage, itemsPerPage]);

  // Pagination controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Memoize pagination rendering to prevent recalculation on every render
  const paginationElements = useMemo(() => {
    const pages = [];

    // Always show first page
    pages.push(
      <button key={1} onClick={() => goToPage(1)} className="w-8 h-8 p-0">
        1
      </button>
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      pages.push(<span key="ellipsis1">...</span>);
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're always shown
      pages.push(
        <button key={i} onClick={() => goToPage(i)} className="w-8 h-8 p-0">
          {i}
        </button>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis2">...</span>);
    }

    // Always show last page if there's more than one page
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
  }, [currentPage, totalPages]);
  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded bg-white">
      {/* Search bar */}
      <SearchBar
        clearSearch={clearSearch}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
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
      {/* Character Details Modal */}
      {selectedCharacter && (
        <CharacterDetails
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
}

export default StarWarsCharacter;
