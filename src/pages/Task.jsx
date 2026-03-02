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
      status: "todo",
    },
    {
      id: 2,
      title: "Physics",
      description: "Solve numericals",
      priority: "high",
      dueDate: "Mar 2 • 2d left",
      status: "todo",
    },
  ]);

  // ✅ Toggle status
  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "todo" : "completed",
            }
          : task,
      ),
    );
  };

  // ✅ Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ✅ Add task from form
  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="bg-zinc-950 px-6 py-10 max-w-5xl mx-auto min-h-screen">
      <div className="pt-32">
        <TaskHeader count={mockTasks.length} />

        {!showForm && <AddTaskButton onClick={() => setShowForm(true)} />}
      </div>

      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg shadow-black/30 transition-all duration-300">
          <AddTaskForm
            onCancel={() => setShowForm(false)}
            onAddTask={addTask}
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-8 gap-4 mt-10">
        <SearchBar />
        <TaskFilters />
      </div>

      <TaskList
        tasks={mockTasks}
        onToggleStatus={toggleStatus}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default Task;
