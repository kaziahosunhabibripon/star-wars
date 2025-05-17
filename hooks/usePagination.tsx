import { useCallback, useMemo, useState } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const paginationElements = useMemo(() => {
    const pages = [];

    pages.push(
      <button key={1} onClick={() => goToPage(1)} className="w-8 h-8 p-0">
        1
      </button>
    );

    if (currentPage > 3) {
      pages.push(<span key="ellipsis1">...</span>);
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;
      pages.push(
        <button key={i} onClick={() => goToPage(i)} className="w-8 h-8 p-0">
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis2">...</span>);
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="w-8 h-8 p-0"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  }, [currentPage, totalPages, goToPage]);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    paginationElements,
    setCurrentPage,
  };
}
