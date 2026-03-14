import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import TaskList from "../components/task/TaskList";
import TaskHeader from "../components/task/TaskHeader";

const API = import.meta.env.VITE_API_URL;

function Trash() {
  const [trashTasks, setTrashTasks] = useState([]);

  useEffect(() => {
    fetch(`${API}/tasks?isDeleted=true`, {
      credentials: "include",
    })
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

        setTrashTasks(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  async function restoreTask(id) {
    try {
      const res = await fetch(`${API}/tasks/${id}/restore`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to restore task");
      }

      // remove task from trash list instantly
      setTrashTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task restored to active tasks.");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 px-6 py-10 max-w-5xl mx-auto min-h-screen transition-colors duration-300">
      <div className="pt-32">
        <TaskHeader count={trashTasks.length} title="Recycle Bin" />
      </div>

      <TaskList tasks={trashTasks} onRestore={restoreTask} variant="trash" />
    </div>
  );
}

export default Trash;
