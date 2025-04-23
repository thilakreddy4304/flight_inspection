import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import GlobalStyles from './styles/GlobalStyles';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResponsiveProvider } from './context/ResponsiveContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
// import FlightDetail from './pages/FlightDetail';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import TeamSelection from './pages/TeamSelection/teamSelection';
import Dashboard from './pages/Dashboard/dashboard';
import InspectionPages from './pages/InspectionPages/InspectionStages';
import FlightInspection from './components/FlightInspection/FlightInspection';
import InspectionTypes from './components/InspectionTypes/InspectionTypes';
import WorkOrderManagement from './pages/WorkOrderManagement/workOrderManagement';
import WorkOrderDetail from './pages/WorkOrderManagement/workOrderManagement2';
import WorkOrderManagementPages from './pages/WorkOrderManagement/WorkOrderManagementPages';

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
    <ResponsiveProvider>
      <AuthProvider>
        <GlobalStyles />
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
            {/* <Route path="/flights/:id" element={
              <TeamSelectionGuard>
                <FlightDetail />
              </TeamSelectionGuard>
            } />
            <Route path="/flight/:flightId" element={
              <TeamSelectionGuard>
                <FlightDetail />
              </TeamSelectionGuard>
            } /> */}
            
            {/* Add dedicated route for inspections with query parameters */}
            <Route path="/inspections" element={
              <TeamSelectionGuard>
                {/* <FlightInspection /> */}
                <Dashboard />
              </TeamSelectionGuard>
            } />
            
            {/* Route for individual flight inspections */}
            <Route path="/inspections/:flightId" element={
              <TeamSelectionGuard>
                <Dashboard />
              </TeamSelectionGuard>
            } />
            
            {/* Route for inspection types page
            <Route path="/inspections/:flightId/inspectiontypes" element={
              <TeamSelectionGuard>
                <InspectionTypes />
              </TeamSelectionGuard>
            } />
             */}
            {/* InspectionPages - using state-based navigation */}
            <Route path="/InspectionPages" element={
              <TeamSelectionGuard>
                <InspectionPages />
              </TeamSelectionGuard>
            } />
            
            {/* Work Order Management Pages */}
            <Route path="/workOrderManagement" element={
              <TeamSelectionGuard>
                <Dashboard />
              </TeamSelectionGuard>
            } />
            
            {/* Work Order Detail Page using aircraft name parameter */}
            <Route path="/workOrderManagement/:aircraftName" element={
              <TeamSelectionGuard>
                <Dashboard />
              </TeamSelectionGuard>
            } />
            
            {/* Work Order Pages - direct access without Dashboard wrapper */}
            <Route path="/work-orders" element={
              <TeamSelectionGuard>
                <WorkOrderManagementPages />
              </TeamSelectionGuard>
            } />
            
            <Route path="/work-orders/:aircraftName" element={
              <TeamSelectionGuard>
                <WorkOrderManagementPages />
              </TeamSelectionGuard>
            } />
            
            {/* Redirect any unknown routes to sign in */}
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ResponsiveProvider>
  );
}

export default App;
