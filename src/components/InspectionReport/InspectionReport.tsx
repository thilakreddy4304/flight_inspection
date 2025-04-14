import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Container = styled.div`
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FlightIdentifier = styled.span`
//   color: #999;
  margin-left: 12px;
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

const BackButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 1rem;
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

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const ReportTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`;

const ChecklistContainer = styled.div`
  margin-bottom: 40px;
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  color: #ccc;
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  flex-shrink: 0;
  margin-top: 2px;
`;

const InspectionText = styled.div`
  font-size: 1rem;
  line-height: 1.4;
`;

const MetadataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 40px;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MetadataLabel = styled.div`
  font-size: 0.9rem;
  color: #777;
`;

const MetadataValue = styled.div`
  font-size: 1rem;
  color: #fff;
`;

const RunButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-weight: 600;
  margin-top: 32px;
  cursor: pointer;
  align-self: flex-end;
  float: right;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #444;
  }
`;

interface InspectionReportProps {
  inspectionName: string;
  inspectionType: string;
  onBack: () => void;
  flight: {
    identifier: string;
    make: string;
    model: string;
    [key: string]: any;
  };
}

const InspectionReport: React.FC<InspectionReportProps> = ({ 
  inspectionName = 'FAA-Mandated',
  inspectionType = 'A-Check',
  onBack,
  flight
}) => {
  const { selectedTeam } = useAuth();
  
  const checklistItems = [
    'Visual Inspection - Check for corrosion, deformation, damage or wear.',
    'Visual Inspection on all exterior panels, wings, tail, engines and doors.',
    'Fluid Leak checks',
    'Engine and Engine support inspection',
    'Engine Blade Inspection',
    'Engine Thermal Analysis',
    'Landing Gear Inspection',
    'Control Surface Inspection',
    'Nose Damage Inspection'
  ];
  
  return (
    <Container>
      <TopBar>
        <TeamSelector>
          Team: {selectedTeam?.name || 'Boeing-Everett-MRO'} <TeamSelectorIcon>▼</TeamSelectorIcon>
        </TeamSelector>
      </TopBar>
      
      <PageTitle>
        Inspections &gt; <FlightIdentifier>{flight.identifier} ({flight.make.slice(0, 6)} {flight.model})</FlightIdentifier>
      </PageTitle>
      
      <BackButton onClick={onBack}>
        ← {inspectionType}: {inspectionName}
      </BackButton>
      
      <ChecklistContainer>
        {checklistItems.map((item, index) => (
          <ChecklistItem key={index}>
            <CheckIcon>✓</CheckIcon>
            <InspectionText>{item}</InspectionText>
          </ChecklistItem>
        ))}
      </ChecklistContainer>
      
      <MetadataContainer>
        <MetadataItem>
          <MetadataLabel>Estimated Run Time:</MetadataLabel>
          <MetadataValue>1 hour 30 minutes</MetadataValue>
        </MetadataItem>
        
        <MetadataItem>
          <MetadataLabel>Estimated Price:</MetadataLabel>
          <MetadataValue>$2,500</MetadataValue>
        </MetadataItem>
        
        <MetadataItem>
          <MetadataLabel>Sensing Assets:</MetadataLabel>
          <MetadataValue>2 units needed</MetadataValue>
        </MetadataItem>
        
        <MetadataItem>
          <MetadataLabel>Compliance Type:</MetadataLabel>
          <MetadataValue>FAA-mandated</MetadataValue>
        </MetadataItem>
      </MetadataContainer>
      
      <RunButton>Run</RunButton>
    </Container>
  );
};

export default InspectionReport; 