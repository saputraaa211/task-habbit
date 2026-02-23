import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
    TASKS: '@smart_tracker_tasks',
    HABITS: '@smart_tracker_habits',
};

// Helper to sanitize boolean values from storage
// This is the CRITICAL fix for "java.lang.String cannot be cast to java.lang.Boolean"
const sanitizeBoolean = (val) => {
    if (val === true || val === 'true') return true;
    if (val === false || val === 'false') return false;
    return false; // Default to false if undefined/null/other junk
};

export const saveTasks = async (tasks) => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(KEYS.TASKS, jsonValue);
    } catch (e) {
        console.error('Error saving tasks:', e);
    }
};

export const loadTasks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(KEYS.TASKS);
        if (!jsonValue) return [];

        const rawData = JSON.parse(jsonValue);

        if (!Array.isArray(rawData)) return [];

        // Sanitize every task object
        return rawData.map(task => ({
            ...task,
            completed: sanitizeBoolean(task.completed), // FORCE boolean
            // Ensure other potential boolean fields are also sanitized if added later
        }));
    } catch (e) {
        console.error('Error loading tasks:', e);
        return [];
    }
};

export const saveHabits = async (habits) => {
    try {
        const jsonValue = JSON.stringify(habits);
        await AsyncStorage.setItem(KEYS.HABITS, jsonValue);
    } catch (e) {
        console.error('Error saving habits:', e);
    }
};

export const loadHabits = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(KEYS.HABITS);
        if (!jsonValue) return [];

        const rawData = JSON.parse(jsonValue);

        if (!Array.isArray(rawData)) return [];

        // Sanitize habits
        return rawData.map(habit => ({
            ...habit,
            // If we have any boolean flags in habits, sanitize them here too
            // e.g. if we had 'archived': sanitizeBoolean(habit.archived)
            completedDates: Array.isArray(habit.completedDates) ? habit.completedDates : [],
        }));
    } catch (e) {
        console.error('Error loading habits:', e);
        return [];
    }
};

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error('Error clearing data:', e);
    }
};
