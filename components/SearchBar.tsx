"use client";
import { SearchBarProps } from "@/types";
import { RxCross2 } from "react-icons/rx";

export default function SearchBar({
  searchQuery,
  handleSearch,
  clearSearch,
}: SearchBarProps) {
  return (
    <div className="flex justify-end mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="w-48 pr-8 border border-gray-300"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <RxCross2 className="h-4 w-4" />
          </button>
        )}
        <button className="border border-gray-300 ml-2">Search</button>
      </div>
    </div>
  );
}
