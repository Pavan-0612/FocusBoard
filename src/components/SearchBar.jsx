import { Search } from "lucide-react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <label className="search-box">
      <Search size={18} />
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks by title"
      />
    </label>
  );
}

export default SearchBar;
