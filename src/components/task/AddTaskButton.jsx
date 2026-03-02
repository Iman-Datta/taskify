function AddTaskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        group w-full flex items-center justify-center gap-2
        bg-zinc-800 text-white
        px-5 py-3
        rounded-2xl font-semibold tracking-wide
        shadow-md shadow-black/30
        transition-all duration-300 ease-out
        hover:bg-zinc-700
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-black/40
        active:translate-y-0 active:shadow-md
      "
    >
      <span className="text-xl font-bold transition-transform duration-300 group-hover:rotate-90">
        +
      </span>
      Add Task
    </button>
  );
}

export default AddTaskButton;