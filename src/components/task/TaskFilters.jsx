function TaskFilters() {
  return (
    <div className="flex gap-3">
      <select className="px-3 py-2 rounded-xl border">
        <option>All</option>
        <option>Completed</option>
        <option>Pending</option>
      </select>

      <select className="px-3 py-2 rounded-xl border">
        <option>All Priorities</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
    </div>
  );
}

export default TaskFilters;