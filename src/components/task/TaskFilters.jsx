function TaskFilters() {
  const selectStyle = `
    px-3 py-2.5 rounded-xl
    bg-zinc-900 border border-zinc-800
    text-zinc-200
    focus:outline-none focus:ring-2 focus:ring-emerald-500
    transition
  `;

  return (
    <div className="flex gap-3">
      <select className={selectStyle}>
        <option>All</option>
        <option>Completed</option>
        <option>Pending</option>
      </select>

      <select className={selectStyle}>
        <option>All Priorities</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
    </div>
  );
}

export default TaskFilters;
