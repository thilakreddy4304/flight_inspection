import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DashboardView } from '../../types';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import InspectionScheduler from '../../components/InspectionScheduler/inspectionScheduler';
import InspectionChart from '../../components/InspectionChart/inspectionChart';
// import InspectionStatus from '../../components/InspectionStatus/inspectionStatus';
import FlightInspection from '../../components/FlightInspection/FlightInspection';
import StatusPanel from '../../components/StatusPanel/StatusPanel';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 350px;
  min-height: 100vh;
  background-color: #121212;
  color: white;
`;

const SideNav = styled.div`
  background-color: #181818;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-right: 1px solid #333;
`;

const MainContent = styled.div`
  padding: 24px;
  max-width: 900px;
`;

const SidePanel = styled.div`
  background-color: #181818;
  padding: 24px;
  border-left: 1px solid #333;
`;

const TopSection = styled.div`
  margin-bottom: 40px;
`;

const TeamSelector = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  margin-bottom: 24px;
  cursor: pointer;
  width: fit-content;
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
  transition: transform 0.3s ease;
`;

const TeamDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #222;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  z-index: 10;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const TeamOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const WelcomeHeader = styled.h1`
  font-size: 2rem;
  font-weight: normal;
  margin: 0;
  text-align: left;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, selectedTeam, teams, selectTeam } = useAuth();
  
  // State to track the current view
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  // State to track whether side panel should be hidden
  const [hideSidePanel, setHideSidePanel] = useState(false);
  // State to control team selector dropdown
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  
  // Handle navigation from sidebar
  const handleNavigation = (view: DashboardView) => {
    setCurrentView(view);
  };
  
  const handleViewSchedule = () => {
    navigate('/schedule');
  };
  
  // Function to toggle side panel visibility
  const handleToggleSidePanel = (hide: boolean) => {
    setHideSidePanel(hide);
  };
  
  // Function to toggle team dropdown
  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };
  
  // Function to handle team selection
  const handleTeamSelect = (teamId: string) => {
    selectTeam(teamId);
    setIsTeamDropdownOpen(false);
  };
  
  // Mock data for the status panel
  const statusItems = [
    { number: 74, label: 'Inspections - Scheduled' },
    { number: 23, label: 'Inspections - In-progress' },
    { number: 22, label: 'Inspections - Ready-to-Review' },
    { number: 5, label: 'Inspections - Complete' }
  ];
  
  // Render different content based on the current view
  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <TopSection>
              <TeamSelector onClick={toggleTeamDropdown}>
                Team: {selectedTeam?.name} 
                <TeamSelectorIcon style={{ transform: isTeamDropdownOpen ? 'rotate(180deg)' : 'none' }}>▼</TeamSelectorIcon>
                <TeamDropdown isOpen={isTeamDropdownOpen}>
                  {teams.map(team => (
                    <TeamOption 
                      key={team.id} 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTeamSelect(team.id);
                      }}
                    >
                      {team.name}
                    </TeamOption>
                  ))}
                </TeamDropdown>
              </TeamSelector>
              
              <WelcomeHeader>Hi Andrew,</WelcomeHeader>
            </TopSection>
            
            <InspectionScheduler onViewSchedule={handleViewSchedule} />
            <InspectionChart />
          </>
        );
        
      case 'inspections':
        return <FlightInspection flightId="DL4890" hideSidePanel={handleToggleSidePanel} />;
        
      case 'tasks':
        return (
          <>
            <WelcomeHeader>Tasks</WelcomeHeader>
            <p>Task management coming soon...</p>
          </>
        );
        
      case 'stats':
        return (
          <>
            <WelcomeHeader>Statistics</WelcomeHeader>
            <p>Statistics dashboard coming soon...</p>
          </>
        );
        
      case 'profile':
        return (
          <>
            <WelcomeHeader>User Profile</WelcomeHeader>
            <p>Profile management coming soon...</p>
          </>
        );
        
      case 'settings':
        return (
          <>
            <WelcomeHeader>Settings</WelcomeHeader>
            <p>Application settings coming soon...</p>
          </>
        );
        
      default:
        return null;
    }
  };
  
  // Render different side panel content based on the current view
  const renderSidePanel = () => {
    switch (currentView) {
      case 'home':
        return <StatusPanel items={statusItems} />;
        
      case 'inspections':
        return <StatusPanel items={statusItems} />;
        
      default:
        return <StatusPanel items={statusItems} />;
    }
  };
  
  return (
    <DashboardContainer>
      <SideNav>
        <SideNavbar 
          activePage={currentView} 
          onNavigate={handleNavigation}
        />
      </SideNav>
      
      <MainContent style={{ gridColumn: hideSidePanel ? '2 / 4' : '2 / 3' }}>
        {renderMainContent()}
      </MainContent>
      
      {!hideSidePanel && (
        <SidePanel>
          {renderSidePanel()}
        </SidePanel>
      )}
    </DashboardContainer>
  );
};

export default Dashboard; 