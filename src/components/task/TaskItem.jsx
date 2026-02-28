function TaskItem({ task }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
      
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{task.title}</h2>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium
            ${task.priority === "high" && "bg-red-100 text-red-600"}
            ${task.priority === "medium" && "bg-yellow-100 text-yellow-600"}
            ${task.priority === "low" && "bg-green-100 text-green-600"}
          `}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-gray-500 mt-2">{task.description}</p>

      <p className="text-sm text-gray-400 mt-3">{task.dueDate}</p>
    </div>
  );
}

export default TaskItem;