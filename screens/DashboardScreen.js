import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useApp } from '../contexts/AppContext';
import ProgressRing from '../components/ProgressRing';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
    const { state } = useApp();

    // Calculate Task Progress
    const today = new Date().toISOString().split('T')[0];
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(t => t.completed).length;
    const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Calculate Habit Progress (for today)
    const totalHabits = state.habits.length;
    const completedHabitsToday = state.habits.filter(h =>
        (h.completedDates || []).includes(today)
    ).length;
    const habitProgress = totalHabits > 0 ? (completedHabitsToday / totalHabits) * 100 : 0;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <Text style={styles.greeting}>Hello, Achiever</Text>
                    <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.ringCard}>
                        <Text style={styles.cardTitle}>Tasks</Text>
                        <ProgressRing
                            progress={taskProgress}
                            radius={width * 0.18}
                            stroke={12}
                            color={theme.colors.primary}
                            label={`${completedTasks}/${totalTasks}`}
                        />
                    </View>
                    <View style={styles.ringCard}>
                        <Text style={styles.cardTitle}>Habits</Text>
                        <ProgressRing
                            progress={habitProgress}
                            radius={width * 0.18}
                            stroke={12}
                            color={theme.colors.secondary}
                            label={`${completedHabitsToday}/${totalHabits}`}
                        />
                    </View>
                </View>

                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>"Success is the sum of small efforts, repeated day in and day out."</Text>
                    <Text style={styles.quoteAuthor}>- Robert Collier</Text>
                </View>

                <View style={styles.summarySection}>
                    <Text style={styles.sectionHeader}>Overview</Text>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>{totalTasks}</Text>
                            <Text style={styles.summaryLabel}>Total Tasks</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>{totalHabits}</Text>
                            <Text style={styles.summaryLabel}>Active Habits</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>{completedTasks}</Text>
                            <Text style={styles.summaryLabel}>Completed</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        padding: theme.spacing.lg,
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    greeting: {
        ...theme.typography.h1,
        color: theme.colors.primary,
    },
    date: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xl,
    },
    ringCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        alignItems: 'center',
        width: '48%',
        ...theme.shadows.medium,
    },
    cardTitle: {
        ...theme.typography.h3,
        marginBottom: theme.spacing.lg,
    },
    quoteCard: {
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.xl,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    quoteText: {
        ...theme.typography.body,
        fontStyle: 'italic',
        marginBottom: theme.spacing.sm,
    },
    quoteAuthor: {
        ...theme.typography.caption,
        textAlign: 'right',
    },
    summarySection: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
    },
    sectionHeader: {
        ...theme.typography.h3,
        marginBottom: theme.spacing.lg,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    summaryItem: {
        alignItems: 'center',
    },
    summaryValue: {
        ...theme.typography.h2,
        color: theme.colors.primary,
    },
    summaryLabel: {
        ...theme.typography.caption,
        marginTop: 4,
    },
});

export default DashboardScreen;
