import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search tasks..."
        className="
          w-full px-4 py-2.5 pl-10
          rounded-xl
          bg-zinc-900 border border-zinc-800
          text-zinc-100 placeholder:text-zinc-500
          focus:outline-none focus:ring-2 focus:ring-emerald-500
          transition
        "
      />
      <Search className="absolute left-3 top-3 text-zinc-500 w-4 h-4" />
    </div>
  );
}

export default SearchBar;
