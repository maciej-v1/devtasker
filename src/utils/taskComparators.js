// Compare two arrays of task objects
export const areTasksEqual = (prev, next) => {
  if (prev.length !== next.length) return false;

  for (let i = 0; i < prev.length; i++) {
    const a = prev[i];
    const b = next[i];

    if (a.id !== b.id) return false;
    if (a.title !== b.title || a.done !== b.done) return false;
  }

  return true;
};

// Compare props passed into TaskList
export const compareTaskListProps = (prevProps, nextProps) => {
  return (
    areTasksEqual(prevProps.tasks, nextProps.tasks) &&
    prevProps.onToggle === nextProps.onToggle &&
    prevProps.onDelete === nextProps.onDelete
  );
};