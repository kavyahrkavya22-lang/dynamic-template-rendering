import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CustomizerProvider } from './context/CustomizerContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import TemplateGalleryPage from './pages/TemplateGalleryPage';
import CustomizerPage from './pages/CustomizerPage';
import DashboardPage from './pages/DashboardPage';
import PublicSiteViewerPage from './pages/PublicSiteViewerPage';
import AdminTemplatesPage from './pages/AdminTemplatesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Layout wrapper conditionally rendering Navbar and Footer
const AppLayout = ({ children }) => {
  const location = useLocation();

  // Hide global navbar and footer on standalone builder studio and public live viewer
  const isBuilder = location.pathname.startsWith('/builder');
  const isPublicSite = location.pathname.startsWith('/site/');

  if (isBuilder || isPublicSite) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CustomizerProvider>
        <Router>
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/templates" element={<TemplateGalleryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Standalone Public Live Website */}
              <Route path="/site/:slug" element={<PublicSiteViewerPage />} />

              {/* Protected Builder Studio Routes */}
              <Route
                path="/builder/:templateId"
                element={
                  <ProtectedRoute>
                    <CustomizerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/builder/site/:siteId"
                element={
                  <ProtectedRoute>
                    <CustomizerPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected User Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Template Studio */}
              <Route
                path="/admin/templates"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminTemplatesPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Catch-All */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </AppLayout>
        </Router>
      </CustomizerProvider>
    </AuthProvider>
  );
}

export default App;
