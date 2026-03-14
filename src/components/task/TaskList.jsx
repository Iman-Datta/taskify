import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  variant,
  deleteCandidate,
  onToggleStatus,
  onDelete,
  onConfirmDelete,
  onCancelDelete,
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
          deleteCandidate={deleteCandidate}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onConfirmDelete={onConfirmDelete}
          onCancelDelete={onCancelDelete}
          onUpdate={onUpdate}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
}

export default TaskList;
