import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Header toggleSidebar={toggleSidebar} />
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, width: '100%' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
