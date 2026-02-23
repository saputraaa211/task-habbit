export const theme = {
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    surfaceLight: '#2C2C2C',
    primary: '#00E5FF', // Cyan accent
    secondary: '#BB86FC', // Purple accent
    error: '#CF6679',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#333333',
    success: '#03DAC6',
    warning: '#FFB74D',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
    round: 9999,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: '700', color: '#FFFFFF' },
    h2: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
    h3: { fontSize: 20, fontWeight: '600', color: '#FFFFFF' },
    body: { fontSize: 16, color: '#FFFFFF' },
    caption: { fontSize: 12, color: '#B0B0B0' },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 4,
    },
  },
};
