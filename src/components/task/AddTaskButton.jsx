function AddTaskButton() {
  return (
    <button
      className="
        flex items-center gap-2
        bg-blue-600 text-white
        px-4 py-2 rounded-xl
        font-medium
        hover:bg-blue-700
        transition duration-200
        shadow-sm hover:shadow-md
      "
    >
      <span className="text-lg">+</span>
      Add Task
    </button>
  );
}

export default AddTaskButton;