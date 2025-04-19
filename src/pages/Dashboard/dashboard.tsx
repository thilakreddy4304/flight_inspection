import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DashboardView } from '../../types';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import IntroHome from '../../components/IntroHome/IntroHome';
import FlightInspection from '../../components/FlightInspection/FlightInspection';
import WorkOrderManagement from '../WorkOrderManagement/workOrderManagement';

const DashboardContainer = styled.div<{ fullWidth: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.fullWidth ? '80px 1fr' : '80px 1fr 350px'};
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

const MainContent = styled.div<{ isWorkOrderView?: boolean }>`
  padding: 24px;
  max-width: ${props => props.isWorkOrderView ? 'none' : '900px'};
  width: ${props => props.isWorkOrderView ? '100%' : 'auto'};
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
  const location = useLocation();
  const params = useParams<{ flightId?: string, view?: string }>();
  const { user, selectedTeam, teams, selectTeam } = useAuth();
  
  // State to track the current view
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  // State to control team selector dropdown
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  
  // Effect to determine the current view based on URL when component mounts
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/introHome') {
      setCurrentView('home');
    } else if (location.pathname === '/inspections' || location.pathname.startsWith('/inspections/')) {
      setCurrentView('inspections');
    } else if (location.pathname === '/workOrderManagement') {
      setCurrentView('workOrderManagement');
    } else if (location.pathname === '/stats') {
      setCurrentView('stats');
    } else if (location.pathname === '/profile') {
      setCurrentView('profile');
    } else if (location.pathname === '/settings') {
      setCurrentView('settings');
    } else if (location.pathname.startsWith('/')) {
      const viewFromUrl = location.pathname.substring(1) as DashboardView;
      if (viewFromUrl && 
          ['home', 'inspections', 'workOrderManagement', 'stats', 'collaborate', 'rocket', 'settings', 'call', 'profile'].includes(viewFromUrl)) {
        setCurrentView(viewFromUrl as DashboardView);
      }
    }
  }, [location.pathname]);
  
  // Handle navigation from sidebar
  const handleNavigation = (view: DashboardView) => {
    // First update state
    setCurrentView(view);
    
    // Then navigate to the appropriate URL
    if (view === 'home') {
      navigate('/introHome');
    } else {
      navigate(`/${view}`);
    }
  };
  
  const handleViewSchedule = () => {
    navigate('/schedule');
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
            
            <IntroHome onViewSchedule={handleViewSchedule} />
          </>
        );
        
      case 'inspections':
        // Extract flightId from URL if present
        const flightId = location.pathname.includes('/inspections/') 
          ? location.pathname.split('/inspections/')[1]
          : undefined;
        return <FlightInspection flightId={flightId} />;
        
      case 'workOrderManagement':
        return <WorkOrderManagement />;
        
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
  
  return (
    <DashboardContainer fullWidth={currentView === 'workOrderManagement'}>
      <SideNav>
        <SideNavbar 
          activePage={currentView} 
          onNavigate={handleNavigation}
        />
      </SideNav>
      
      <MainContent 
        isWorkOrderView={currentView === 'workOrderManagement'}
      >
        {renderMainContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard; 