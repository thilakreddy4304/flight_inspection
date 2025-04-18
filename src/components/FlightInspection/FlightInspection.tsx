import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import InspectionDetails from '../InspectionTypes/InspectionTypes';

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
  margin: 0 0 24px 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
  cursor: text;
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
  position: relative;
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

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #222;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const SearchResultItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #ccc;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  color: #777;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

// Add these dropdown styled components
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #222;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownMenuItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #ccc;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ClearFiltersButton = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  color: #ccc;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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
    background-color: #444;
  }
`;

// Add more mock flight data
const FLIGHT_DATA: Record<string, any> = {
  'DL4890': {
    identifier: 'DL4890',
    make: 'Boeing 737 MAX',
    model: '737-10',
    engines: '2x Turbofans',
    wingspan: '35.9m (117ft 10in)',
    length: '43.8m (143ft 8in)'
  },
  'DL1234': {
    identifier: 'DL1234',
    make: 'Boeing 787',
    model: '787-9',
    engines: '2x GEnx-1B',
    wingspan: '60.1m (197ft)',
    length: '63m (206ft 8in)'
  },
  'DL5678': {
    identifier: 'DL5678',
    make: 'Airbus A350',
    model: 'A350-900',
    engines: '2x Rolls-Royce Trent XWB',
    wingspan: '64.8m (212ft 5in)',
    length: '66.8m (219ft 2in)'
  },
  'AA137': {
    identifier: 'AA137',
    make: 'Airbus A320',
    model: 'A320-251N',
    engines: '2x LEAP-1A',
    wingspan: '35.8m (117ft 5in)',
    length: '37.6m (123ft 3in)'
  },
  'UA5432': {
    identifier: 'UA5432',
    make: 'Boeing 777',
    model: '777-300ER',
    engines: '2x GE90-115B',
    wingspan: '64.8m (212ft 7in)',
    length: '73.9m (242ft 4in)'
  },
  'BA2901': {
    identifier: 'BA2901',
    make: 'Airbus A380',
    model: 'A380-800',
    engines: '4x Engine Alliance GP7200',
    wingspan: '79.8m (261ft 10in)',
    length: '72.7m (238ft 7in)'
  }
};

interface FlightInspectionProps {
  flightId?: string;
  hideSidePanel?: (hide: boolean) => void;
}

// Add this function to extract unique makes from FLIGHT_DATA
const getUniqueAircraftMakes = () => {
  const makesMap: Record<string, boolean> = {};
  
  Object.values(FLIGHT_DATA).forEach(flight => {
    makesMap[flight.make] = true;
  });
  
  return Object.keys(makesMap).sort();
};

// Add this function to extract unique models for a selected make
const getModelsForMake = (make: string) => {
  const modelsMap: Record<string, boolean> = {};
  
  Object.values(FLIGHT_DATA)
    .filter(flight => flight.make === make)
    .forEach(flight => {
      modelsMap[flight.model] = true;
    });
  
  return Object.keys(modelsMap).sort();
};

// Add this function to extract all unique models from FLIGHT_DATA
const getAllUniqueModels = () => {
  const modelsMap: Record<string, boolean> = {};
  
  Object.values(FLIGHT_DATA).forEach(flight => {
    modelsMap[flight.model] = true;
  });
  
  return Object.keys(modelsMap).sort();
};

const FlightInspection: React.FC<FlightInspectionProps> = ({ flightId, hideSidePanel }) => {
  const params = useParams<{ flightId: string }>();
  const currentFlightId = flightId || params.flightId || '';
  const { selectedTeam, teams, selectTeam } = useAuth();
  const [view, setView] = useState<'selection' | 'details'>('selection');
  // State to control team selector dropdown
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  
  // State for flight search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlightId, setSelectedFlightId] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  // State for make/model dropdowns
  const [showMakeDropdown, setShowMakeDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  
  // Get unique aircraft makes and models
  const uniqueMakes = getUniqueAircraftMakes();
  const allModels = getAllUniqueModels();
  const modelsForSelectedMake = selectedMake 
    ? getModelsForMake(selectedMake) 
    : allModels;
  
  // Filter flight options based on search query, make, and model
  const filteredFlights = Object.keys(FLIGHT_DATA)
    .filter(id => {
      const flight = FLIGHT_DATA[id];
      const matchesSearch = id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMake = !selectedMake || flight.make === selectedMake;
      const matchesModel = !selectedModel || flight.model === selectedModel;
      return matchesSearch && matchesMake && matchesModel;
    })
    .map(id => FLIGHT_DATA[id]);
  
  // Use the data for the specified flightId, or null if no selection
  const currentFlight = selectedFlightId ? FLIGHT_DATA[selectedFlightId] : null;
  
  // Create refs for dropdown containers
  const makeDropdownRef = useRef<HTMLDivElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  
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
  
  // Add click outside event handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close make dropdown if clicked outside
      if (makeDropdownRef.current && 
          !makeDropdownRef.current.contains(event.target as Node) && 
          showMakeDropdown) {
        setShowMakeDropdown(false);
      }
      
      // Close model dropdown if clicked outside
      if (modelDropdownRef.current && 
          !modelDropdownRef.current.contains(event.target as Node) && 
          showModelDropdown) {
        setShowModelDropdown(false);
      }
    };
    
    // Add event listener when dropdowns are open
    if (showMakeDropdown || showModelDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMakeDropdown, showModelDropdown]);
  
  // Function to toggle team dropdown
  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };
  
  // Function to handle team selection
  const handleTeamSelect = (teamId: string) => {
    selectTeam(teamId);
    setIsTeamDropdownOpen(false);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
    
    // Clear selected flight if search field is cleared
    if (value === '') {
      setSelectedFlightId('');
    }
  };
  
  // Handle flight selection from dropdown
  const handleFlightSelect = (flightId: string) => {
    setSelectedFlightId(flightId);
    setSearchQuery(flightId);
    setShowDropdown(false);
    
    // Update make and model dropdowns to match selected flight
    const flight = FLIGHT_DATA[flightId];
    if (flight) {
      setSelectedMake(flight.make);
      setSelectedModel(flight.model);
    }
  };
  
  // Handle make selection
  const handleMakeSelect = (make: string) => {
    setSelectedMake(make);
    setSelectedModel(''); // Reset model when make changes
    setShowMakeDropdown(false);
    
    // Find a flight with this make and update if there's exactly one match
    const matchingFlights = Object.entries(FLIGHT_DATA)
      .filter(([_, flight]) => flight.make === make);
    
    if (matchingFlights.length === 1) {
      const [flightId] = matchingFlights[0];
      handleFlightSelect(flightId);
    } else if (selectedFlightId && FLIGHT_DATA[selectedFlightId]?.make !== make) {
      // Clear selected flight if it doesn't match the new make
      setSelectedFlightId('');
      setSearchQuery('');
    }
  };
  
  // Handle model selection
  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setShowModelDropdown(false);
    
    // Find flights with this model
    const matchingFlights = Object.entries(FLIGHT_DATA)
      .filter(([_, flight]) => {
        // If make is selected, filter by both make and model
        if (selectedMake) {
          return flight.make === selectedMake && flight.model === model;
        }
        // Otherwise, just filter by model
        return flight.model === model;
      });
    
    if (matchingFlights.length === 1) {
      // If there's exactly one match, select it
      const [flightId] = matchingFlights[0];
      handleFlightSelect(flightId);
    } else if (selectedFlightId && FLIGHT_DATA[selectedFlightId]?.model !== model) {
      // Clear selected flight if it doesn't match the new model
      setSelectedFlightId('');
      setSearchQuery('');
      
      // If there's exactly one matching make for this model, select it
      const makesMap: Record<string, boolean> = {};
      matchingFlights.forEach(([_, flight]) => {
        makesMap[flight.make] = true;
      });
      
      const uniqueMakesForModel = Object.keys(makesMap);
      if (uniqueMakesForModel.length === 1) {
        setSelectedMake(uniqueMakesForModel[0]);
      }
    }
  };
  
  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedFlightId('');
  };
  
  const handleSelectAndContinue = () => {
    if (currentFlight) {
      setView('details');
    }
  };
  
  if (view === 'details' && currentFlight) {
    return <InspectionDetails 
      flight={currentFlight} 
      onBack={() => setView('selection')} 
      hideSidePanel={hideSidePanel}
    />;
  }
  
  return (
    <MainContent>
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
      
      <PageTitle>Inspections</PageTitle>
      
      <SearchContainer>
        <SearchInputContainer>
          <SearchInput 
            placeholder="Search by Flight Unique Identifier" 
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(searchQuery.length > 0)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          <SearchIconButton>
            <span role="img" aria-label="search">🔍</span>
          </SearchIconButton>
          {showDropdown && (
            <SearchDropdown>
              {filteredFlights.length > 0 ? (
                filteredFlights.map(flight => (
                  <SearchResultItem 
                    key={flight.identifier}
                    onClick={() => handleFlightSelect(flight.identifier)}
                  >
                    {flight.identifier} - {flight.make} {flight.model}
                  </SearchResultItem>
                ))
              ) : (
                <SearchResultItem>No results found</SearchResultItem>
              )}
            </SearchDropdown>
          )}
        </SearchInputContainer>
        <OrText>Or</OrText>
        <div ref={makeDropdownRef} style={{ position: 'relative' }}>
          <DropdownSelect 
            onClick={() => setShowMakeDropdown(!showMakeDropdown)}
          >
            {selectedMake || 'Aircraft Make'} <span>▼</span>
            {showMakeDropdown && (
              <DropdownMenu>
                {selectedMake && (
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleMakeSelect('');
                  }}>
                    Clear selection
                  </DropdownMenuItem>
                )}
                {uniqueMakes.map(make => (
                  <DropdownMenuItem 
                    key={make}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMakeSelect(make);
                    }}
                  >
                    {make}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
            )}
          </DropdownSelect>
        </div>
        <div ref={modelDropdownRef} style={{ position: 'relative' }}>
          <DropdownSelect 
            onClick={() => setShowModelDropdown(!showModelDropdown)}
          >
            {selectedModel || 'Aircraft Model'} <span>▼</span>
            {showModelDropdown && (
              <DropdownMenu>
                {selectedModel && (
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleModelSelect('');
                  }}>
                    Clear selection
                  </DropdownMenuItem>
                )}
                {modelsForSelectedMake.map(model => (
                  <DropdownMenuItem 
                    key={model}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModelSelect(model);
                    }}
                  >
                    {model}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
            )}
          </DropdownSelect>
        </div>
        {(selectedMake || selectedModel || searchQuery) && (
          <ClearFiltersButton onClick={clearFilters}>
            Clear All
          </ClearFiltersButton>
        )}
      </SearchContainer>
      
      {/* Only show flight information if a flight is selected */}
      {currentFlight ? (
        <>
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
                  <img src="https://placehold.co/600x400/3498db/FFFFFF?text=3D+Realistic+Model" alt={`${currentFlight.make} ${currentFlight.model}`} />
                </ModelImage>
              </ModelCard>
              <ModelCaption>3D Realistic Model</ModelCaption>
            </div>
            
            <div>
              <ModelCard>
                <ModelImage>
                  <img src="https://placehold.co/600x400/333333/999999?text=3D+Mesh+Model" alt={`${currentFlight.make} ${currentFlight.model} Wireframe`} />
                </ModelImage>
              </ModelCard>
              <ModelCaption>3D Mesh Model</ModelCaption>
            </div>
          </ModelViewContainer>
          
          <ActionButtonContainer>
            <ActionButton onClick={handleSelectAndContinue}>Select & Continue</ActionButton>
          </ActionButtonContainer>
        </>
      ) : (
        <EmptyStateContainer>
          <EmptyStateIcon>✈️</EmptyStateIcon>
          <EmptyStateText>Search for a flight identifier to view aircraft details</EmptyStateText>
        </EmptyStateContainer>
      )}
    </MainContent>
  );
};

export default FlightInspection; 