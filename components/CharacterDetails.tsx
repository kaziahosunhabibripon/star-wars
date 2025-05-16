"use client";

import type React from "react";
import { useState, useMemo } from "react";

import Image from "next/image";
import { Character } from "@/types";
import { FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import {
  User,
  Home,
  Calendar,
  Ruler,
  Weight,
  ExternalLink,
} from "lucide-react";
interface CharacterDetailsModalProps {
  character: Character;
  onClose: () => void;
}

export default function CharacterDetails({
  character,
  onClose,
}: CharacterDetailsModalProps) {
  const [imageError, setImageError] = useState(false);

  // Memoize the character image URL
  const characterImageUrl = useMemo(() => {
    return character.image || "/placeholder.svg";
  }, [character.image]);

  // Handle modal backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Format height and mass for display
  const formattedHeight = useMemo(() => {
    if (!character.height) return "Unknown";
    return typeof character.height === "number"
      ? `${character.height} cm`
      : character.height;
  }, [character.height]);

  const formattedMass = useMemo(() => {
    if (!character.mass) return "Unknown";
    return typeof character.mass === "number"
      ? `${character.mass} kg`
      : character.mass;
  }, [character.mass]);

  // Format birth information
  const birthInfo = useMemo(() => {
    if (!character.born && !character.bornLocation) return "Unknown";

    let info = "";
    if (character.born) info += character.born;
    if (character.born && character.bornLocation) info += " at ";
    if (character.bornLocation) info += character.bornLocation;

    return info || "Unknown";
  }, [character.born, character.bornLocation]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Character Details</h2>
          <button onClick={onClose} className="rounded-full">
            x
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6">
          <div>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Character image */}
              <div className="w-full md:w-1/3">
                <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-300 shadow-md">
                  {!imageError ? (
                    <Image
                      src={characterImageUrl || "/placeholder.svg"}
                      alt={character.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover"
                      priority={true}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <FaCircleUser className="h-24 w-24 text-gray-400" />
                    </div>
                  )}
                </div>
                {character.wiki && (
                  <div className="mt-3 text-center">
                    <Link
                      href={character.wiki}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 text-sm"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Wiki Page
                    </Link>
                  </div>
                )}
              </div>

              {/* Character info */}
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">{character.name}</h2>

                {/* Basic info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Height: {formattedHeight}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Mass: {formattedMass}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Born: {birthInfo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Gender: {character.gender || "Unknown"}
                    </span>
                  </div>
                </div>

                {/* Physical characteristics */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Physical Characteristics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-gray-100">
                      Species: {character.species || "Unknown"}
                    </button>
                    <button className="bg-gray-100">
                      Hair: {character.hairColor || "Unknown"}
                    </button>
                    <button className="bg-gray-100">
                      Skin: {character.skinColor || "Unknown"}
                    </button>
                    <button className="bg-gray-100">
                      Eyes: {character.eyeColor || "Unknown"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional details */}
            <div className="mt-8 space-y-6">
              {/* Homeworld */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-blue-500" />
                  Homeworld
                </h3>
                {character.homeworld ? (
                  <button className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {character.homeworld}
                  </button>
                ) : (
                  <span className="text-gray-500 text-sm">Unknown</span>
                )}
              </div>

              {/* Affiliations */}
              {character.affiliations && character.affiliations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <FaCircleUser className="h-5 w-5 mr-2 text-green-500" />
                    Affiliations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {character.affiliations.map((affiliation, index) => (
                      <button
                        key={index}
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        {affiliation}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Masters */}
              {character.masters && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Masters</h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(character.masters)
                      ? character.masters
                      : [character.masters]
                    ).map((master, index) => (
                      <button
                        key={index}
                        className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        {master}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Apprentices */}
              {character.apprentices && character.apprentices.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Apprentices</h3>
                  <div className="flex flex-wrap gap-2">
                    {character.apprentices.map((apprentice, index) => (
                      <button
                        key={index}
                        className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                      >
                        {apprentice}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cybernetics */}
              {character.cybernetics && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cybernetics</h3>
                  <p className="text-gray-700">{character.cybernetics}</p>
                </div>
              )}

              {/* Death information */}
              {(character.died || character.diedLocation) && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="text-red-500 mr-2">†</span>
                    Death
                  </h3>
                  <p className="text-gray-700">
                    {character.died && `${character.died} `}
                    {character.diedLocation && `at ${character.diedLocation}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
