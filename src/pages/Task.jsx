import { useState } from "react";

import TaskList from "../components/task/TaskList";
import TaskHeader from "../components/task/TaskHeader";
import AddTaskButton from "../components/task/AddTaskButton";
import AddTaskForm from "../components/task/AddTaskForm";
import TaskFilters from "../components/task/TaskFilters";
import SearchBar from "../components/task/SearchBar";

function Task() {
  const [showForm, setShowForm] = useState(false);
  const [mockTasks, setTasks] = useState([
    {
      id: 1,
      title: "Math",
      description: "Revise probability chapter",
      priority: "medium",
      dueDate: "Mar 5 • 4d 20h",
      completed: false,
    },
    {
      id: 2,
      title: "Physics",
      description: "Solve numericals",
      priority: "high",
      dueDate: "Mar 2 • 2d left",
      completed: false,
    },
  ]);

  return (
    <div className="bg-zinc-950 px-6 py-10 max-w-5xl mx-auto min-h-screen">
      <div className="pt-32">
        <TaskHeader count={mockTasks.length} />
        <AddTaskButton onClick={() => setShowForm(true)} />
      </div>

      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg shadow-black/30 transition-all duration-300">
          <AddTaskForm onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="flex justify-between items-center mb-8 gap-4 mt-10">
        <SearchBar />
        <TaskFilters />
      </div>

      <TaskList tasks={mockTasks} />
    </div>
  );
}

export default Task;