function TaskHeader({ title, count }) {
  return (
    <div className="mb-7 -mt-10">
      <h1
        className="text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {title}
      </h1>

      <p className="text-zinc-600 dark:text-zinc-500 mt-1">
        {count} task{count !== 1 && "s"}
      </p>
    </div>
  );
}

export default TaskHeader;
