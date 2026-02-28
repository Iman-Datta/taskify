function AddTaskButton({ onClick }) {
  return (
    <button
    onClick={onClick}
      className="
    
    w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg mb-10"
    >
      <span className="text-xl font-semibold">+</span>
      Add Task
    </button>
  );
}

export default AddTaskButton;