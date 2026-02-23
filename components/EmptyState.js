import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const EmptyState = ({ message, icon = "list", subMessage }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={48} color={theme.colors.textSecondary} />
            </View>
            <Text style={styles.message}>{message}</Text>
            {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
        marginTop: theme.spacing.xl,
    },
    iconContainer: {
        marginBottom: theme.spacing.md,
        opacity: 0.5,
    },
    message: {
        ...theme.typography.h3,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xs,
    },
    subMessage: {
        ...theme.typography.caption,
        textAlign: 'center',
        color: theme.colors.textSecondary,
    },
});

export default EmptyState;
