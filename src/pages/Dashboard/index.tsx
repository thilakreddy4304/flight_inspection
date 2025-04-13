import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SideNavbar from '../../components/SideNavbar';
import InspectionScheduler from '../../components/InspectionScheduler';
import InspectionChart from '../../components/InspectionChart';
import InspectionStatus from '../../components/InspectionStatus';

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

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
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
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
`;

const WelcomeHeader = styled.h1`
  font-size: 2rem;
  font-weight: normal;
  margin: 0;
  text-align: left;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, selectedTeam } = useAuth();
  
  const handleViewSchedule = () => {
    navigate('/schedule');
  };
  
  return (
    <DashboardContainer>
      <SideNav>
        <SideNavbar activePage="home" />
      </SideNav>
      <MainContent>
        <TopSection>
          <TeamSelector>
            Team: {selectedTeam?.name} <TeamSelectorIcon>▼</TeamSelectorIcon>
          </TeamSelector>
          
          <WelcomeHeader>Hi Andrew,</WelcomeHeader>
        </TopSection>
        
        <MainLayout>
          <InspectionScheduler onViewSchedule={handleViewSchedule} />
          <InspectionChart />
        </MainLayout>
      </MainContent>
      
      <SidePanel>
        <InspectionStatus />
      </SidePanel>
    </DashboardContainer>
  );
};

export default Dashboard; 