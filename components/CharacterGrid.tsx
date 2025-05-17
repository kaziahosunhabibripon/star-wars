"use Client";

import { CharacterGridProps } from "@/types";
import CharacterCard from "./ChracterCard";
import LoadingSkeleton from "./Loading";
import Error from "@/app/error";
import { BiSolidError } from "react-icons/bi";
export default function CharacterGrid({
  isLoading,
  error,
  currentPageCharacters,
  searchQuery,
  setSelectedCharacter,
}: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      {isLoading ? (
        // Loading placeholders
        <LoadingSkeleton />
      ) : error ? (
        <Error />
      ) : currentPageCharacters.length === 0 ? (
        <div className="col-span-5 flex items-center justify-center flex-col text-center py-4">
          <p className="text-red-500  animate-bounce">
            <BiSolidError className="text-7xl" /> {searchQuery}
          </p>
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
