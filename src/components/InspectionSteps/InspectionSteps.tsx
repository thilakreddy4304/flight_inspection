import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import InspectionStages from '../InspectionPages/InspectionStages';
// import SimulationProcessing from '../SimulationProcessing/SimulationProcessing';

const Container = styled.div`
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
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

const InfoRow = styled.div`
  margin-bottom: 0;
  margin-top: 0;
  font-size: 1.5rem;
  white-space: nowrap;
  padding-bottom: 1px;

  .label {
    color: #fff;
    margin-bottom: 0;
    font-size: 1rem;
    margin-left: 20px;
  }

  .value {
    margin-left: 5px;
    font-weight: 200;
    margin-bottom: 0;
    font-size: 1rem;
    color: #ccc;
  }
`;

const ChecklistContainer = styled.div`
  margin-bottom: 10px;
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 6px;
  margin-left: 20px;
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
  gap: 2px;
  margin-top: 40px;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 0;
`;

const MetadataLabel = styled.div`
  font-size: 0.9rem;
  color: #fff;
  display: none;
  margin-bottom: 1px;
`;

const MetadataValue = styled.div`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 1px;
  display: none;
`;

const DisclaimerContainer = styled.div`
  margin-top: 100px;
  margin-left: 20px;
`;

const DisclaimerText = styled.div`
  font-size: 0.8rem;
  font-style: italic;
`;

const RunButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px 12px 24px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  justify-content: center;
  float: left;
  display: grid;
  margin-left: 20px;
  width: 120px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #444;
  }
`;

// Inspection report data
const INSPECTION_REPORT_DATA: Record<string, any> = {
  'DL4890': {
    estimated_run_time: '1 hour 30 minutes',
    // estimated_price: '$2,500',
    sensing_assets: '2 units needed',
    compliance_type: 'FAA-mandated',
  },
  'DL1234': {
    estimated_run_time: '1 hour 45 minutes',
    // estimated_price: '$2,800',
    sensing_assets: '2 units needed',
    compliance_type: 'FAA-mandated',
  },
  'DL5678': {
    estimated_run_time: '2 hours 15 minutes',
    // estimated_price: '$3,200',
    sensing_assets: '3 units needed',
    compliance_type: 'FAA-mandated',
  },
  'AA137': {
    estimated_run_time: '2 hours 30 minutes',
    // estimated_price: '$3,500',
    sensing_assets: '3 units needed',
    compliance_type: 'EASA-regulated',
  },
  'UA5432': {
    estimated_run_time: '1 hour 15 minutes',
    // estimated_price: '$2,200',
    sensing_assets: '2 units needed',
    compliance_type: 'FAA-mandated',
  },
  'BA2901': {
    estimated_run_time: '3 hours 45 minutes',
    // estimated_price: '$4,500',
    sensing_assets: '4 units needed',
    compliance_type: 'EASA-regulated',
  },
  'LH7890': {
    estimated_run_time: '2 hours 45 minutes',
    // estimated_price: '$3,800',
    sensing_assets: '3 units needed',
    compliance_type: 'EASA-regulated',
  },
  'FR1234': {
    estimated_run_time: '1 hour 50 minutes',
    // estimated_price: '$2,700',
    sensing_assets: '2 units needed',
    compliance_type: 'EASA-regulated',
  },
  'EK5678': {
    estimated_run_time: '2 hours 20 minutes',
    // estimated_price: '$3,300',
    sensing_assets: '3 units needed',
    compliance_type: 'UAE-GCAA',
  },
  'SQ2345': {
    estimated_run_time: '3 hours 10 minutes',
    // estimated_price: '$4,100',
    sensing_assets: '4 units needed',
    compliance_type: 'CAAS-regulated',
  },
  'JL8765': {
    estimated_run_time: '1 hour 40 minutes',
    // estimated_price: '$2,600',
    sensing_assets: '2 units needed',
    compliance_type: 'JCAB-mandated',
  },
  'QF3456': {
    estimated_run_time: '2 hours 50 minutes',
    // estimated_price: '$3,900',
    sensing_assets: '3 units needed',
    compliance_type: 'CASA-regulated',
  },
  'AF7654': {
    estimated_run_time: '2 hours 10 minutes',
    // estimated_price: '$3,100',
    sensing_assets: '3 units needed',
    compliance_type: 'EASA-regulated',
  },
  'KL2109': {
    estimated_run_time: '1 hour 55 minutes',
    // estimated_price: '$2,900',
    sensing_assets: '2 units needed',
    compliance_type: 'EASA-regulated',
  },
  'NH8901': {
    estimated_run_time: '2 hours 25 minutes',
    // estimated_price: '$3,400',
    sensing_assets: '3 units needed',
    compliance_type: 'JCAB-mandated',
  },
  'CX6543': {
    estimated_run_time: '3 hours 05 minutes',
    // estimated_price: '$4,000',
    sensing_assets: '4 units needed',
    compliance_type: 'HKCAD-regulated',
  },
  'EY9876': {
    estimated_run_time: '2 hours 40 minutes',
    // estimated_price: '$3,700',
    sensing_assets: '3 units needed',
    compliance_type: 'UAE-GCAA',
  },
  'TK5432': {
    estimated_run_time: '1 hour 35 minutes',
    // estimated_price: '$2,550',
    sensing_assets: '2 units needed',
    compliance_type: 'DGCA-mandated',
  },
  'AC3210': {
    estimated_run_time: '2 hours 05 minutes',
    // estimated_price: '$3,050',
    sensing_assets: '3 units needed',
    compliance_type: 'Transport Canada',
  },
  'SU7654': {
    estimated_run_time: '3 hours 20 minutes',
    // estimated_price: '$4,200',
    sensing_assets: '4 units needed',
    compliance_type: 'Rosaviatsia',
  },
  'OS8765': {
    estimated_run_time: '1 hour 25 minutes',
    // estimated_price: '$2,450',
    sensing_assets: '2 units needed',
    compliance_type: 'EASA-regulated',
  },
  'AZ2345': {
    estimated_run_time: '2 hours 35 minutes',
    // estimated_price: '$3,600',
    sensing_assets: '3 units needed',
    compliance_type: 'EASA-regulated',
  },
  'IB6789': {
    estimated_run_time: '3 hours 15 minutes',
    // estimated_price: '$4,150',
    sensing_assets: '4 units needed',
    compliance_type: 'EASA-regulated',
  },
  'BR1357': {
    estimated_run_time: '2 hours 00 minutes',
    // estimated_price: '$3,000',
    sensing_assets: '3 units needed',
    compliance_type: 'CAA-mandated',
  }
};

