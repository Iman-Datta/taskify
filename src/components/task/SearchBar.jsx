import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search tasks..."
        className="
          w-full px-4 py-2 pl-10
          rounded-xl border
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />
      <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
    </div>
  );
}

export default SearchBar;