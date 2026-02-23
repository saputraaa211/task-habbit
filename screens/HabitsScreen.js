import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import HabitItem from '../components/HabitItem';
import AddHabitModal from '../components/AddHabitModal';
import EmptyState from '../components/EmptyState';
import { theme } from '../theme';

const HabitsScreen = () => {
    const { state, addHabit, toggleHabitDay, deleteHabit } = useApp();
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Habits</Text>
                    <Text style={styles.subtitle}>Build your streaks</Text>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={state.habits}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <HabitItem
                        habit={item}
                        onToggleDay={toggleHabitDay}
                        onDelete={deleteHabit}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <EmptyState
                        message="No habits yet"
                        subMessage="Start tracking a new habit today!"
                        icon="calendar-outline"
                    />
                }
            />

            <AddHabitModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={addHabit}
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
        backgroundColor: theme.colors.secondary,
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.medium,
    },
    listContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 80,
    },
});

export default HabitsScreen;
