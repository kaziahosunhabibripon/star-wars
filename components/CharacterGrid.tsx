"use Client";

import CharacterCard from "./ChracterCard";

export default function CharacterGrid({
  isLoading,
  error,
  currentPageCharacters,
  searchQuery,
  setSelectedCharacter,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      {isLoading ? (
        // Loading placeholders
        Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-lg bg-gray-200 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-4/6"></div>
          </div>
        ))
      ) : error ? (
        <div className="col-span-5 text-center py-4">
          <p className="text-red-500">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-2">
            Retry
          </button>
        </div>
      ) : currentPageCharacters.length === 0 ? (
        <div className="col-span-5 text-center py-4">
          <p>No characters found matching {searchQuery}</p>
        </div>
      ) : (
        currentPageCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => setSelectedCharacter(character)}
          />
        ))
      )}
    </div>
  );
}
