# TaskHabbit 🚀

**TaskHabbit** is a modern, minimalist task management and habit-tracking application built with **React Native** and **Expo**. It helps you stay organized, build consistent daily habits, and visualize your progress with a clean and intuitive interface.

![app1](https://github.com/user-attachments/assets/415d88b3-e161-49f0-9ae2-81d5b7dfcadf)


## ✨ Key Features

- **📊 Dynamic Dashboard**: Get a quick overview of your daily progress. Visual progress rings show exactly how much you've accomplished for tasks and habits.
- **✅ Task Management**: Create, manage, and track your daily to-do list. Mark tasks as complete with satisfying feedback.
- **📅 Habit Tracking**: Build long-term streaks for your daily routines. Track completions by date and visualize your consistency.
- **🧠 Personalized Experience**: Daily quotes to keep you motivated and a clean interface designed for focus.
- **💾 Offline First**: Your data is saved locally using `AsyncStorage`, so you can track your progress even without an internet connection.

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54)
- **Library**: [React Native](https://reactnative.dev/)
- **Navigation**: [React Navigation](https://reactnavigation.org/) (Bottom Tabs, Native Stack)
- **State Management**: React Context API
- **Storage**: @react-native-async-storage/async-storage
- **UI Components**: Custom components including SVGs for progress visualization
- **Icons**: Expo Vector Icons (Ionicons)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/expo-go) app on your mobile device (for testing)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saputraaa211/task-habbit.git
   cd task-habbit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on your device**:
   Scan the QR code displayed in your terminal using the **Expo Go** app (Android) or the **Camera** app (iOS).

## 📁 Project Structure

```text
├── assets/             # Images, icons, and splash screens
├── components/         # Reusable UI components (Modals, Items, etc.)
├── contexts/           # State management (AppContext)
├── navigation/         # Navigation configuration
├── screens/            # Main application screens (Dashboard, Tasks, Habits)
├── theme.js            # Design system tokens (colors, typography, spacing)
├── utils/              # Helper functions and utilities
└── App.js              # Application entry point
```

Developed with ❤️ by [saputraaa211](https://github.com/saputraaa211)
