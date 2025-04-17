import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { DashboardView } from '../../types';

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: white;
`;

const IconGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const BottomIconGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: 20px;
`;

const NavIcon = styled.div<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.active ? '#333' : 'transparent'};
  color: ${props => props.active ? 'white' : '#999'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #333;
    color: white;
  }
`;

// Simple icon components using basic unicode symbols for demo
const HomeIcon = () => <span>🏠</span>;
const TasksIcon = () => <span>📋</span>;
const InspectionsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5ZM12 9.5C10.34 9.5 9 10.84 9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5Z" fill="currentColor"/>
  </svg>
);
const StatsIcon = () => <span>📊</span>;
const CollaborateIcon = () => <span>👥</span>;
const RocketIcon = () => <span>🚀</span>;
const SettingsIcon = () => <span>⚙️</span>;
const CallIcon = () => <span>📞</span>;
const ProfileIcon = () => <span>👤</span>;
const LogoutIcon = () => <span>🚪</span>;

// Use the shared type from types module
interface SideNavbarProps {
  activePage: DashboardView;
  onNavigate?: (view: DashboardView) => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ activePage, onNavigate }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/signin');
  };
  
  const handleIconClick = (view: DashboardView) => {
    if (onNavigate) {
      onNavigate(view);
    } else {
      // Fall back to navigation if onNavigate is not provided
      const routes: Record<DashboardView, string> = {
        home: '/introHome',
        inspections: '/flight/DL4890',
        workOrderManagement: '/workOrderManagement',
        stats: '/stats',
        collaborate: '/collaborate',
        rocket: '/rocket',
        settings: '/settings',
        call: '/call',
        profile: '/profile'
      };
      navigate(routes[view]);
    }
  };
  
  return (
    <IconContainer>
      <Logo>aX</Logo>
      
      <IconGroup>
        <NavIcon 
          active={activePage === 'home'} onClick={() => handleIconClick('home')} >
          <HomeIcon />
        </NavIcon>
        
        <NavIcon active={activePage === 'inspections'} onClick={() => handleIconClick('inspections')}>  
          <InspectionsIcon />
        </NavIcon>
        
        <NavIcon active={activePage === 'workOrderManagement'} onClick={() => handleIconClick('workOrderManagement')}>
          <TasksIcon />
        </NavIcon>
        
        <NavIcon active={activePage === 'stats'} onClick={() => handleIconClick('stats')}>
          <StatsIcon />
        </NavIcon>
        
        <NavIcon active={activePage === 'collaborate'} onClick={() => handleIconClick('collaborate')}>
          <CollaborateIcon />
        </NavIcon>
        
        <NavIcon active={activePage === 'rocket'} onClick={() => handleIconClick('rocket')}>
          <RocketIcon />
        </NavIcon>
        
        <NavIcon active={activePage === 'settings'} onClick={() => handleIconClick('settings')}>
          <SettingsIcon />
        </NavIcon>
      </IconGroup>
      
      <BottomIconGroup>
        <NavIcon active={activePage === 'call'} onClick={() => handleIconClick('call')}>
          <CallIcon />
        </NavIcon>

        <NavIcon active={activePage === 'profile'} onClick={() => handleIconClick('profile')}>
          <ProfileIcon />
        </NavIcon>
        
        <NavIcon onClick={handleLogout}>
          <LogoutIcon />
        </NavIcon>
      </BottomIconGroup>
    </IconContainer>
  );
};

export default SideNavbar; 