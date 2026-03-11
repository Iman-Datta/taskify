import { Search } from "lucide-react";

function SearchBar({ setSearch }) {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search tasks..."
        className="
        w-full px-4 py-2.5 pl-10
        rounded-xl
        bg-white border border-zinc-300
        text-zinc-900 placeholder:text-zinc-500
        dark:bg-zinc-900 dark:border-zinc-800
        dark:text-zinc-100 dark:placeholder:text-zinc-500
        focus:outline-none focus:ring-2 focus:ring-emerald-500
        transition
      "
      />
      <Search className="absolute left-3 top-3 text-zinc-500 dark:text-zinc-500 w-4 h-4" />
    </div>
  );
}

export default SearchBar;
