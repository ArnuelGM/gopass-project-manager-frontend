import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Dashboard from '../pages/Dashboard';
import ProjectDetails from '../pages/ProjectDetails';
import NotFound from '../pages/NotFound';

/**
 * Main routing configuration for the application.
 * Uses a Layout wrapper to provide consistent navigation and structure.
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside this Route will be rendered within the Layout component */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<Dashboard />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          
          {/* Fallback for undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;