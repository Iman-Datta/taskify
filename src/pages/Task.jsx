import { useState, useEffect } from "react";

import TaskList from "../components/task/TaskList";
import TaskHeader from "../components/task/TaskHeader";
import AddTaskButton from "../components/task/AddTaskButton";
import AddTaskForm from "../components/task/AddTaskForm";
import TaskFilters from "../components/task/TaskFilters";
import SearchBar from "../components/task/SearchBar";

function Task() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((task) => ({
          _id: task._id,
          title: task.taskname,
          priority: task.category,
          dueDate: new Date(task.deadline).toLocaleDateString(),
          status: task.status,
        }));

        setTasks(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  // Toggle status
  const toggleStatus = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    const newStatus =
      task.status === "completed" ? "todo" : "completed";

    const res = await fetch(
      `http://localhost:5000/tasks/${id}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const updatedTask = await res.json();

    const formatted = {
      _id: updatedTask._id,
      title: updatedTask.taskname,
      priority: updatedTask.category,
      dueDate: new Date(updatedTask.deadline).toLocaleDateString(),
      status: updatedTask.status,
    };

    setTasks((prev) =>
      prev.map((t) => (t._id === id ? formatted : t))
    );
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  // Add task from form
  const addTask = async (newTask) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskname: newTask.title,
        category: newTask.priority,
        deadline: new Date(),
        status: "todo",
      }),
    });

    const savedTask = await res.json();

    const formatted = {
      _id: savedTask._id,
      title: savedTask.taskname,
      priority: savedTask.category,
      dueDate: new Date(savedTask.deadline).toLocaleDateString(),
      status: savedTask.status,
    };

    setTasks((prev) => [formatted, ...prev]);
  };

  return (
    <div className="bg-zinc-950 px-6 py-10 max-w-5xl mx-auto min-h-screen">
      <div className="pt-32">
        <TaskHeader count={tasks.length} />
        {!showForm && (
          <AddTaskButton onClick={() => setShowForm(true)} />
        )}
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
        tasks={tasks}
        onToggleStatus={toggleStatus}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default Task;