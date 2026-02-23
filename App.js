import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { AppProvider } from './contexts/AppContext';
import AppNavigator from './navigation/AppNavigator';
import { theme } from './theme';

export default function App() {
  const navTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.secondary,
    },
  };

  return (
    <AppProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
