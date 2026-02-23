import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const TaskItem = ({ task, onToggle, onDelete }) => {
    // Defensive check: Ensure we strictly have a boolean
    const isCompleted = !!task.completed;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.checkbox, isCompleted && styles.checkboxChecked]}
                onPress={() => onToggle(task.id)}
            >
                {isCompleted && <Ionicons name="checkmark" size={16} color="#000" />}
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={[styles.title, isCompleted && styles.titleCompleted]}>
                    {task.title}
                </Text>
                <View style={styles.metaRow}>
                    <Text style={styles.category}>{task.category}</Text>
                    {task.priority === 'High' && (
                        <View style={styles.priorityBadge}>
                            <Text style={styles.priorityText}>High</Text>
                        </View>
                    )}
                </View>
            </View>

            <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.small,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    checkboxChecked: {
        backgroundColor: theme.colors.primary,
    },
    content: {
        flex: 1,
    },
    title: {
        ...theme.typography.body,
        marginBottom: 4,
    },
    titleCompleted: {
        textDecorationLine: 'line-through',
        color: theme.colors.textSecondary,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    category: {
        ...theme.typography.caption,
        marginRight: theme.spacing.sm,
    },
    priorityBadge: {
        backgroundColor: 'rgba(207, 102, 121, 0.2)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    priorityText: {
        fontSize: 10,
        color: theme.colors.error,
        fontWeight: 'bold',
    },
    deleteBtn: {
        padding: theme.spacing.sm,
    },
});

export default TaskItem;