interface InspectionStepsProps {
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

const InspectionSteps: React.FC<InspectionStepsProps> = ({ 
  inspectionName,
  inspectionType,
  onBack,
  flight
}) => {
  const { selectedTeam, teams, selectTeam } = useAuth();
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  
  // Function to toggle team dropdown
  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };
  
  // Function to handle team selection
  const handleTeamSelect = (teamId: string) => {
    selectTeam(teamId);
    setIsTeamDropdownOpen(false);
  };
  
  // Get report data for the current flight, or use default
  const reportData = INSPECTION_REPORT_DATA[flight.identifier];
  const formatInspectionName = (name: string) => {
    const lastSpaceIndex = name.lastIndexOf(' ');
    return lastSpaceIndex === -1 ? name : name.substring(0, lastSpaceIndex);
  };
  
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
  
  const handleRunClick = () => {
    // Navigate to the inspection stages page with all data in state
    navigate('/InspectionPages', { 
      state: { 
        flightId: flight.identifier,
        inspectionType: inspectionType,
        inspectionName: inspectionName,
        flightData: flight
      } 
    });
  };
  
  // if (isRunning) {
  //   return (
  //     <InspectionStages 
  //       flight={flight}
  //       inspectionName={inspectionName}
  //       inspectionType={inspectionType}
  //       onBack={() => setIsRunning(false)}
  //     />
  //   );
  // }
  
  return (
    <Container>
      <TopBar>
        <TeamSelector onClick={toggleTeamDropdown}>
          Team: {selectedTeam?.name}
          <TeamSelectorIcon style={{ transform: isTeamDropdownOpen ? 'rotate(180deg)' : 'none' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 9L12 15L6 9" stroke="#777"/>
</svg></TeamSelectorIcon>
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
        Inspections &gt;<FlightIdentifier>{flight.identifier} ({flight.make} {flight.model})</FlightIdentifier>
      </PageTitle>
      
      <BackButton onClick={onBack}>
          &lt; {inspectionType}: {formatInspectionName(inspectionName)}
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
          <InfoRow>
            <span className="label">Estimated Run Time:</span>
            <span className="value">{reportData.estimated_run_time}</span>
          </InfoRow>
        </MetadataItem>
        
        {/* <MetadataItem>
          <InfoRow>
            <span className="label">Estimated Price:</span>
            <span className="value">{reportData.estimated_price}</span>
          </InfoRow>
        </MetadataItem> */}
        
        <MetadataItem>
          <InfoRow>
            <span className="label">Sensing Assets:</span>
            <span className="value">{reportData.sensing_assets}</span>
          </InfoRow>
        </MetadataItem>
        
        <MetadataItem>
          <InfoRow>
            <span className="label">Compliance Type:</span>
            <span className="value">{reportData.compliance_type}</span>
          </InfoRow>
        </MetadataItem>
      </MetadataContainer>

      <DisclaimerContainer>
        <DisclaimerText>
          *Recommended time based on allocated sensing assets.
        </DisclaimerText>
      </DisclaimerContainer>
      
      <RunButton onClick={handleRunClick}>Run</RunButton>
    </Container>
  );
};

export default InspectionSteps; 