function TaskFilters({ priorityFilter, setPriorityFilter }) {
  const selectStyle = `
    px-3 py-2.5 rounded-xl
    bg-zinc-900 border border-zinc-800
    text-zinc-200
    focus:outline-none focus:ring-2 focus:ring-emerald-500
    transition
  `;

  return (
    <div className="flex gap-3">
      <select
        className={selectStyle}
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="All">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}

export default TaskFilters;
