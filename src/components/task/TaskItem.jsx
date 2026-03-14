import {
  Trash2,
  Clock,
  Pencil,
  Calendar as CalendarIcon,
  RotateCcw,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState, useRef } from "react";

const categoryOptions = [
  "Work",
  "Personal",
  "Study",
  "Health",
  "Finance",
  "Shopping",
  "Home",
  "Fitness",
  "Learning",
  "Custom",
];

const categoryColors = {
  Work: "bg-blue-500/10   text-blue-500   border-blue-500/20   dark:bg-blue-500/10   dark:text-blue-400   dark:border-blue-500/20",
  Personal:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  Study:
    "bg-violet-500/10 text-violet-500  border-violet-500/20 dark:bg-violet-500/10  dark:text-violet-400 dark:border-violet-500/20",
  Health:
    "bg-rose-500/10   text-rose-500    border-rose-500/20   dark:bg-rose-500/10   dark:text-rose-400   dark:border-rose-500/20",
  Finance:
    "bg-amber-500/10  text-amber-600   border-amber-500/20  dark:bg-amber-500/10  dark:text-amber-400  dark:border-amber-500/20",
  Shopping:
    "bg-pink-500/10   text-pink-500    border-pink-500/20   dark:bg-pink-500/10   dark:text-pink-400   dark:border-pink-500/20",
  Home: "bg-orange-500/10 text-orange-500  border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
  Fitness:
    "bg-cyan-500/10   text-cyan-600    border-cyan-500/20   dark:bg-cyan-500/10   dark:text-cyan-400   dark:border-cyan-500/20",
  Learning:
    "bg-indigo-500/10 text-indigo-500  border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
};

