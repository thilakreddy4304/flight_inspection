import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import FlightDetail from './pages/FlightDetail';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import TeamSelection from './pages/TeamSelection/teamSelection';
import Dashboard from './pages/Dashboard/dashboard';
import SimulationPage from './pages/InspectionPages/InspectionStages';

// Team Selection Guard
const TeamSelectionGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, hasSelectedTeam } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!hasSelectedTeam) {
    return <Navigate to="/select-team" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/select-team" element={
            <ProtectedRoute>
              <TeamSelection />
            </ProtectedRoute>
          } />

          {/* Protected Routes that require both auth and team selection */}
          <Route path="/" element={
            <TeamSelectionGuard>
              <Dashboard />
            </TeamSelectionGuard>
          } />
          <Route path="/introHome" element={
            <TeamSelectionGuard>
              <Dashboard />
            </TeamSelectionGuard>
          } />
          <Route path="/:view" element={
            <TeamSelectionGuard>
              <Dashboard />
            </TeamSelectionGuard>
          } />
          <Route path="/flights/:id" element={
            <TeamSelectionGuard>
              <FlightDetail />
            </TeamSelectionGuard>
          } />
          <Route path="/flight/:flightId" element={
            <TeamSelectionGuard>
              <FlightDetail />
            </TeamSelectionGuard>
          } />
          
          {/* InspectionPages - using state-based navigation */}
          <Route path="/InspectionPages" element={
            <TeamSelectionGuard>
              <SimulationPage />
            </TeamSelectionGuard>
          } />
          
          {/* Redirect any unknown routes to sign in */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
