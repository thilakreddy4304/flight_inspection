import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  
  a {
    color: white;
    text-decoration: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeamName = styled.div`
  font-size: 0.8rem;
  color: #bdc3c7;
  margin-top: 2px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)<{ active: boolean }>`
  color: white;
  text-decoration: none;
  margin-left: 24px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding: 8px 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3498db;
    transform: scaleX(${({ active }) => (active ? '1' : '0')});
    transition: transform 0.2s ease-in-out;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 24px;
  padding: 8px 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3498db;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const UserInfo = styled.span`
  margin-left: 24px;
  font-size: 0.9rem;
  color: #bdc3c7;
`;

const Main = styled.main`
  flex: 1;
  background-color: #f5f5f5;
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
  font-size: 0.9rem;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, selectedTeam } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/signin');
  };
  
  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <LogoContainer>
            <Logo>
              <Link to="/">Flight Inspection</Link>
            </Logo>
            {selectedTeam && (
              <TeamName>{selectedTeam.name}</TeamName>
            )}
          </LogoContainer>
          <Nav>
            <NavLink to="/" active={location.pathname === '/'}>
              Dashboard
            </NavLink>
            <NavLink to="/flights" active={isActive('/flights')}>
              Flights
            </NavLink>
            <NavLink to="/inspections" active={isActive('/inspections')}>
              Inspections
            </NavLink>
            <NavLink to="/reports" active={isActive('/reports')}>
              Reports
            </NavLink>
            
            {user && (
              <>
                <UserInfo>
                  {user.email}
                </UserInfo>
                <LogoutButton onClick={handleLogout}>
                  Logout
                </LogoutButton>
              </>
            )}
          </Nav>
        </HeaderContent>
      </Header>
      
      <Main>{children}</Main>
      
      <Footer>
        &copy; {new Date().getFullYear()} Flight Inspection System
      </Footer>
    </LayoutContainer>
  );
};

export default Layout; 