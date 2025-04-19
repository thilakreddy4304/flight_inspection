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

const HomeIcon = () => <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12.7596C5 11.4019 5 10.723 5.27446 10.1262C5.54892 9.52949 6.06437 9.08769 7.09525 8.20407L8.09525 7.34693C9.95857 5.7498 10.8902 4.95123 12 4.95123C13.1098 4.95123 14.0414 5.7498 15.9047 7.34693L16.9047 8.20407C17.9356 9.08769 18.4511 9.52949 18.7255 10.1262C19 10.723 19 11.4019 19 12.7596V17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21H9C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17V12.7596Z" stroke="#fff" stroke-width="2"/>
<path d="M14.5 21V16C14.5 15.4477 14.0523 15 13.5 15H10.5C9.94772 15 9.5 15.4477 9.5 16V21" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>;
const TasksIcon = () => <span>📋</span>;
const InspectionsIcon = () => <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="2.5" stroke="#fff"/>
<path d="M18.2265 11.3805C18.3552 11.634 18.4195 11.7607 18.4195 12C18.4195 12.2393 18.3552 12.366 18.2265 12.6195C17.6001 13.8533 15.812 16.5 12 16.5C8.18799 16.5 6.39992 13.8533 5.77348 12.6195C5.64481 12.366 5.58048 12.2393 5.58048 12C5.58048 11.7607 5.64481 11.634 5.77348 11.3805C6.39992 10.1467 8.18799 7.5 12 7.5C15.812 7.5 17.6001 10.1467 18.2265 11.3805Z" stroke="#fff"/>
<path d="M17.5 3.5H17.7C19.4913 3.5 20.387 3.5 20.9435 4.0565C21.5 4.61299 21.5 5.50866 21.5 7.3V7.5" stroke="#fff" stroke-linecap="round"/>
<path d="M17.5 20.5H17.7C19.4913 20.5 20.387 20.5 20.9435 19.9435C21.5 19.387 21.5 18.4913 21.5 16.7V16.5" stroke="#fff" stroke-linecap="round"/>
<path d="M6.5 3.5H6.3C4.50866 3.5 3.61299 3.5 3.0565 4.0565C2.5 4.61299 2.5 5.50866 2.5 7.3V7.5" stroke="#fff" stroke-linecap="round"/>
<path d="M6.5 20.5H6.3C4.50866 20.5 3.61299 20.5 3.0565 19.9435C2.5 19.387 2.5 18.4913 2.5 16.7V16.5" stroke="#fff" stroke-linecap="round"/>
</svg>
</span>;
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
        inspections: '/inspections',
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