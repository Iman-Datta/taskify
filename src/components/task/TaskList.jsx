import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  variant,
  onToggleStatus,
  onDelete,
  onUpdate,
  onRestore,
}) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          variant={variant}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
}

export default TaskList;
