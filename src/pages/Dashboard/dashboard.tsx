import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DashboardView } from '../../types';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import IntroHome from '../../components/IntroHome/IntroHome';
import FlightInspection from '../../components/FlightInspection/FlightInspection';
import WorkOrderManagement2 from '../WorkOrderManagement/workOrderManagement2';
import WorkOrderManagement from '../WorkOrderManagement/workOrderManagement';
import WorkOrderManagementPages from '../WorkOrderManagement/WorkOrderManagementPages';

const DashboardContainer = styled.div<{ fullWidth: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.fullWidth ? '80px 1fr' : '80px 1fr'};
  min-height: 100vh;
  background-color: #121212;
  color: white;
  
  @media (min-width: 1366px) {
    grid-template-columns: ${props => props.fullWidth ? '90px 1fr' : '90px 1fr'};
  }
  
  @media (min-width: 1920px) {
    grid-template-columns: ${props => props.fullWidth ? '110px 1fr' : '110px 1fr'};
  }
  
  @media (min-width: 2560px) {
    grid-template-columns: ${props => props.fullWidth ? '130px 1fr' : '130px 1fr'};
  }
  
  @media (min-width: 3840px) {
    grid-template-columns: ${props => props.fullWidth ? '160px 1fr' : '160px 1fr'};
  }
`;

const SideNav = styled.div`
  background-color: #181818;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  border-right: 1px solid #333;
  position: sticky;
  top: 0;
  overflow: hidden;
`;

const MainContent = styled.div<{ isWorkOrderView?: boolean; isInspectionView?: boolean }>`
  padding: 12px;
  max-width: ${props => {
    if (props.isWorkOrderView) return 'none';
    if (props.isInspectionView) return 'none';
    return '900px';
  }};
  width: ${props => {
    if (props.isWorkOrderView) return '100%';
    if (props.isInspectionView) return '100%';
    return 'auto';
  }};
  overflow-x: hidden;
  
  @media (min-width: 1366px) {
    padding: 12px;
  }
  
  @media (min-width: 1920px) {
    padding: 20px;
    max-width: ${props => {
      if (props.isWorkOrderView) return 'none';
      if (props.isInspectionView) return 'none';
      return '1100px';
    }};
  }
  
  @media (min-width: 2560px) {
    padding: 25px;
    max-width: ${props => {
      if (props.isWorkOrderView) return 'none';
      if (props.isInspectionView) return 'none';
      return '1400px';
    }};
  }
  
  @media (min-width: 3840px) {
    padding: 30px;
    max-width: ${props => {
      if (props.isWorkOrderView) return 'none';
      if (props.isInspectionView) return 'none';
      return '2000px';
    }};
  }
`;

const TopSection = styled.div`
  margin-bottom: 30px;
  
  @media (min-width: 1366px) {
    margin-bottom: 34px;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 40px;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 50px;
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 70px;
  }
`;

const TeamSelector = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 8px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  width: fit-content;
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    width: 16px;
    height: 16px;
    
    @media (min-width: 1920px) {
      width: 18px;
      height: 18px;
    }
    
    @media (min-width: 2560px) {
      width: 20px;
      height: 20px;
    }
    
    @media (min-width: 3840px) {
      width: 24px;
      height: 24px;
    }
  }
  
  @media (min-width: 1366px) {
    padding: 9px 10px;
    border-radius: 5px;
    gap: 5px;
    font-size: 1rem;
  }
    
  @media (min-width: 1920px) {
    padding: 10px 12px;
    border-radius: 6px;
    gap: 6px;
    font-size: 1.1rem;
  }
    
  @media (min-width: 2560px) {
    padding: 12px 16px;
    border-radius: 8px;
    gap: 8px;
    font-size: 1.3rem;
  }
    
  @media (min-width: 3840px) {
    padding: 16px 24px;
    border-radius: 12px;
    gap: 12px;
    font-size: 1.7rem;
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  
  @media (min-width: 1366px) {
    font-size: 0.8rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 0.9rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.1rem;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
  
  @media (min-width: 3840px) {
    font-size: 1.4rem;
    
    svg {
      width: 36px;
      height: 36px;
    }
  }
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
  
  @media (min-width: 1366px) {
    border-radius: 5px;
    margin-top: 6px;
    box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 1920px) {
    border-radius: 6px;
    margin-top: 8px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 2560px) {
    border-radius: 8px;
    margin-top: 10px;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 3840px) {
    border-radius: 12px;
    margin-top: 12px;
    box-shadow: 0 10px 14px rgba(0, 0, 0, 0.1);
  }
`;

const TeamOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (min-width: 1366px) {
    padding: 9px 18px;
  }
  
  @media (min-width: 1920px) {
    padding: 10px 20px;
  }
  
  @media (min-width: 2560px) {
    padding: 12px 24px;
  }
  
  @media (min-width: 3840px) {
    padding: 16px 30px;
  }
`;

const WelcomeHeader = styled.h1`
  font-size: 2rem;
  font-weight: normal;
  margin-top: 30px;
  text-align: left;
  
  @media (min-width: 1366px) {
    font-size: 2.2rem;
    margin-top: 34px;
  }
  
  @media (min-width: 1920px) {
    font-size: 2.5rem;
    margin-top: 38px;
  }
  
  @media (min-width: 2560px) {
    font-size: 3rem;
    margin-top: 48px;
  }
  
  @media (min-width: 3840px) {
    font-size: 4rem;
    margin-top: 60px;
  }
`;

// Add a new styled component for development message text
const DevelopmentText = styled.p`
  font-size: 1rem;
  color: #999;
  
  @media (min-width: 1366px) {
    font-size: 1.1rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.4rem;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.8rem;
  }
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ flightId?: string, view?: string, AircraftName?: string }>();
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
    } else if (location.pathname === '/workOrderManagement' || location.pathname.startsWith('/workOrderManagement/')) {
      setCurrentView('workOrderManagement');
    } else if (location.pathname === '/HardwareSenseAssets' || location.pathname.startsWith('/HardwareSenseAssets/')) {
      setCurrentView('HardwareSenseAssets');
    } else if (location.pathname === '/AircraftAssets' || location.pathname.startsWith('/AircraftAssets/')) {
      setCurrentView('AircraftAssets');
    } else if (location.pathname === '/RoleManagement' || location.pathname.startsWith('/RoleManagement/')) {
      setCurrentView('RoleManagement');
    } else if (location.pathname === '/Support' || location.pathname.startsWith('/Support/')) {
      setCurrentView('Support');
    } else if (location.pathname === '/profile') {
      setCurrentView('profile');
    } else if (location.pathname === '/settings') {
      setCurrentView('settings');
    } else if (location.pathname.startsWith('/')) {
      const viewFromUrl = location.pathname.substring(1) as DashboardView;
      if (viewFromUrl && 
          ['home', 'inspections', 'workOrderManagement', 'HardwareSenseAssets', 'RoleManagement', 'AircraftAssets', 'settings', 'Support', 'profile'].includes(viewFromUrl)) {
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
                <TeamSelectorIcon style={{ transform: isTeamDropdownOpen ? 'rotate(180deg)' : 'none' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 9L12 15L6 9" stroke="#777"/>
                  </svg>
                </TeamSelectorIcon>
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
              
              <WelcomeHeader>Hi Andrew, (Role: AME)</WelcomeHeader>
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
        return <WorkOrderManagementPages />;   

      case 'RoleManagement':
        return (
          <>
            <WelcomeHeader>Role Management</WelcomeHeader>
            <DevelopmentText>In Development..</DevelopmentText>
          </>
        );
        
      case 'HardwareSenseAssets':
        return (
          <>
            <WelcomeHeader>Hardware Sense Assets</WelcomeHeader>
            <DevelopmentText>In Development..</DevelopmentText>
          </>
        );

      case 'AircraftAssets':
        return (
          <>
            <WelcomeHeader>Aircraft Assets</WelcomeHeader>
            <DevelopmentText>In Development..</DevelopmentText>
          </>
        );
      case 'profile':
        return (
          <>
            <WelcomeHeader>User Profile</WelcomeHeader>
            <DevelopmentText>In Development...</DevelopmentText>
          </>
        );
        
      case 'settings':
        return (
          <>
            <WelcomeHeader>Settings</WelcomeHeader>
            <DevelopmentText>In Development...</DevelopmentText>
          </>
        );

      case 'Support':
        return (
          <>
            <WelcomeHeader>Support</WelcomeHeader>
            <DevelopmentText>In Development...</DevelopmentText>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <DashboardContainer fullWidth={currentView === 'workOrderManagement' || currentView === 'inspections'}>
      <SideNav>
        <SideNavbar 
          activePage={currentView} 
          onNavigate={handleNavigation}
        />
      </SideNav>
      
      <MainContent 
        isWorkOrderView={currentView === 'workOrderManagement'}
        isInspectionView={currentView === 'inspections'}
      >
        {renderMainContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard; 