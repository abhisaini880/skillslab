import { createTheme, alpha } from '@mui/material/styles';

// Create a modern theme with dark mode
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6366f1', // Indigo color that stands out well on dark backgrounds
            light: '#818cf8',
            dark: '#4f46e5',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#10b981', // Emerald green for accents
            light: '#34d399',
            dark: '#059669',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#111827', // Deep blue-gray for background
            paper: '#1f2937', // Slightly lighter for cards and surfaces
        },
        error: {
            main: '#ef4444', // Red that works well in dark mode
            light: '#f87171',
            dark: '#dc2626',
        },
        warning: {
            main: '#f59e0b', // Amber for warnings that's visible on dark
            light: '#fbbf24',
            dark: '#d97706',
        },
        success: {
            main: '#10b981', // Green for success messages
            light: '#34d399',
            dark: '#059669',
        },
        info: {
            main: '#3b82f6', // Blue for info messages
            light: '#60a5fa',
            dark: '#2563eb',
        },
        text: {
            primary: '#f9fafb',
            secondary: '#d1d5db',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        action: {
            active: '#ffffff',
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.16)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.75rem',
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
        borderRadius: 4, // Using consistent border radius of 4px as requested
    },
    shadows: [
        'none',
        '0 1px 2px rgba(0, 0, 0, 0.25)', 
        '0 2px 4px rgba(0, 0, 0, 0.3)',
        '0 4px 8px rgba(0, 0, 0, 0.35)',
        '0 8px 16px rgba(0, 0, 0, 0.4)',
        '0 12px 24px rgba(0, 0, 0, 0.45)',
        '0 16px 32px rgba(0, 0, 0, 0.5)',
        '0 20px 40px rgba(0, 0, 0, 0.55)',
        '0 24px 48px rgba(0, 0, 0, 0.6)',
        '0 30px 60px rgba(0, 0, 0, 0.65)',
        '0 36px 72px rgba(0, 0, 0, 0.7)',
        '0 42px 84px rgba(0, 0, 0, 0.75)',
        '0 48px 96px rgba(0, 0, 0, 0.8)',
        '0 54px 108px rgba(0, 0, 0, 0.85)',
        '0 60px 120px rgba(0, 0, 0, 0.9)',
        '0 66px 132px rgba(0, 0, 0, 0.95)',
        '0 72px 144px rgba(0, 0, 0, 1)',
        '0 78px 156px rgba(0, 0, 0, 1.05)',
        '0 84px 168px rgba(0, 0, 0, 1.1)',
        '0 90px 180px rgba(0, 0, 0, 1.15)',
        '0 96px 192px rgba(0, 0, 0, 1.2)',
        '0 102px 204px rgba(0, 0, 0, 1.25)',
        '0 108px 216px rgba(0, 0, 0, 1.3)',
        '0 114px 228px rgba(0, 0, 0, 1.35)',
        '0 120px 240px rgba(0, 0, 0, 1.4)',
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                
                body {
                    scrollbar-width: thin;
                    background: #111827;
                }
                
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #1f2937;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: #4b5563;
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #6b7280;
                }
            `,
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    padding: '6px 16px',
                    fontWeight: 500,
                    boxShadow: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    },
                },
                contained: {
                    color: '#ffffff', // Light text for all contained buttons
                    background: 'linear-gradient(90deg, #6366f1, #4f46e5)',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #4f46e5, #4338ca)',
                    }
                },
                outlined: {
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                    },
                },
                text: {
                    '&:hover': {
                        backgroundColor: alpha('#6366f1', 0.08),
                    }
                },
                containedPrimary: {
                    color: '#ffffff',
                },
                containedSecondary: {
                    color: '#ffffff',
                },
                containedError: {
                    color: '#ffffff',
                },
                containedWarning: {
                    color: '#ffffff',
                },
                containedSuccess: {
                    color: '#ffffff',
                },
                containedInfo: {
                    color: '#ffffff',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Remove default background
                    borderRadius: 4,
                },
                elevation1: {
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                },
                elevation2: {
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(31, 41, 55, 0.9)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.5)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                        '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha('#6366f1', 0.2)}`,
                        },
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    fontWeight: 500,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    '&.Mui-selected': {
                        backgroundColor: alpha('#6366f1', 0.15),
                        '&:hover': {
                            backgroundColor: alpha('#6366f1', 0.2),
                        },
                    },
                    '&:hover': {
                        backgroundColor: alpha('#6366f1', 0.08),
                    },
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha('#6366f1', 0.1),
                    '& .MuiTableCell-head': {
                        fontWeight: 600,
                        color: '#f9fafb',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '16px',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    minHeight: '40px',
                    borderRadius: 4,
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                }
            }
        }
    },
});

export default theme;
