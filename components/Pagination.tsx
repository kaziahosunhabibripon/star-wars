import { PaginationProps } from "@/types";
import React from "react";

export default function Pagination({
  isLoading,
  filteredCharacters,
  goToPage,
  currentPage,
  paginationElements,
  totalPages,
}: PaginationProps) {
  return (
    <>
      {/* Pagination */}
      {!isLoading && filteredCharacters.length > 0 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="border border-gray-300"
          >
            &lt;
          </button>

          {paginationElements}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border border-gray-300"
          >
            &gt;
          </button>
        </div>
      )}
    </>
  );
}
