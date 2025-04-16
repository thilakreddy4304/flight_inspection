import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SideNavbar from '../../components/SideNavbar/sideNavbar';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
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

const MainContainer = styled.div`
  width: 100%;
  padding: 24px;
  overflow-x: hidden;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 1px;
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

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 12px 0;
`;

const FlightIdentifier = styled.span`
  margin-left: 12px;
  font-size: 1.5rem;
`;

const FlightModel = styled.span`
  font-size: 1.2rem;
  color: #999;
  font-weight: normal;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;

  &:hover {
    color: white;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 0;
  position: relative;
`;

const StepsContainer = styled.div`
  flex: 0 0 350px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const StepSection = styled.div<{ isActive?: boolean }>`
  margin-bottom: 5px;
  opacity: ${props => props.isActive ? 1 : 0.5};
`;

const StepTitle = styled.h3<{ isActive?: boolean }>`
  font-size: 1.2rem;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  color: ${props => props.isActive ? '#ccc' : '#999'};
  
  &::before {
    content: attr(data-number);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${props => props.isActive ? 'rgba(52, 152, 219, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
    margin-right: 12px;
    font-size: 0.9rem;
  }
`;

const StepList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0 36px;
`;

const StepItem = styled.li<{ isActive?: boolean }>`
  position: relative;
  padding-left: 20px;
  margin-bottom: 2px;
  color: ${props => props.isActive ? '#fff' : '#999'};
  font-size: 0.9rem;
  
  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${props => props.isActive ? '#3498db' : '#777'};
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  max-height: 600px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #1E1E1E;
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  border-color: white;
  border-width: 1px;
  border-style: solid;
  right: 0;
  top: -60px;
  width: calc(100% - 380px);
`;

const StageIndicator = styled.div`
  position: relative;
  padding: 10px 10px;
  background-color: transparent;
  font-size: 0.9rem;
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
  max-width: 100%;
`;

const StageTitle = styled.div`
  font-weight: bold;
  font-style: italic;
  margin-bottom: 10px;
  color: #fff;
  font-size: 1.2rem;
`;

const StageText = styled.div`
  font-style: italic;
  margin-bottom: 5px;
`;

const AircraftImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  img {
    width: 95%;
    height: auto;
    object-fit: contain;
  }
`;

const TimeEstimate = styled.div`
  font-style: italic;
  color: #999;
  margin-top: 75px;
  margin-bottom: 24px;
  text-decoration: underline;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
`;

const CompleteButton = styled.button`
  background-color: #008000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 95px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #008000;
  }
`;

// Mock data for different flights
const FLIGHT_DATA: Record<string, any> = {
  'DL4890': {
    identifier: 'DL4890',
    make: 'Boeing 737 MAX',
    model: '737-10',
    engines: '2x Turbofans',
    wingspan: '35.9m (117ft 10in)',
    length: '43.8m (143ft 8in)'
  },
  'AA137': {
    identifier: 'AA137',
    make: 'Airbus A320neo',
    model: 'A320-251N',
    engines: '2x LEAP-1A',
    wingspan: '35.8m (117ft 5in)',
    length: '37.6m (123ft 3in)'
  }
};

interface InspectionStage5Props {}

const InspectionStage5: React.FC<InspectionStage5Props> = () => {
  const navigate = useNavigate();
  const params = useParams<{ flightId: string, inspectionType: string, inspectionName: string }>();
  const { selectedTeam, teams, selectTeam } = useAuth();
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  
  const flightId = params.flightId || 'DL4890';
  const inspectionType = params.inspectionType || 'A-Check';
  const inspectionName = params.inspectionName || 'FAA-Mandated';
  
  // Format inspection name to remove the last word
  const formatInspectionName = (name: string) => {
    const lastSpaceIndex = name.lastIndexOf(' ');
    return lastSpaceIndex === -1 ? name : name.substring(0, lastSpaceIndex);
  };
  
  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };
  
  // Function to handle team selection
  const handleTeamSelect = (teamId: string) => {
    selectTeam(teamId);
    setIsTeamDropdownOpen(false);
  };

  const flight = FLIGHT_DATA[flightId] || FLIGHT_DATA['DL4890'];
  
  const handleBack = () => {
    navigate('/dashboard/inspections');
  };
  
  const handleFinish = () => {
    navigate('/dashboard/inspections');
  };
  
  const processingSteps = [
    {
      title: 'Preparation:',
      steps: [
        'Initiate and Prepare Hardware',
        'Check Aircraft & its placement'
      ]
    },
    {
      title: 'Inspection:',
      steps: [
        'Start Inspection',
        'Inspect by Zones (24 zones)',
        'Complete Inspection'
      ]
    },
    {
      title: 'Data Processing:',
      steps: [
        'Process captured data by Zones',
        'Anomaly Identification'
      ]
    },
    {
      title: 'AME Review',
      steps: [
        'Alert AME for Data Review',
        'Cluster defects',
        'Repair Recommendations'
      ]
    },
    {
      title: 'Compliance & Filing:',
      steps: [
        'QA & Compliance Checks',
        'Report Repairs to MRO Technicians',
        'Complete Inspection & Filing'
      ]
    }
  ];
  
  return (
    <PageContainer>
      <SideNav>
        <SideNavbar 
          activePage="inspections" 
          onNavigate={(view) => navigate(`/dashboard/${view}`)}
        />
      </SideNav>
      
      <MainContainer>
        <TopBar>
          <TeamSelector onClick={toggleTeamDropdown}>
            Team: {selectedTeam?.name || 'Boeing-Everett-MRO'} 
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
        </TopBar>
        
        <PageTitle>
          Inspections &gt;<FlightIdentifier>{flight.identifier} <FlightModel>({flight.make} {flight.model.slice(-2)})</FlightModel></FlightIdentifier>
        </PageTitle>
        
        <BackButton onClick={handleBack}>
          &lt; {inspectionType}: {formatInspectionName(inspectionName)}
        </BackButton>
        
        <ContentContainer>
          <StepsContainer>
            {processingSteps.map((section, index) => (
              <StepSection key={index} isActive={index === 4}>
                <StepTitle data-number={index + 1} isActive={index === 4}>{section.title}</StepTitle>
                <StepList>
                  {section.steps.map((step, stepIndex) => (
                    <StepItem key={stepIndex} isActive={index === 4}>{step}</StepItem>
                  ))}
                </StepList>
              </StepSection>
            ))}
            
            <TimeEstimate>Run in Background</TimeEstimate>
            
            <ButtonContainer>
              <CompleteButton onClick={handleFinish}>Complete</CompleteButton>
            </ButtonContainer>
          </StepsContainer>
          
          <ImageContainer>
            <StageIndicator>
              <StageTitle>Stage 5: Compliance & Filing...Complete</StageTitle>
              <StageText>All QA checks passed and filed</StageText>
              <StageText>Repair recommendations sent to MRO team</StageText>
            </StageIndicator>
            <AircraftImage>
              <img src="https://placehold.co/800x400/333333/FFFFFF?text=Boeing+737+MAX+Wireframe" alt="Boeing 737 MAX Wireframe" />
            </AircraftImage>
          </ImageContainer>
        </ContentContainer>
      </MainContainer>
    </PageContainer>
  );
};

export default InspectionStage5; 