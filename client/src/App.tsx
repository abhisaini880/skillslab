import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import ProblemsListPage from '@/pages/ProblemsListPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import RequireAuth from '@/components/auth/RequireAuth';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminProblemListPage from '@/pages/AdminProblemListPage';
import AdminProblemPage from '@/pages/AdminProblemPage';
import ProblemDetailPage from '@/pages/ProblemDetailPage'; // Import the real component

// Adding temporary placeholders for missing components
import { Box, Typography } from '@mui/material';

const NotFoundPage = () => (
    <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4">404 - Page Not Found</Typography>
    </Box>
);

const ProfilePage = () => (
    <Box sx={{ p: 4 }}>
        <Typography variant="h4">Profile Page</Typography>
        <Typography>This page is under development</Typography>
    </Box>
);

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/problems" element={<ProblemsListPage />} />
                <Route path="/problems/:id" element={<ProblemDetailPage />} />

                {/* Protected Routes for Regular Users */}
                <Route element={<RequireAuth />}>
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* Protected Routes for Admin Users */}
                <Route element={<RequireAuth requireAdmin={true} />}>
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/problems" element={<AdminProblemListPage />} />
                    <Route path="/admin/problems/new" element={<AdminProblemPage />} />
                    <Route path="/admin/problems/:id" element={<AdminProblemPage />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;
