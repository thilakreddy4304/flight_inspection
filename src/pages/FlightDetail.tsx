import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { DashboardView } from '../types';
import SideNavbar from '../components/SideNavbar/sideNavbar';
import FlightInspection from '../components/FlightInspection/FlightInspection';
import StatusPanel from '../components/StatusPanel/StatusPanel';

const FlightDetailContainer = styled.div`
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
  margin-top: 100px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TeamSelector = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  width: fit-content;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 24px 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
  border-radius: 50px;
`;

const SearchInput = styled.input`
  background-color: #222;
  border: none;
  padding: 12px 16px;
  color: white;
  border-radius: 4px;
  flex: 1;
  font-size: 1rem;
  
  &:focus {
    outline: 1px solid #444;
  }
`;

const OrText = styled.span`
  color: #777;
`;

const DropdownSelect = styled.div`
  background-color: #222;
  padding: 12px 16px;
  border-radius: 4px;
  min-width: 150px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  color: #777;
  font-size: 1.2rem;
  cursor: pointer;
`;

const AircraftInfoContainer = styled.div`
  margin-bottom: 30px;
`;

const FlightInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

const InfoGroup = styled.div`
  margin-bottom: 16px;
`;

const InfoLabel = styled.div`
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const ModelViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;
`;

const ModelCard = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModelImage = styled.div`
  height: 200px;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ModelCaption = styled.div`
  padding: 16px;
  text-align: center;
  font-size: 1rem;
  color: #ccc;
`;

const ActionButton = styled.button`
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-end;
  margin-top: auto;
  
  &:hover {
    background-color: #34495e;
  }
`;

const InspectionStatusContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StatusTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 16px 0;
  color: white;
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusNumber = styled.span`
  font-weight: 600;
`;

const StatusLabel = styled.span`
  color: #ccc;
`;

const FlightDetail: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>();
  
  // Mock data for the status panel
  const statusItems = [
    { number: 74, label: 'Inspections - Scheduled' },
    { number: 23, label: 'Inspections - In-progress' },
    { number: 22, label: 'Inspections - Ready-to-Review' },
    { number: 5, label: 'Inspections - Complete' }
  ];
  
  return (
    <FlightDetailContainer>
      <SideNav>
        <SideNavbar activePage="inspections" />
      </SideNav>
      
      <MainContent>
        <FlightInspection flightId={flightId} />
      </MainContent>
      
      <SidePanel>
        <StatusPanel items={statusItems} />
      </SidePanel>
    </FlightDetailContainer>
  );
};

export default FlightDetail; 