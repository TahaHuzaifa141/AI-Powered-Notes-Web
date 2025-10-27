import { createTheme } from '@mui/material/styles';

// Define color palette
const colors = {
  primary: {
    50: '#f0f4ff',
    100: '#e0e9ff',
    200: '#c7d6fe',
    300: '#a5b8fc',
    400: '#8b91f8',
    500: '#667eea', // Main primary
    600: '#5a67d8',
    700: '#4c51bf',
    800: '#434190',
    900: '#3c366b',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#764ba2', // Main secondary
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#10b981',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
};

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
      contrastText: '#ffffff',
    },
    error: {
      main: colors.error[500],
      light: colors.error[300],
      dark: colors.error[700],
    },
    warning: {
      main: colors.warning[500],
      light: colors.warning[300],
      dark: colors.warning[700],
    },
    success: {
      main: colors.success[500],
      light: colors.success[300],
      dark: colors.success[700],
    },
    grey: colors.neutral,
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: colors.neutral[800],
      secondary: colors.neutral[600],
    },
    divider: 'rgba(255, 255, 255, 0.2)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: colors.neutral[500],
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.1)',
    '0 4px 6px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 20px 25px rgba(0, 0, 0, 0.1)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.12)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 12px 48px rgba(0, 0, 0, 0.15)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 16px 64px rgba(0, 0, 0, 0.18)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 20px 80px rgba(0, 0, 0, 0.20)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 24px 96px rgba(0, 0, 0, 0.22)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 28px 112px rgba(0, 0, 0, 0.24)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 32px 128px rgba(0, 0, 0, 0.26)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 36px 144px rgba(0, 0, 0, 0.28)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 40px 160px rgba(0, 0, 0, 0.30)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 44px 176px rgba(0, 0, 0, 0.32)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 48px 192px rgba(0, 0, 0, 0.34)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 52px 208px rgba(0, 0, 0, 0.36)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 56px 224px rgba(0, 0, 0, 0.38)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 60px 240px rgba(0, 0, 0, 0.40)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 64px 256px rgba(0, 0, 0, 0.42)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 68px 272px rgba(0, 0, 0, 0.44)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 72px 288px rgba(0, 0, 0, 0.46)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 76px 304px rgba(0, 0, 0, 0.48)',
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 80px 320px rgba(0, 0, 0, 0.50)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        elevation1: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        },
        elevation3: {
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 16,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: '0 4px 14px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          color: colors.neutral[700],
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            borderColor: colors.primary[300],
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: colors.primary[300],
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary[500],
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 20,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          color: colors.primary[700],
          border: `1px solid ${colors.primary[200]}`,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 20,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 8,
          fontSize: '0.75rem',
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});

export default theme;