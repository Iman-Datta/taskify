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

function AddTaskForm({ onCancel }) {
  const [date, setDate] = useState(null);

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
        {/* Title */}
        <input type="text" placeholder="Task title" className={inputStyle} />

        {/* Description */}
        <textarea placeholder="Description" className={inputStyle} />

        {/* Priority + Date */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Priority */}
          <select className={`flex-1 ${inputStyle}`}>
            <option>No priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="
                  flex-1 justify-between items-center
                  bg-zinc-900 border border-zinc-800
                  text-zinc-200
                  hover:bg-zinc-800
                "
              >
                {date ? format(date, "dd-MM-yyyy") : "dd-mm-yyyy"}
                <CalendarIcon className="ml-2 h-4 w-4 text-zinc-400" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-0 bg-zinc-900 border border-zinc-800"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
                captionLayout="dropdown"
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Buttons */}
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
