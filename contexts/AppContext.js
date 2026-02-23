import React, { createContext, useReducer, useEffect, useContext } from 'react';
import uuid from 'react-native-uuid';
import { saveTasks, loadTasks, saveHabits, loadHabits } from '../utils/storage';

const AppContext = createContext();

const initialState = {
    tasks: [],
    habits: [],
    isLoading: true,
};

const ACTIONS = {
    LOAD_DATA: 'LOAD_DATA',
    ADD_TASK: 'ADD_TASK',
    TOGGLE_TASK: 'TOGGLE_TASK',
    DELETE_TASK: 'DELETE_TASK',
    ADD_HABIT: 'ADD_HABIT',
    TOGGLE_HABIT_DAY: 'TOGGLE_HABIT_DAY',
    DELETE_HABIT: 'DELETE_HABIT',
};

const appReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_DATA:
            return {
                ...state,
                tasks: action.payload.tasks || [],
                habits: action.payload.habits || [],
                isLoading: false,
            };
        case ACTIONS.ADD_TASK:
            const newTasksAdd = [action.payload, ...state.tasks];
            saveTasks(newTasksAdd); // Persist
            return { ...state, tasks: newTasksAdd };

        case ACTIONS.TOGGLE_TASK:
            const newTasksToggle = state.tasks.map(task =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed } // Toggle boolean
                    : task
            );
            saveTasks(newTasksToggle); // Persist
            return { ...state, tasks: newTasksToggle };

        case ACTIONS.DELETE_TASK:
            const newTasksDelete = state.tasks.filter(task => task.id !== action.payload);
            saveTasks(newTasksDelete); // Persist
            return { ...state, tasks: newTasksDelete };

        case ACTIONS.ADD_HABIT:
            const newHabitsAdd = [action.payload, ...state.habits];
            saveHabits(newHabitsAdd); // Persist
            return { ...state, habits: newHabitsAdd };

        case ACTIONS.TOGGLE_HABIT_DAY:
            // payload: { habitId, dateString }
            const newHabitsToggle = state.habits.map(habit => {
                if (habit.id === action.payload.habitId) {
                    const dates = habit.completedDates || [];
                    const dateExists = dates.includes(action.payload.dateString);
                    const newDates = dateExists
                        ? dates.filter(d => d !== action.payload.dateString)
                        : [...dates, action.payload.dateString];

                    return { ...habit, completedDates: newDates };
                }
                return habit;
            });
            saveHabits(newHabitsToggle); // Persist
            return { ...state, habits: newHabitsToggle };

        case ACTIONS.DELETE_HABIT:
            const newHabitsDelete = state.habits.filter(habit => habit.id !== action.payload);
            saveHabits(newHabitsDelete); // Persist
            return { ...state, habits: newHabitsDelete };

        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        const load = async () => {
            try {
                const [tasks, habits] = await Promise.all([loadTasks(), loadHabits()]);
                dispatch({ type: ACTIONS.LOAD_DATA, payload: { tasks, habits } });
            } catch (error) {
                console.error("Failed to load data", error);
                // Fallback to empty state to avoid crash
                dispatch({ type: ACTIONS.LOAD_DATA, payload: { tasks: [], habits: [] } });
            }
        };
        load();
    }, []);

    const addTask = (title, category = 'General', priority = 'Medium') => {
        const newTask = {
            id: uuid.v4(), // Generate unique ID
            title,
            category,
            priority,
            completed: false, // Explicit boolean
            createdAt: new Date().toISOString(),
        };
        dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
    };

    const toggleTask = (id) => {
        dispatch({ type: ACTIONS.TOGGLE_TASK, payload: id });
    };

    const deleteTask = (id) => {
        dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
    };

    const addHabit = (title, color = '#00E5FF') => {
        const newHabit = {
            id: uuid.v4(),
            title,
            color,
            completedDates: [],
            createdAt: new Date().toISOString(),
        };
        dispatch({ type: ACTIONS.ADD_HABIT, payload: newHabit });
    };

    const toggleHabitDay = (habitId, dateString) => {
        dispatch({ type: ACTIONS.TOGGLE_HABIT_DAY, payload: { habitId, dateString } });
    };

    const deleteHabit = (id) => {
        dispatch({ type: ACTIONS.DELETE_HABIT, payload: id });
    };

    return (
        <AppContext.Provider
            value={{
                state,
                addTask,
                toggleTask,
                deleteTask,
                addHabit,
                toggleHabitDay,
                deleteHabit
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
