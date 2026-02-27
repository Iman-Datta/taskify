// src/pages/Tasks.jsx
import { useState } from "react";
import TaskList from "../components/TaskList";

function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Math Assignment",
      description: "Complete chapter 5",
      priority: "medium",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      description: "",
      priority: "low",
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
        <p className="text-gray-500 mt-1">{tasks.length} task(s)</p>

        {/* Add Task */}
        <div className="mt-6 flex gap-3">
          <input
            type="text"
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="mt-6">
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
