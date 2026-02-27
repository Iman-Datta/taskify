// src/components/TaskList.jsx
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-8">
        No tasks yet. Add one 👀
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;