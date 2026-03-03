import { useState, useEffect } from "react";

import TaskList from "../components/task/TaskList";
import TaskHeader from "../components/task/TaskHeader";
import AddTaskButton from "../components/task/AddTaskButton";
import AddTaskForm from "../components/task/AddTaskForm";
import TaskFilters from "../components/task/TaskFilters";
import SearchBar from "../components/task/SearchBar";

function Task() {
  const [showForm, setShowForm] = useState(false); // Task form
  const [tasks, setTasks] = useState([]);

  // It loads only ONCE (When component load first time)
  useEffect(() => {
    fetch("https://taskify-backend-5yjr.onrender.com/tasks")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((task) => ({
          _id: task._id,
          title: task.taskname,
          description: task.description,
          category: task.category,
          status: task.status,
          deadline: new Date(task.deadline).toLocaleDateString(),
          priority: task.priority,
        }));

        setTasks(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  // Status update
  const toggleStatus = async (_id) => {
    const task = tasks.find((t) => t._id === _id);
    if (!task) return;

    const newStatus = task.status === "Completed" ? "Todo" : "Completed";

    const res = await fetch(`https://taskify-backend-5yjr.onrender.com/tasks/${_id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    const updatedTask = await res.json(); // Responce

    const formatted = {
      _id: updatedTask._id,
      title: updatedTask.taskname,
      description: updatedTask.description,
      category: updatedTask.category,
      status: updatedTask.status,
      deadline: new Date(updatedTask.deadline).toLocaleDateString(),
      priority: updatedTask.priority,
    };

    setTasks((prev) => prev.map((t) => (t._id === _id ? formatted : t)));
  };

  // Delete task
  const deleteTask = async (_id) => {
    await fetch(`https://taskify-backend-5yjr.onrender.com/tasks/${_id}`, {
      method: "DELETE",
    });

    setTasks((prev) => prev.filter((task) => task._id !== _id));
  };

  // Add task from form
  const addTask = async (newTask) => {
    const res = await fetch("https://taskify-backend-5yjr.onrender.com/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskname: newTask.taskname,
        description: newTask.description,
        category: newTask.category,
        deadline: newTask.deadline,
        priority: newTask.priority,
      }),
    });

    const savedTask = await res.json();

    const formatted = {
      _id: savedTask._id,
      title: savedTask.taskname,
      priority: savedTask.priority,
      category: savedTask.category,
      deadline: new Date(savedTask.deadline).toLocaleDateString(),
      status: savedTask.status,
    };

    setTasks((prev) => [formatted, ...prev]);
  };

  // Edit task
  const editTask = async (_id, editedTask) => {
    try {
      const res = await fetch(`https://taskify-backend-5yjr.onrender.com/tasks/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTask),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await res.json();

      const formatted = {
        _id: updatedTask._id,
        title: updatedTask.taskname,
        description: updatedTask.description,
        category: updatedTask.category,
        status: updatedTask.status,
        deadline: new Date(updatedTask.deadline).toLocaleDateString(),
        priority: updatedTask.priority,
      };

      setTasks((prev) =>
        prev.map((task) => (task._id === _id ? formatted : task)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-zinc-950 px-6 py-10 max-w-5xl mx-auto min-h-screen">
      <div className="pt-32">
        <TaskHeader count={tasks.length} />
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
        tasks={tasks}
        onToggleStatus={toggleStatus}
        onDelete={deleteTask}
        onUpdate={editTask}
      />
    </div>
  );
}

export default Task;
