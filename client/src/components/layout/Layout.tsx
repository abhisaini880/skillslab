import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            
            {/* Header - Primary navigation */}
            <Header />
            
            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    bgcolor: 'background.default'
                }}
            >
                <Toolbar /> {/* Empty toolbar to push content below app bar */}
                <Box sx={{
                    p: { xs: 2, md: 3 },
                    pt: { xs: 2, md: 3 },
                    minHeight: 'calc(100vh - 64px)' // Account for header height
                }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
