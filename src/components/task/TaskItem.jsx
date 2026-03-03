import { Trash2, Clock, Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";

function TaskItem({ task, onToggleStatus, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const isCompleted = task.status === "Completed";
  const [editedData, setEditedData] = useState({
    taskname: task.title,
    description: task.description,
    category: task.category,
    deadline: task.deadline,
    priority: task.priority,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onUpdate(task._id, editedData);
    setIsEditing(false);
  };
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
              data-[state=checked]:border-emerald-600 rounded-lg
            "
          />

          <div>
            {isEditing ? (
              <input
                name="taskname"
                value={editedData.taskname}
                onChange={handleChange}
                className="bg-zinc-800 text-zinc-100 p-1 rounded"
              />
            ) : (
              <h2
                className={`text-lg font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "line-through text-zinc-500 opacity-60"
                    : "text-zinc-100"
                }`}
              >
                {task.title}
              </h2>
            )}
            {isEditing ? (
              <textarea
                name="description"
                value={editedData.description}
                onChange={handleChange}
                className="bg-zinc-800 text-zinc-100 p-1 rounded mt-1"
              />
            ) : (
              <p
                className={`mt-1 ${
                  isCompleted ? "text-zinc-600" : "text-zinc-400"
                }`}
              >
                {task.description}
              </p>
            )}

            {/* Category Badge */}
            <div className="flex items-center gap-2 mt-2">
              {isEditing ? (
                <select
                  name="category"
                  value={editedData.category}
                  onChange={handleChange}
                  className="bg-zinc-800 text-zinc-100 text-xs px-2 py-1 rounded"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                </select>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {task.category}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm mt-2">
              <Clock className="w-4 h-4 text-zinc-400" />

              {isEditing ? (
                <input
                  type="date"
                  name="deadline"
                  value={editedData.deadline}
                  onChange={handleChange}
                  className="bg-zinc-800 text-zinc-100 p-1 rounded"
                />
              ) : (
                <span
                  className={`${isCompleted ? "text-zinc-600" : "text-zinc-500"}`}
                >
                  {task.deadline}
                </span>
              )}
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

          {/* Delete + Edit Button */}
          <div className="flex gap-3 items-center">
            <div className="flex gap-3 items-center">
              {isEditing ? (
                <>
                  <button onClick={handleSubmit} className="text-green-400">
                    Save
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-zinc-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-zinc-500 hover:text-blue-400"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(task._id)}
                    className="text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
