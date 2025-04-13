import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

// For the demo, we'll use simple styled components to represent icons
// In a real app, you'd import actual icon components
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
const EyeIcon = () => <span>👁️</span>;
const ReportIcon = () => <span>📊</span>;
const ScheduleIcon = () => <span>📅</span>;
const UserIcon = () => <span>👤</span>;
const SettingsIcon = () => <span>⚙️</span>;
const CallIcon = () => <span>📞</span>;
const LogoutIcon = () => <span>🚪</span>;

interface SideNavbarProps {
  activePage?: string;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ activePage = 'home' }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/signin');
  };
  
  return (
    <IconContainer>
      <Logo>aX</Logo>
      
      <IconGroup>
        <NavIcon 
          active={activePage === 'home'} 
          onClick={() => navigate('/')}
        >
          <HomeIcon />
        </NavIcon>
        
        <NavIcon 
          active={activePage === 'inspections'} 
          onClick={() => navigate('/inspections')}
        >
          <EyeIcon />
        </NavIcon>
        
        <NavIcon 
          active={activePage === 'reports'} 
          onClick={() => navigate('/reports')}
        >
          <ReportIcon />
        </NavIcon>
        
        <NavIcon 
          active={activePage === 'schedule'} 
          onClick={() => navigate('/schedule')}
        >
          <ScheduleIcon />
        </NavIcon>
        
        <NavIcon 
          active={activePage === 'settings'} 
          onClick={() => navigate('/settings')}
        >
          <SettingsIcon />
        </NavIcon>
      </IconGroup>
      
      <BottomIconGroup>
        <NavIcon onClick={() => navigate('/call')}>
          <CallIcon />
        </NavIcon>
        
        <NavIcon onClick={() => navigate('/profile')}>
          <UserIcon />
        </NavIcon>
        
        <NavIcon onClick={handleLogout}>
          <LogoutIcon />
        </NavIcon>
      </BottomIconGroup>
    </IconContainer>
  );
};

export default SideNavbar; 