function TaskItem({
  task,
  variant = "normal",
  deleteCandidate,
  onToggleStatus,
  onDelete,
  onConfirmDelete,
  onCancelDelete,
  onUpdate,
  onRestore,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const isCompleted = task.status === "Completed";
  const isDeletePending = deleteCandidate === task._id;
  const textareaRef = useRef(null);

  const [editedData, setEditedData] = useState({
    taskname: task.title,
    description: task.description,
    category: task.category,
    deadline: task.deadline ? new Date(task.deadline) : null,
    priority: task.priority,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setEditedData({
      taskname: task.title,
      description: task.description,
      category: categoryOptions.includes(task.category)
        ? task.category
        : "Custom",
      categoryInput: categoryOptions.includes(task.category)
        ? ""
        : task.category,
      deadline: task.deadline ? new Date(task.deadline) : null,
      priority: task.priority,
    });
    setIsEditing(true);
  };

  const handleSubmit = () => {
    const finalCategory =
      editedData.category === "Custom"
        ? editedData.categoryInput?.trim() || "Other"
        : editedData.category;

    const payload = {
      taskname: editedData.taskname,
      description: editedData.description,
      category: finalCategory,
      priority: editedData.priority,
      deadline: editedData.deadline
        ? format(editedData.deadline, "yyyy-MM-dd")
        : null,
    };

    onUpdate(task._id, payload);
    setIsEditing(false);
  };

  const handleTextareaChange = (e) => {
    handleChange(e);
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    const maxHeight = 3 * 24;
    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.overflowY = "hidden";
    } else {
      textarea.style.height = maxHeight + "px";
      textarea.style.overflowY = "auto";
    }
  };

  return (
    <div className="space-y-2">
      {/* ── Card ── */}
      <div
        className={`
          relative bg-white dark:bg-zinc-900
          border border-zinc-200 dark:border-zinc-800
          rounded-2xl p-5
          shadow-sm hover:shadow-lg
          hover:-translate-y-0.5
          transition-all duration-300
          ${variant === "normal" && isCompleted ? "opacity-50 scale-[0.98]" : ""}
        `}
      >
        {/* ── Main row ── */}
        <div className="flex justify-between items-start gap-4">
          {/* ── LEFT: checkbox + content ── */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {variant === "normal" && (
              <Checkbox
                checked={isCompleted}
                onCheckedChange={() => onToggleStatus(task._id)}
                className="mt-1 shrink-0 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 rounded-lg"
              />
            )}

            <div className="flex-1 min-w-0">
              {/* Title */}
              {isEditing ? (
                <input
                  name="taskname"
                  value={editedData.taskname}
                  onChange={handleChange}
                  className="
                    w-full bg-transparent
                    text-lg font-semibold
                    text-zinc-900 dark:text-zinc-100
                    border-b border-zinc-300 dark:border-zinc-700
                    focus:border-emerald-500 focus:outline-none
                    transition pb-0.5
                  "
                />
              ) : (
                <h2
                  className={`text-lg font-semibold leading-snug ${
                    variant === "normal" && isCompleted
                      ? "line-through text-zinc-400 opacity-70"
                      : "text-zinc-900 dark:text-zinc-100"
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
                  placeholder="Add a description..."
                  className="
      w-full mt-3 resize-none
      text-sm leading-relaxed
      text-zinc-700 dark:text-zinc-300
      placeholder:text-zinc-300 dark:placeholder:text-zinc-600

      bg-zinc-50/80 dark:bg-zinc-800/50
      border border-zinc-200 dark:border-zinc-700/60
      hover:border-zinc-300 dark:hover:border-zinc-600
      focus:border-emerald-400 dark:focus:border-emerald-500/70
      focus:bg-white dark:focus:bg-zinc-800
      focus:ring-2 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/10

      rounded-lg px-3 py-2
      focus:outline-none
      transition-all duration-200
    "
                />
              ) : (
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {task.description}
                </p>
              )}

              {/* Category */}
              <div className="mt-3">
                {isEditing ? (
                  editedData.category === "Custom" ? (
                    <input
                      type="text"
                      name="category"
                      placeholder="Enter category…"
                      value={editedData.categoryInput || ""}
                      onChange={(e) =>
                        setEditedData((prev) => ({
                          ...prev,
                          categoryInput: e.target.value,
                        }))
                      }
                      className="
                        bg-white dark:bg-zinc-900
                        border border-zinc-300 dark:border-zinc-700
                        text-zinc-900 dark:text-zinc-100
                        text-xs px-3 py-1.5 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-emerald-500
                        transition
                      "
                    />
                  ) : (
                    <select
                      name="category"
                      value={editedData.category}
                      onChange={(e) =>
                        setEditedData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="
                        bg-white dark:bg-zinc-900
                        border border-zinc-300 dark:border-zinc-700
                        text-zinc-900 dark:text-zinc-100
                        text-xs px-3 py-1.5 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-emerald-500
                        transition
                      "
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat === "Custom" ? "Other / Custom" : cat}
                        </option>
                      ))}
                    </select>
                  )
                ) : (
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className={`
      inline-flex items-center gap-1.5
      text-[11px] font-semibold tracking-wider uppercase
      px-2.5 py-1 rounded-md border
      ${categoryColors[task.category] || "bg-sky-500/10 text-sky-400 border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20"}
    `}
                    >
                      <svg
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        className="shrink-0 opacity-60"
                      >
                        <circle cx="3" cy="3" r="3" fill="currentColor" />
                      </svg>
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
                        className="
                          justify-between
                          bg-white dark:bg-zinc-900
                          border border-zinc-300 dark:border-zinc-700
                          text-zinc-700 dark:text-zinc-200
                          hover:bg-zinc-50 dark:hover:bg-zinc-800
                          text-xs h-8 px-3 rounded-lg
                          transition
                        "
                      >
                        {editedData.deadline
                          ? format(editedData.deadline, "dd-MM-yyyy")
                          : "dd-mm-yyyy"}
                        <CalendarIcon className="ml-2 h-3.5 w-3.5 text-zinc-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl"
                    >
                      <Calendar
                        mode="single"
                        selected={editedData.deadline}
                        onSelect={(date) =>
                          setEditedData((prev) => ({ ...prev, deadline: date }))
                        }
                        captionLayout="dropdown"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  variant === "normal" && (
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {task.deadline &&
                          !isNaN(new Date(task.deadline)) &&
                          format(new Date(task.deadline), "dd-MM-yyyy")}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: priority + action buttons ── */}
          <div className="flex flex-col items-end gap-4 shrink-0">
            {/* Priority */}
            {isEditing ? (
              <div className="flex flex-col items-end gap-1.5">
                <label className="text-xs text-zinc-400 dark:text-zinc-500 font-medium tracking-wide uppercase">
                  Priority
                </label>
                <select
                  name="priority"
                  value={editedData.priority}
                  onChange={handleChange}
                  className="
                    bg-white dark:bg-zinc-900
                    border border-zinc-300 dark:border-zinc-700
                    text-zinc-900 dark:text-zinc-100
                    text-xs px-3 py-1.5 rounded-lg
                    focus:outline-none focus:ring-1 focus:ring-emerald-500
                    transition
                  "
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            ) : (
              <span
                className={`
    inline-flex items-center gap-1.5
    text-[11px] font-semibold tracking-wider uppercase
    px-3 py-1 rounded-lg
    border-l-[3px] border border-transparent

    ${
      task.priority === "high"
        ? "border-l-red-500 bg-red-50/80 text-red-600 border-red-100 dark:bg-zinc-800/80 dark:text-red-400 dark:border-zinc-700/40 dark:border-l-red-500"
        : ""
    }
    ${
      task.priority === "medium"
        ? "border-l-amber-500 bg-amber-50/80 text-amber-600 border-amber-100 dark:bg-zinc-800/80 dark:text-amber-400 dark:border-zinc-700/40 dark:border-l-amber-500"
        : ""
    }
    ${
      task.priority === "low"
        ? "border-l-emerald-500 bg-emerald-50/80 text-emerald-600 border-emerald-100 dark:bg-zinc-800/80 dark:text-emerald-400 dark:border-zinc-700/40 dark:border-l-emerald-500"
        : ""
    }
  `}
              >
                {task.priority}
              </span>
            )}

            {/* Action buttons */}
            {isEditing ? (
              <div className="flex gap-3 text-sm font-semibold">
                <button
                  onClick={handleSubmit}
                  className="text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : variant === "normal" ? (
              <div className="flex gap-2.5">
                <button
                  onClick={handleEditClick}
                  className="
                    p-1.5 rounded-lg text-zinc-400
                    hover:text-blue-400 hover:bg-blue-500/10
                    transition-all duration-200
                  "
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="
                    p-1.5 rounded-lg text-zinc-400
                    hover:text-red-400 hover:bg-red-500/10
                    transition-all duration-200
                  "
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ) : variant === "completed" ? (
              <div className="flex gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRestore?.(task._id)}
                  className="
                    flex items-center gap-1.5 h-8 px-3 text-xs rounded-lg
                    border-zinc-200 dark:border-zinc-700
                    hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-300
                    dark:hover:bg-emerald-950 dark:hover:border-emerald-800
                    transition-all duration-200
                  "
                >
                  <RotateCcw size={13} />
                  Restore
                </Button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="
                    p-1.5 rounded-lg text-zinc-400
                    hover:text-red-400 hover:bg-red-500/10
                    transition-all duration-200
                  "
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ) : variant === "trash" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRestore?.(task._id)}
                className="
                  flex items-center gap-1.5 h-8 px-3 text-xs rounded-lg
                  border-zinc-200 dark:border-zinc-700
                  hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-300
                  dark:hover:bg-emerald-950 dark:hover:border-emerald-800
                  transition-all duration-200
                "
              >
                <RotateCcw size={13} />
                Restore
              </Button>
            ) : null}
          </div>
        </div>

        {/* ── Delete confirmation banner ── */}
        {isDeletePending && (
          <div
            className="
    mt-3 overflow-hidden rounded-xl
    border border-red-200/60 dark:border-red-700/30
    bg-gradient-to-r from-red-50/80 via-red-50/40 to-transparent
    dark:from-red-900/20 dark:via-zinc-900/60 dark:to-zinc-900/20
    backdrop-blur-sm
  "
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              {/* Left: icon + message */}
              <div className="flex items-center gap-3">
                <div
                  className="
          flex items-center justify-center
          w-7 h-7 rounded-lg shrink-0
          bg-red-100 dark:bg-red-900/30
          border border-red-200/80 dark:border-red-700/40
        "
                >
                  <Trash2
                    size={13}
                    className="text-red-500 dark:text-red-400"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-red-700 dark:text-red-400 leading-tight">
                    Delete task?
                  </span>
                  <span className="text-[11px] text-red-500/70 dark:text-zinc-500 leading-tight mt-0.5">
                    This action cannot be undone
                  </span>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onCancelDelete}
                  className="
            px-3.5 py-1.5 rounded-lg text-xs font-medium
            text-zinc-500 dark:text-zinc-400
            border border-zinc-200/80 dark:border-zinc-700/50
            hover:bg-white dark:hover:bg-zinc-800
            hover:text-zinc-800 dark:hover:text-zinc-200
            hover:border-zinc-300 dark:hover:border-zinc-600
            hover:shadow-sm
            active:scale-[0.97]
            transition-all duration-150
          "
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirmDelete}
                  className="
            flex items-center gap-1.5
            px-3.5 py-1.5 rounded-lg text-xs font-semibold
            bg-red-600 hover:bg-red-500
            dark:bg-red-600/80 dark:hover:bg-red-500/90
            text-white
            border border-red-700/30 dark:border-red-500/20
            shadow-sm shadow-red-900/25 dark:shadow-red-900/40
            hover:shadow-md hover:shadow-red-900/20
            active:scale-[0.97]
            transition-all duration-150
          "
                >
                  <Trash2 size={11} />
                  Delete
                </button>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-red-400/40 via-red-300/20 to-transparent dark:from-red-700/50 dark:via-red-800/20 dark:to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
