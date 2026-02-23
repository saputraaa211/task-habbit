import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../theme';

const COLORS = ['#00E5FF', '#BB86FC', '#03DAC6', '#FFB74D', '#CF6679'];

const AddHabitModal = ({ visible, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);

    const handleAdd = () => {
        if (title.trim()) {
            onAdd(title, selectedColor);
            setTitle('');
            setSelectedColor(COLORS[0]);
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
                    <Text style={styles.header}>New Habit</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Habit name (e.g. Read 30 mins)"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                    />

                    <View style={styles.colorRow}>
                        <Text style={styles.label}>Color:</Text>
                        {COLORS.map(c => (
                            <TouchableOpacity
                                key={c}
                                style={[styles.colorCircle, { backgroundColor: c }, selectedColor === c && styles.colorSelected]}
                                onPress={() => setSelectedColor(c)}
                            />
                        ))}
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleAdd} style={styles.addBtn}>
                            <Text style={styles.addText}>Start Habit</Text>
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
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    label: {
        color: theme.colors.textSecondary,
        marginRight: theme.spacing.md,
    },
    colorCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 12,
    },
    colorSelected: {
        borderWidth: 2,
        borderColor: '#FFF',
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

export default AddHabitModal;
