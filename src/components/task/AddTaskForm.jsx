function AddTaskForm({ onCancel }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task title"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Description"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskForm;