"use client";

import { Character } from "@/types";
import CharacterImage from "./CharacterImage";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export default function CharacterCard({
  character,
  onClick,
}: CharacterCardProps) {
  return (
    <div
      className="p-4 rounded-md cursor-pointer shadow-lg shadow-lime-950 hover:animate-pulse transition-shadow flex flex-col items-center"
      onClick={onClick}
    >
      <div className="relative w-28 h-28  rounded-full overflow-hidden">
        <CharacterImage
          characterImageUrl={character.image}
          alt={character.name}
        />
      </div>
      <h3 className="text-center font-medium mb-1 text-sm">{character.name}</h3>
      <h3 className="text-center font-medium mb-1 text-sm">
        {character.height}
      </h3>
      <h3 className="text-center font-medium mb-1 text-sm">
        {character.gender}
      </h3>
      <h3 className="text-center font-medium mb-1 text-sm">
        {character.homeworld}
      </h3>
      <div className="space-y-1">
        <div className="h-1 bg-gray-200 rounded"></div>
        <div className="h-1 bg-gray-200 rounded"></div>
        <div className="h-1 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
