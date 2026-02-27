// src/components/TaskItem.jsx
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      className="bg-white p-4 rounded-xl shadow-sm border 
                 hover:shadow-md transition flex items-center justify-between"
    >
      <div className="flex items-center gap-3">

        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-blue-600"
        />

        {/* Task Content */}
        <div>
          <h3
            className={`font-semibold text-lg ${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-500">
              {task.description}
            </p>
          )}

          {/* Priority Badge */}
          <span
            className={`inline-block mt-2 px-2 py-1 text-xs rounded-full
              ${
                task.priority === "high"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;