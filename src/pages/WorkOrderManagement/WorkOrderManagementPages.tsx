import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import WorkOrderManagement from './workOrderManagement';
import WorkOrderDetail from './workOrderManagement2';

/**
 * WorkOrderManagementPages component that handles routing between work order views
 * This component acts as a router between the main management page and detail pages
 * using aircraft name as the URL parameter
 */
interface WorkOrderManagementPagesProps {}

const WorkOrderManagementPages: React.FC<WorkOrderManagementPagesProps> = () => {
  const { aircraftName } = useParams<{ aircraftName: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTeam } = useAuth();
  
  // If we have an aircraft name parameter, show the work order detail page
  if (aircraftName) {
    return <WorkOrderDetail />;
  }
  
  // Otherwise show the work order management page
  return <WorkOrderManagement />;
};

export default WorkOrderManagementPages; 