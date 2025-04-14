import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const FullWidthContainer = styled.div`
  width: 100vw;
  margin-left: -24px; /* Offset the padding from the parent container */
  padding: 0 24px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  margin-top: 24px;
`;

const StepsContainer = styled.div`
  padding-right: 20px;
`;

const ImageContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background-color: #1E1E1E;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100px;
`;

const StageIndicator = styled.div`
  width: 100%;
  padding: 12px 20px;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 0.9rem;
  color: #ccc;
`;

const AircraftImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StepSection = styled.div`
  margin-bottom: 24px;
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  
  &::before {
    content: attr(data-number);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    margin-right: 12px;
    font-size: 0.9rem;
  }
`;

const StepList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0 36px;
`;

const StepItem = styled.li`
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  color: #ccc;
  font-size: 0.9rem;
  
  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #777;
  }
`;

const TimeEstimate = styled.div`
  font-style: italic;
  color: #999;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const PauseButton = styled.button`
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 40px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3498db;
  }
`;

const StopButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 40px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c0392b;
  }
`;

interface SimulationProcessingProps {
  onBack: () => void;
  flight: {
    identifier: string;
    make: string;
    model: string;
    [key: string]: any;
  };
  inspectionName: string;
  inspectionType: string;
  hideSidePanel?: (hide: boolean) => void;
}

const SimulationProcessing: React.FC<SimulationProcessingProps> = ({
  onBack,
  flight,
  inspectionName = 'FAA-Mandated',
  inspectionType = 'A-Check',
  hideSidePanel
}) => {
  const { selectedTeam } = useAuth();
  
  useEffect(() => {
    if (hideSidePanel) {
      hideSidePanel(true);
    }
    
    return () => {
      if (hideSidePanel) {
        hideSidePanel(false);
      }
    };
  }, [hideSidePanel]);
  
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
    <FullWidthContainer>
      <TopBar>
        <TeamSelector>
          Team: {selectedTeam?.name || 'Boeing-Everett-MRO'} <TeamSelectorIcon>▼</TeamSelectorIcon>
        </TeamSelector>
      </TopBar>
      
      <PageTitle>
        Inspections &gt; <FlightIdentifier>{flight.identifier} <FlightModel>({flight.make} {flight.model})</FlightModel></FlightIdentifier>
      </PageTitle>
      
      <BackButton onClick={onBack}>
        &lt; {inspectionType}: {inspectionName}
      </BackButton>
      
      <ContentContainer>
        <StepsContainer>
          {processingSteps.map((section, index) => (
            <StepSection key={index}>
              <StepTitle data-number={index + 1}>{section.title}</StepTitle>
              <StepList>
                {section.steps.map((step, stepIndex) => (
                  <StepItem key={stepIndex}>{step}</StepItem>
                ))}
              </StepList>
            </StepSection>
          ))}
          
          <TimeEstimate>Estimated Time: 1 hour 30 minutes</TimeEstimate>
          
          <ButtonContainer>
            <PauseButton>Pause</PauseButton>
            <StopButton>STOP</StopButton>
          </ButtonContainer>
        </StepsContainer>
        
        <ImageContainer>
          <StageIndicator>
            Stage 1: Preparation | Stage 2: Inspection | Stage 3: Processing | Stage 4: Review | Stage 5: Compliance & Filing
          </StageIndicator>
          <AircraftImage>
            <img src="https://placehold.co/800x600/333333/FFFFFF?text=Boeing+737+MAX+Wireframe" alt="Boeing 737 MAX Wireframe" />
          </AircraftImage>
        </ImageContainer>
      </ContentContainer>
    </FullWidthContainer>
  );
};

export default SimulationProcessing; 