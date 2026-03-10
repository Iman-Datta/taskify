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
          deadline: new Date(task.deadline).toLocaleDateString(),
          priority: task.priority,
        }));

        setCompletedTasks(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-zinc-950 px-6 py-10 max-w-5xl mx-auto min-h-screen">
      <div className="pt-32">
        <TaskHeader count={completedTasks.length} />
      </div>

      <TaskList tasks={completedTasks} />
    </div>
  );
}

export default Completed;
