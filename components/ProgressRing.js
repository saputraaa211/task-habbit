import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { theme } from '../theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressRing = ({
    radius = 60,
    stroke = 10,
    progress = 0,
    color = theme.colors.primary,
    label = '',
    subLabel = ''
}) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = useRef(new Animated.Value(circumference)).current;

    useEffect(() => {
        const offset = circumference - (progress / 100) * circumference;

        Animated.timing(strokeDashoffset, {
            toValue: offset,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [progress, circumference]);

    return (
        <View style={{ width: radius * 2, height: radius * 2, alignItems: 'center', justifyContent: 'center' }}>
            <Svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            >
                <G rotation="-90" origin={`${radius}, ${radius}`}>
                    {/* Background Circle */}
                    <Circle
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        stroke={theme.colors.surfaceLight}
                        strokeWidth={stroke}
                    />
                    {/* Progress Circle */}
                    <AnimatedCircle
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        stroke={color}
                        strokeWidth={stroke}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
            <View style={StyleSheet.absoluteFillObject} justifyContent="center" alignItems="center">
                <Text style={styles.label}>{Math.round(progress)}%</Text>
                {!!label && <Text style={styles.subLabel}>{label}</Text>}
            </View>
            {!!subLabel && <Text style={styles.bottomLabel}>{subLabel}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        ...theme.typography.h2,
        color: '#FFF',
    },
    subLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
    bottomLabel: {
        position: 'absolute',
        bottom: -24,
        ...theme.typography.caption,
    },
});

export default ProgressRing;
