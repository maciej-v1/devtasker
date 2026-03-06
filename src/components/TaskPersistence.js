export const TASKS_KEY_NAME = 'devtasker-tasks';

export const saveTasks = tasks => {
    try {
        localStorage.setItem(TASKS_KEY_NAME, JSON.stringify(Array.isArray(tasks) ? tasks : []));
    } catch (error) {
        console.error('Failed to save tasks:', error);
    }
    localStorage.setItem(TASKS_KEY_NAME, JSON.stringify(tasks));
}

export const getTasks = () => {
    try {
        return JSON.parse(localStorage.getItem(TASKS_KEY_NAME)) || [];
    } catch (error) {
        console.error('Failed to retrieve tasks:', error);
        return [];
    }
}