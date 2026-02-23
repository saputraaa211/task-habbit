import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

const HabitItem = ({ habit, onToggleDay, onDelete }) => {
    const today = new Date().toISOString().split('T')[0];
    const completedDates = habit.completedDates || [];
    const isDoneToday = completedDates.includes(today);

    // Generate last 7 days for the streak view
    const getLast7Days = () => {
        const dates = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            dates.push(d.toISOString().split('T')[0]);
        }
        return dates;
    };

    const weekDates = getLast7Days();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{habit.title}</Text>
                <TouchableOpacity
                    style={[styles.checkBtn, isDoneToday && { backgroundColor: habit.color || theme.colors.success }]}
                    onPress={() => onToggleDay(habit.id, today)}
                >
                    <Text style={styles.checkBtnText}>{isDoneToday ? 'Done' : 'Mark'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.streakRow}>
                {weekDates.map((date, index) => {
                    const isCompleted = completedDates.includes(date);
                    const isToday = date === today;
                    return (
                        <View key={date} style={styles.dayCol}>
                            <View
                                style={[
                                    styles.dot,
                                    isCompleted && { backgroundColor: habit.color || theme.colors.success },
                                    isToday && !isCompleted && styles.todayDot
                                ]}
                            />
                            <Text style={styles.dayLabel}>
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'narrow' })}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.medium,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    title: {
        ...theme.typography.h3,
        flex: 1,
    },
    checkBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: theme.colors.surfaceLight,
    },
    checkBtnText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000', // Text on button usually black for contrast if btn is light/colored
    },
    streakRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayCol: {
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.surfaceLight,
        marginBottom: 4,
    },
    todayDot: {
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
    },
    dayLabel: {
        fontSize: 10,
        color: theme.colors.textSecondary,
    },
});

export default HabitItem;
