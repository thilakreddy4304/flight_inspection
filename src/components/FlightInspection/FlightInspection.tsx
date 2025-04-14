import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import InspectionDetails from '../InspectionDetails/InspectionDetails';

const MainContent = styled.div`
  width: 100%;
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
  margin: 0 0 24px 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  background-color: #222;
  border: none;
  padding: 12px 16px;
  padding-right: 40px;
  color: grey;
  border-radius: 24px;
  width: 100%;
  font-size: 1rem;
  
  &:focus {
    outline: 1px solid #444;
  }
`;

const SearchIconButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #777;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrText = styled.span`
  color: #777;
`;

const DropdownSelect = styled.div`
  background-color: #222;
  padding: 12px 16px;
  border-radius: 24px;
  color: grey;
  min-width: 150px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AircraftInfoContainer = styled.div`
  margin-bottom: 30px;
  font-size: 1rem;
`;

const FlightInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  margin-bottom: 30px;
`;

const InfoRow = styled.div`
  margin-bottom: 1px;
  font-size: 1.5rem;
  white-space: nowrap;

  .label {
    color: #777;
    font-size: 1rem;
  }

  .value {
    margin-left: 10px;
    font-weight: 600;
    font-size: 1rem;
  }
`;

const ModelViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  justify-items: center;
  text-align: center;
`;

const ModelCard = styled.div`
  background-color: #1E1E1E;
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-left: 60px;
`;

const ModelImage = styled.div`
  height: 200px;
  width: 400px;
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
  padding: 12px;
  text-align: center;
  font-size: 1rem;
  color: #ccc;
  margin-top: 8px;
  margin-left: 70px;
  animation: slideFromRight 0.8s ease-out forwards;
  position: relative;
  
  @keyframes slideFromRight {
    0% {
      opacity: 0;
      transform: translateX(400px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
  margin-left: 180px;
`;

const ActionButton = styled.button`
  background-color: rgb(40, 43, 45);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #34495e;
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

interface FlightInspectionProps {
  flightId?: string;
  hideSidePanel?: (hide: boolean) => void;
}

const FlightInspection: React.FC<FlightInspectionProps> = ({ flightId, hideSidePanel }) => {
  const params = useParams<{ flightId: string }>();
  const currentFlightId = flightId || params.flightId || 'DL4890';
  const { selectedTeam } = useAuth();
  const [view, setView] = useState<'selection' | 'details'>('selection');
  
  // Use the data for the specified flightId, or fallback to DL4890
  const currentFlight = FLIGHT_DATA[currentFlightId] || FLIGHT_DATA['DL4890'];
  
  // Effect to hide/show side panel
  useEffect(() => {
    // On mount, hide the side panel if the prop is provided
    if (hideSidePanel) {
      hideSidePanel(false); // Keep side panel visible for flight inspection view
    }
    
    // On unmount, ensure side panel visibility is reset
    return () => {
      if (hideSidePanel) {
        hideSidePanel(false);
      }
    };
  }, [hideSidePanel]);
  
  const handleSelectAndContinue = () => {
    setView('details');
  };
  
  if (view === 'details') {
    return <InspectionDetails 
      flight={currentFlight} 
      onBack={() => setView('selection')} 
      hideSidePanel={hideSidePanel}
    />;
  }
  
  return (
    <MainContent>
      <TopBar>
        <TeamSelector>
          Team: {selectedTeam?.name || 'Boeing-Everett-MRO'} <TeamSelectorIcon>▼</TeamSelectorIcon>
        </TeamSelector>
      </TopBar>
      
      <PageTitle>Inspections</PageTitle>
      
      <SearchContainer>
        <SearchInputContainer>
          <SearchInput placeholder="Enter flight identifier" defaultValue={currentFlight.identifier} />
          <SearchIconButton>
            <span role="img" aria-label="search">🔍</span>
          </SearchIconButton>
        </SearchInputContainer>
        <OrText>Or</OrText>
        <DropdownSelect>Aircraft Make <span>▼</span></DropdownSelect>
        <DropdownSelect>Aircraft Model <span>▼</span></DropdownSelect>
      </SearchContainer>
      
      <AircraftInfoContainer>
        <FlightInfo>
          <InfoRow>
            <span className="label">Identifier:</span><span className="value">{currentFlight.identifier}</span>
          </InfoRow>
          <InfoRow>
            <span className="label">Make:</span><span className="value">{currentFlight.make}</span>
          </InfoRow>
          <InfoRow>
            <span className="label">Model:</span><span className="value">{currentFlight.model}</span>
          </InfoRow>
          <InfoRow>
            <span className="label">Engines:</span><span className="value">{currentFlight.engines}</span>
          </InfoRow>
          <InfoRow>
            <span className="label">Wingspan:</span><span className="value">{currentFlight.wingspan}</span>
          </InfoRow>
          <InfoRow>
            <span className="label">Length:</span><span className="value">{currentFlight.length}</span>
          </InfoRow>
        </FlightInfo>
      </AircraftInfoContainer>
      
      <ModelViewContainer>
        <div>
          <ModelCard>
            <ModelImage>
              <img src="https://placehold.co/600x400/3498db/FFFFFF?text=3D+Realistic+Model" alt="Boeing 737 MAX" />
            </ModelImage>
          </ModelCard>
          <ModelCaption>3D Realistic Model</ModelCaption>
        </div>
        
        <div>
          <ModelCard>
            <ModelImage>
              <img src="https://placehold.co/600x400/333333/999999?text=3D+Mesh+Model" alt="Boeing 737 MAX Wireframe" />
            </ModelImage>
          </ModelCard>
          <ModelCaption>3D Mesh Model</ModelCaption>
        </div>
      </ModelViewContainer>
      
      <ActionButtonContainer>
        <ActionButton onClick={handleSelectAndContinue}>Select & Continue</ActionButton>
      </ActionButtonContainer>
    </MainContent>
  );
};

export default FlightInspection; 