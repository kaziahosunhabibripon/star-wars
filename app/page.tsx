import React from "react";

import { Character } from "@/types";
import StarWarsCharacterClient from "@/components/StarWarsCharacterClient";

async function fetchCharacters(): Promise<Character[]> {
  const res = await fetch(
    "https://akabab.github.io/starwars-api/api/all.json",
    { next: { revalidate: 60 } } // cache and revalidate every 60 seconds
  );

  if (!res.ok) throw new Error("Failed to fetch characters");

  return res.json();
}

export default async function Home() {
  const characters = await fetchCharacters();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Star Wars Characters
        </h1>
        <StarWarsCharacterClient initialCharacters={characters} />
      </div>
    </main>
  );
}
