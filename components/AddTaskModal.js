import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../theme';

const AddTaskModal = ({ visible, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('General');

    const handleAdd = () => {
        if (title.trim()) {
            onAdd(title, category, priority);
            setTitle('');
            setPriority('Medium');
            setCategory('General');
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.overlay}
            >
                <View style={styles.container}>
                    <Text style={styles.header}>New Task</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="What needs to be done?"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                    />

                    <View style={styles.optionRow}>
                        <Text style={styles.label}>Priority:</Text>
                        {['Low', 'Medium', 'High'].map(p => (
                            <TouchableOpacity
                                key={p}
                                style={[styles.chip, priority === p && styles.chipActive]}
                                onPress={() => setPriority(p)}
                            >
                                <Text style={[styles.chipText, priority === p && styles.chipTextActive]}>{p}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleAdd} style={styles.addBtn}>
                            <Text style={styles.addText}>Add Task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
    },
    header: {
        ...theme.typography.h2,
        marginBottom: theme.spacing.md,
    },
    input: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.lg,
        fontSize: 16,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    label: {
        color: theme.colors.textSecondary,
        marginRight: theme.spacing.md,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginRight: 8,
    },
    chipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    chipText: {
        color: theme.colors.textSecondary,
        fontSize: 12,
    },
    chipTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: theme.spacing.md,
    },
    cancelBtn: {
        padding: theme.spacing.md,
        marginRight: theme.spacing.md,
    },
    cancelText: {
        color: theme.colors.textSecondary,
    },
    addBtn: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.lg,
    },
    addText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default AddTaskModal;
