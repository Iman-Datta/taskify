import { Trash2, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

function TaskItem({ task, onToggleStatus, onDelete }) {
  const isCompleted = task.status === "completed";

  return (
    <div
      className="
        bg-zinc-900 border border-zinc-800
        p-5 rounded-2xl
        shadow-md shadow-black/30
        hover:shadow-xl hover:-translate-y-0.5
        transition-all duration-300
      "
    >
      <div className="flex justify-between items-start">
        {/* Left Section */}
        <div className="flex items-start gap-3">
          {/* Controlled Checkbox */}
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggleStatus(task._id)}
            className="
              mt-1
              data-[state=checked]:bg-emerald-600
              data-[state=checked]:border-emerald-600
            "
          />

          <div>
            <h2
              className={`text-lg font-semibold transition-all duration-300 ${
                isCompleted
                  ? "line-through text-zinc-500 opacity-60"
                  : "text-zinc-100"
              }`}
            >
              {task.title}
            </h2>

            <p
              className={`mt-1 transition-all ${
                isCompleted ? "text-zinc-600" : "text-zinc-400"
              }`}
            >
              {task.description}
            </p>

            <div className="flex items-center gap-2 text-sm mt-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span
                className={`${isCompleted ? "text-zinc-600" : "text-zinc-500"}`}
              >
                {task.dueDate}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end gap-3">
          {/* Priority Badge */}
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

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task._id)}
            className="
              text-zinc-500 hover:text-red-400
              transition
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
