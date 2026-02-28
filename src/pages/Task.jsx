import { useState } from "react";

import TaskList from "../components/task/TaskList";
import TaskHeader from "../components/task/TaskHeader";
import AddTaskButton from "../components/task/AddTaskButton";
import TaskFilters from "../components/task/TaskFilters";
import SearchBar from "../components/task/SearchBar";

function Task() {
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
    <>
      <div className="min-h-screen bg-gray-100 p-20">
        <TaskHeader count={mockTasks.length} />
        <TaskList tasks={mockTasks} />
        <AddTaskButton />
      </div>
      <div className="flex justify-between items-center mb-8 gap-4">
        <SearchBar />
        <TaskFilters />
      </div>
    </>
  );
}

export default Task;
