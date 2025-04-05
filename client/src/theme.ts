import { createTheme, alpha } from '@mui/material/styles';

// Create a modern, futuristic theme for SkillsLab 2030
const theme = createTheme({
    palette: {
        mode: 'dark', // Using dark mode as the base for futuristic look
        primary: {
            main: '#6E56CF', // Modern purple with high saturation
            light: '#9D8DF1',
            dark: '#4A3AA3',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#00D5FF', // Bright neon cyan
            light: '#70FFFF',
            dark: '#00A3CC',
            contrastText: '#111827',
        },
        background: {
            default: '#0A0A1B', // Deep space black-blue
            paper: '#16162A', // Slightly lighter for cards
        },
        error: {
            main: '#FF4079', // Neon pink for errors
        },
        warning: {
            main: '#FFBA08', // Bright amber
        },
        success: {
            main: '#12D6A3', // Teal green
        },
        info: {
            main: '#6E56CF',
        },
        text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2.25rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.875rem',
            fontWeight: 600,
            letterSpacing: '-0.005em',
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 16,
    },
    shadows: [
        'none',
        '0px 2px 4px rgba(0, 0, 0, 0.4)', // Custom shadow 1
        '0px 4px 8px rgba(110, 86, 207, 0.15)', // Primary-colored shadow for subtle glow
        // ... keep remaining shadow array values
        '0px 8px 16px rgba(110, 86, 207, 0.2)',
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          scrollbar-width: thin;
          background: linear-gradient(135deg, #0A0A1B 0%, #16162A 100%);
        }
      `,
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 12,
                    padding: '10px 22px',
                    fontWeight: 500,
                    boxShadow: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 25px -5px rgba(110, 86, 207, 0.3)',
                    },
                },
                contained: {
                    background: 'linear-gradient(90deg, #6E56CF 0%, #9D8DF1 100%)',
                },
                outlined: {
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    background: 'linear-gradient(135deg, rgba(22, 22, 42, 0.9) 0%, rgba(10, 10, 27, 0.7) 100%)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Remove default background
                },
                elevation1: {
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                },
                elevation2: {
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(10, 10, 27, 0.8)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha('#6E56CF', 0.3)}`,
                        },
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(110, 86, 207, 0.15)',
                        '&:hover': {
                            backgroundColor: 'rgba(110, 86, 207, 0.2)',
                        },
                    },
                },
            },
        },
    },
});

export default theme;
