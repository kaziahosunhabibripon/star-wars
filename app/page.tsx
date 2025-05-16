import StarWarsCharacterClient from "@/components/StarWarsCharacterClient";
import { fetchCharacters } from "@/pages/api/starwars";

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
