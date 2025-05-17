"use client";
import { SearchBarProps } from "@/types";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar({
  searchQuery,
  handleSearch,
  clearSearch,
  onSearch,
}: SearchBarProps) {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          className="w-48 px-4 py-2 rounded-l-2xl border border-gray-300"
        />

        <button
          className="cursor-pointer bg-gray-200 px-4  hover:bg-sky-100 py-2 text-md font-medium flex items-center gap-1 text-gray-700"
          onClick={onSearch}
        >
          {searchQuery && (
            <IoSearchSharp className="h-4 w-4" onClick={clearSearch} />
          )}
          Search
        </button>
      </div>
    </div>
  );
}
