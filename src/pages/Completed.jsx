import { useState, useEffect } from "react";

import TaskList from "../components/task/TaskList";
import TaskHeader from "../components/task/TaskHeader";

const API = import.meta.env.VITE_API_URL;

function Completed() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetch(`${API}/tasks?status=Completed&isDeleted=false`, {
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
          deadline: task.deadline,
          priority: task.priority,
        }));

        setCompletedTasks(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  const restoreTask = async (id) => {
    try {
      const res = await fetch(`${API}/tasks/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: "Todo" }),
      });

      if (!res.ok) {
        throw new Error("Failed to restore task");
      }

      // remove task instantly from completed list
      setCompletedTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 px-6 py-10 max-w-5xl mx-auto min-h-screen transition-colors duration-300">
      <div className="pt-32">
        <TaskHeader count={completedTasks.length} title="Completed Tasks" />
      </div>

      <TaskList
        tasks={completedTasks}
        variant="completed"
        onRestore={restoreTask}
      />
    </div>
  );
}

export default Completed;
