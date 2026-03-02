import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleStatus, onDelete }) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
