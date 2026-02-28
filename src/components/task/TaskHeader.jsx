function TaskHeader({ count }) {
  return (
    <div className="mb-7 -mt-10">
      <h1
        className="text-4xl font-light tracking-tight text-gray-800"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        My Tasks
      </h1>
      <p className="text-gray-600 ">{count} task</p>
    </div>
  );
}

export default TaskHeader;