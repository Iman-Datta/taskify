import { Trash2, Clock, Pencil, Calendar as CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";
import { useRef } from "react";

function TaskItem({ task, onToggleStatus, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const isCompleted = task.status === "Completed";

  const [editedData, setEditedData] = useState({
    taskname: task.title,
    description: task.description,
    category: task.category,
    deadline: task.deadline ? new Date(task.deadline) : null,
    priority: task.priority,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditedData({
      taskname: task.title,
      description: task.description,
      category: task.category,
      deadline: task.deadline ? new Date(task.deadline) : null,
      priority: task.priority,
    });
    setIsEditing(true);
  };

  const handleSubmit = () => {
    onUpdate(task._id, {
      ...editedData,
      // ✅ Send as pure date string
      deadline: editedData.deadline
        ? format(editedData.deadline, "yyyy-MM-dd")
        : null,
    });

    setIsEditing(false);
  };

  const textareaRef = useRef(null);

  const handleTextareaChange = (e) => {
    handleChange(e); // keep your existing state update

    const textarea = textareaRef.current;
    textarea.style.height = "auto";

    const maxHeight = 3 * 24;
    // 24px approx line height (adjust if needed)

    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.overflowY = "hidden";
    } else {
      textarea.style.height = maxHeight + "px";
      textarea.style.overflowY = "auto";
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-md shadow-black/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggleStatus(task._id)}
            className="mt-1 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 rounded-lg"
          />

          <div className="w-full">
            {/* Title */}
            {isEditing ? (
              <input
                name="taskname"
                value={editedData.taskname}
                onChange={handleChange}
                className="bg-transparent text-lg font-semibold text-zinc-100 border-b border-zinc-700 focus:border-emerald-500 focus:outline-none transition w-full"
              />
            ) : (
              <h2
                className={`text-lg font-semibold ${
                  isCompleted
                    ? "line-through text-zinc-500 opacity-60"
                    : "text-zinc-100"
                }`}
              >
                {task.title}
              </h2>
            )}

            {/* Description */}
            {isEditing ? (
              <textarea
                ref={textareaRef}
                name="description"
                value={editedData.description}
                onChange={handleTextareaChange}
                rows={1}
                className="bg-transparent text-zinc-400 border-b border-zinc-700 focus:border-emerald-500 focus:outline-none transition resize-none w-full mt-3"
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

            {/* Category */}
            <div className="mt-3">
              {isEditing ? (
                <select
                  name="category"
                  value={editedData.category}
                  onChange={handleChange}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {task.category}
                  </span>
                </div>
              )}
            </div>

            {/* Deadline */}
            <div className="mt-3">
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800"
                    >
                      {editedData.deadline
                        ? format(editedData.deadline, "dd-MM-yyyy")
                        : "dd-mm-yyyy"}
                      <CalendarIcon className="ml-2 h-4 w-4 text-zinc-400" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    className="w-auto p-0 bg-zinc-900 border border-zinc-800"
                  >
                    <Calendar
                      mode="single"
                      selected={editedData.deadline}
                      onSelect={(date) =>
                        setEditedData((prev) => ({
                          ...prev,
                          deadline: date,
                        }))
                      }
                      captionLayout="dropdown"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  {/* format manually */}
                  <span
                    className={isCompleted ? "text-zinc-600" : "text-zinc-500"}
                  >
                    {task.deadline
                      ? format(new Date(task.deadline), "dd-MM-yyyy")
                      : ""}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end gap-4 min-w-[120px]">
          {/* Priority */}
          {isEditing ? (
            <div className="flex flex-col items-end gap-2">
              <label className="text-xs text-zinc-500">Priority</label>

              <select
                name="priority"
                value={editedData.priority}
                onChange={handleChange}
                className="
          bg-zinc-900 border border-zinc-800
          text-zinc-100 text-xs
          px-3 py-1.5 rounded-lg
          focus:outline-none focus:ring-1 focus:ring-emerald-500
        "
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          ) : (
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
          )}

          {/* Buttons */}
          {isEditing ? (
            <div className="flex gap-3 text-sm font-medium">
              <button
                onClick={handleSubmit}
                className="text-emerald-400 hover:text-emerald-300 transition"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="text-zinc-500 hover:text-zinc-300 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleEditClick}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;