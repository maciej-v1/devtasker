import TasksPage from './pages/TasksPage';

/**
 * App-level composition layer: swap this for routing when you add more pages (settings, etc.).
 */
const AppContent = () => {
  return <TasksPage />;
};

export default AppContent;
