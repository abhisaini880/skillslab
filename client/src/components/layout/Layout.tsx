import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import SideNavigation from './SideNavigation';

const Layout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Width of the permanent sidebar
    const sidebarWidth = 80;

    const handleToggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />

            {/* Side Navigation - permanent on desktop, drawer on mobile */}
            <SideNavigation
                width={sidebarWidth}
                mobileOpen={mobileMenuOpen}
                handleToggleMobile={handleToggleMobileMenu}
            />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${sidebarWidth}px)` },
                    ml: { sm: `${sidebarWidth}px` },
                }}
            >
                <Box sx={{
                    p: { xs: 2, md: 4 },
                    pt: { xs: 4, md: 5 },
                    minHeight: '100vh'
                }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
