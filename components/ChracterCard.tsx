"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { Character } from "@/types";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export default function CharacterCard({
  character,
  onClick,
}: CharacterCardProps) {
  const [imageError, setImageError] = useState(false);

  // Memoize the character image URL - use the image from the API
  const characterImageUrl = useMemo(() => {
    return character.image || "/placeholder.svg";
  }, [character.image]);

  return (
    <div
      className="border border-gray-300 p-4 rounded cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center"
      onClick={onClick}
    >
      <div className="relative w-24 h-24 mx-auto rounded-lg border border-gray-300 mb-3 overflow-hidden">
        {!imageError ? (
          <Image
            src={characterImageUrl || "/placeholder.svg"}
            alt={character.name}
            width={200}
            height={200}
            className="object-cover"
            priority={true}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <FaCircleUser className="h-10 w-10 text-gray-400" />
          </div>
        )}
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
