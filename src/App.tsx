import AppContent from './AppContent';
import styles from './App.module.css';

/** Root layout shell; features mount under `AppContent` as the app grows. */
const App = () => {
  return (
    <main className={styles.app}>
      <AppContent />
    </main>
  );
};

export default App;
