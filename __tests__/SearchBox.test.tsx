import { render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  it("renders input box", () => {
    const mockHandleSearch = jest.fn();
    const mockClearSearch = jest.fn();

    render(
      <SearchBar
        searchQuery=""
        handleSearch={mockHandleSearch}
        clearSearch={mockClearSearch}
        onSearch={() => {}}
      />
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  // ...more tests here, passing those props as needed
});
