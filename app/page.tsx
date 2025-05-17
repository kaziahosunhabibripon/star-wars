import StarWarsCharacterClient from "@/components/StarWarsCharacterClient";
import { fetchCharacters } from "@/pages/api/starwars";

export default async function Home() {
  const characters = await fetchCharacters();

  return (
    <main className="flex-1 bg-slate-300 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <StarWarsCharacterClient initialCharacters={characters} />
      </div>
    </main>
  );
}
