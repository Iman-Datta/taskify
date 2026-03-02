function AddTaskForm({ onCancel }) {
  const inputStyle = `
    bg-zinc-900 border border-zinc-800
    rounded-xl px-4 py-2.5
    text-zinc-100 placeholder:text-zinc-500
    focus:outline-none focus:ring-2 focus:ring-emerald-500
    transition
  `;

  return (
    <div
      className="
      bg-zinc-900 border border-zinc-800
      p-6 rounded-2xl
      shadow-xl shadow-black/40
      mb-10
    "
    >
      <h2 className="text-xl font-semibold mb-4 text-zinc-100">Add New Task</h2>

      <div className="flex flex-col gap-4">
        <input type="text" placeholder="Task title" className={inputStyle} />

        <textarea placeholder="Description" className={inputStyle} />

        <select className={inputStyle}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input type="date" className={inputStyle} />

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onCancel}
            className="
              px-4 py-2 rounded-xl
              bg-zinc-800 hover:bg-zinc-700
              text-zinc-300
              transition
            "
          >
            Cancel
          </button>

          <button
            className="
              px-4 py-2 rounded-xl
              bg-emerald-600 hover:bg-emerald-500
              text-white
              transition
            "
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskForm;