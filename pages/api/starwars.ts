"use server";
import { Character } from "@/types";

export async function fetchCharacters(): Promise<Character[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STARWARS_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_STARWARS_API_URL is not defined");
  }

  const res = await fetch(apiUrl, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return res.json();
}
