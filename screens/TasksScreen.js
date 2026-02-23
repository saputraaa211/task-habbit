import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import EmptyState from '../components/EmptyState';
import { theme } from '../theme';

const TasksScreen = () => {
    const { state, addTask, toggleTask, deleteTask } = useApp();
    const [filter, setFilter] = useState('All'); // All, Active, Completed
    const [isModalVisible, setModalVisible] = useState(false);

    const filteredTasks = state.tasks.filter(task => {
        if (filter === 'Active') return !task.completed;
        if (filter === 'Completed') return task.completed;
        return true;
    });

    const activeCount = state.tasks.filter(t => !t.completed).length;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>My Tasks</Text>
                    <Text style={styles.subtitle}>{activeCount} active tasks</Text>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.filterRow}>
                {['All', 'Active', 'Completed'].map(f => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.filterChip, filter === f && styles.filterChipActive]}
                        onPress={() => setFilter(f)}
                    >
                        <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <EmptyState
                        message="No tasks found"
                        subMessage={filter === 'All' ? "Start by adding a new task!" : "Try changing the filter."}
                        icon="checkbox-outline"
                    />
                }
            />

            <AddTaskModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={addTask}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        ...theme.typography.h1,
    },
    subtitle: {
        ...theme.typography.caption,
        marginTop: 4,
    },
    addButton: {
        backgroundColor: theme.colors.primary,
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.medium,
    },
    filterRow: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
        marginRight: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    filterChipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    filterText: {
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    filterTextActive: {
        color: '#000',
    },
    listContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 80, // Space for bottom tab bar if needed
    },
});

export default TasksScreen;
