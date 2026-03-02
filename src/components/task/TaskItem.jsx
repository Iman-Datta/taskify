function TaskItem({ task }) {
  return (
    <div className="
      bg-zinc-900 border border-zinc-800
      p-5 rounded-2xl
      shadow-md shadow-black/30
      hover:shadow-xl hover:-translate-y-0.5
      transition-all duration-300
    ">

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-100">
          {task.title}
        </h2>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium
            ${
              task.priority === "high" &&
              "bg-red-500/10 text-red-400 border border-red-500/20"
            }
            ${
              task.priority === "medium" &&
              "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
            }
            ${
              task.priority === "low" &&
              "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }
          `}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-zinc-400 mt-2">
        {task.description}
      </p>

      <p className="text-sm text-zinc-500 mt-3">
        {task.dueDate}
      </p>
    </div>
  );
}

export default TaskItem;