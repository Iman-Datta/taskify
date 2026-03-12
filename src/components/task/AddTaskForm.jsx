import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";

function AddTaskForm({ onAddTask, onCancel }) {
  const [date, setDate] = useState(null);

  const [formData, setFormData] = useState({
    taskname: "",
    description: "",
    category: "",
    deadline: null,
    priority: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.taskname.trim()) return;

    onAddTask({
      ...formData,
      deadline: date ? format(date, "yyyy-MM-dd") : null,
    });

    // Reset form
    setFormData({
      taskname: "",
      description: "",
      category: "",
      deadline: null,
      priority: "",
    });

    setDate(null);
  };

  const inputStyle = `
  bg-white border border-zinc-300
  dark:bg-zinc-900 dark:border-zinc-800
  rounded-xl px-4 py-2.5
  text-zinc-900 placeholder:text-zinc-500
  dark:text-zinc-100 dark:placeholder:text-zinc-500
  focus:outline-none focus:ring-2 focus:ring-emerald-500
  transition
`;

  return (
    <div
      className="
      bg-white border border-zinc-200
      dark:bg-zinc-900 dark:border-zinc-800
      p-6 rounded-2xl
      shadow-xl shadow-black/10 dark:shadow-black/40
      mb-10
      transition-colors duration-300
    "
    >
      <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
        Add New Task
      </h2>

      <div className="flex flex-col gap-4">
        {/* Title */}
        <input
          type="text"
          name="taskname"
          placeholder="Task title"
          className={inputStyle}
          value={formData.taskname}
          onChange={handleChange}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className={`${inputStyle} resize-none`}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Priority + Category + Date */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Priority */}
          <select
            name="priority"
            className={`flex-1 ${inputStyle}`}
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">No priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`flex-1 ${inputStyle}`}
          >
            <option value="">Select category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </select>

          {/* Deadline */}
          <div className="flex flex-col flex-1">
            <label className="text-xs text-zinc-600 dark:text-zinc-500 mb-1">
              Deadline
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="
                  justify-between
                  bg-white border border-zinc-300
                  text-zinc-700 hover:bg-zinc-100
                  dark:bg-zinc-900 dark:border-zinc-800
                  dark:text-zinc-200 dark:hover:bg-zinc-800
                "
                >
                  {date ? format(date, "dd-MM-yyyy") : "dd-mm-yyyy"}

                  <CalendarIcon className="ml-2 h-4 w-4 text-zinc-400" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="
                w-auto p-0
                bg-white border border-zinc-300
                dark:bg-zinc-900 dark:border-zinc-800
              "
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => setDate(selectedDate)}
                  className="rounded-lg border"
                  captionLayout="dropdown"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onCancel}
            className="
            px-4 py-2 rounded-xl
            bg-zinc-200 hover:bg-zinc-300
            text-zinc-800
            dark:bg-zinc-800 dark:hover:bg-zinc-700
            dark:text-zinc-300
            transition
          "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
            px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-black/10 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskForm;
