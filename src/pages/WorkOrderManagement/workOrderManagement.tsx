import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MainContent = styled.div`
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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

const BreadcrumbText = styled.span`
  color: #ccc;
  font-size: 1rem;
  margin-left: 16px;
  
  span {
    color: white;
    text-decoration: underline;
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
  width: 80%;
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
  // align-items: center;
  // justify-content: center;
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

const DropdownSelect = styled.div`
  background-color: #222;
  padding: 12px 16px;
  border-radius: 24px;
  color: grey;
  min-width: 150px;
  // margin-right: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #222;
  margin-right: 100px;
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

const SearchResultItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #ccc;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FilterDropdown = styled.div`
  background-color: #222;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 150px;
  cursor: pointer;
  
  &:hover {
    background-color: #333;
  }
`;

const OrText = styled.span`
  color: #777;
`;

// New Table Styled Components
const Table = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  border: 1px solid #333;
  background-color: #121212;
  min-width: 1200px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color:rgb(43, 42, 42);
  border-bottom: 1px solid #333;
  width: 100%;
`;

const HeaderCell = styled.div`
  padding: 4px 8px;
  font-weight: 500;
  font-size: 1rem;
  width: 100%;
  color: #fff;
  text-align: center;
  border-right: 1px solid #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:last-child {
    border-right: none;
  }
`;

const TableBody = styled.div`
  width: 100%;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #333;
  background-color: #1E1E1E;
  width: 100%;
  
  &:hover {
    background-color: #252525;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  padding: 12px 16px;
  color: #CCC;
  font-size: 0.8rem;
  border-right: 1px solid #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  
  &:last-child {
    border-right: none;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #CCC;
`;

const PriorityBadge = styled.span<{ priority: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #CCC;
`;

// Sample data for work orders based on image
const workOrdersData = [
  { id: '1', Date: '04/01/2025', aircraft: 'DL4890 (B737-10)', inspection: ' A-Check', status: 'In AME Review', compliance: 'In-Progress', priority: 'High', Approve: 'Approved' },
  { id: '2', Date: '04/01/2025', aircraft: 'DL1234 (A319)', inspection: 'Wing Inspection', status: 'Complete', compliance: 'Complete', priority: 'Low', Approve: 'Approved' },
  { id: '3', Date: '04/01/2025', aircraft: 'DL5678 (A350)', inspection: 'A-Check', status: 'In AME Review', compliance: 'In-Progress', priority: 'High', Approve: 'Approved' },
  { id: '4', Date: '04/01/2025', aircraft: 'AA137 (A320)', inspection: 'Pre-Check', status: 'In AME Review', compliance: 'In-Progress', priority: 'High', Approve: 'Approved' },
  { id: '5', Date: '04/01/2025', aircraft: 'UA5432 (B777)', inspection: 'Pre-Check', status: 'In AME Review', compliance: 'In-Progress', priority: 'High', Approve: 'Approved' },
  { id: '6', Date: '04/01/2025', aircraft: 'BA2901 (A380)', inspection: 'Pre-Check', status: 'In AME Review', compliance: 'In-Progress', priority: 'High', Approve: 'Approved' },
  { id: '7', Date: '04/01/2025', aircraft: 'DL4890 (B737-10)', inspection: 'Pre-Check', status: 'Complete', compliance: 'Complete', priority: 'High', Approve: 'Approved' },
  { id: '8', Date: '04/01/2025', aircraft: 'DL1234 (A319)', inspection: 'Pre-Check', status: 'Complete', compliance: 'Complete', priority: 'High', Approve: 'Approved' },
  { id: '9', Date: '04/01/2025', aircraft: 'DL5678 (A350)', inspection: 'Engine Inspection', status: 'Complete', compliance: 'Complete', priority: 'High', Approve: 'Approved' },
  { id: '10', Date: '04/01/2025', aircraft: 'AA137 (A320)', inspection: 'Fuselage Inspection', status: 'Complete', compliance: 'Complete', priority: 'High', Approve: 'Approved' },
  { id: '11', Date: '04/01/2025', aircraft: 'UA5432 (B777)', inspection: 'Nose Inspection', status: 'Complete', compliance: 'Complete', priority: 'High', Approve: 'Approved' },
  { id: '12', Date: '04/01/2025', aircraft: 'BA2901 (A380)', inspection: 'Wing Inspection', status: 'Complete', compliance: 'Complete', priority: 'High', Approve: 'Approved' },
];

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


// Filter options
const filterOptions = {
  status: ['All', 'In-Progress', 'Completed'],
  aircraft: ['All', 'Boeing 737-10 MAX', 'Boeing 737-900']
};

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


const WorkOrderManagement: React.FC = () => {
  const navigate = useNavigate();
  const { selectedTeam, teams, selectTeam } = useAuth();
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({ status: 'All', aircraft: 'All' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedFlightId, setSelectedFlightId] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMakeDropdown, setShowMakeDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const makeDropdownRef = useRef<HTMLDivElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);

  const uniqueMakes = getUniqueAircraftMakes();
  const allModels = getAllUniqueModels();
  const modelsForSelectedMake = selectedMake 
    ? getModelsForMake(selectedMake) 
    : allModels;


  const filteredFlights = Object.keys(FLIGHT_DATA)
.filter(id => {
  const flight = FLIGHT_DATA[id];
  const matchesSearch = id.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesMake = !selectedMake || flight.make === selectedMake;
  const matchesModel = !selectedModel || flight.model === selectedModel;
  return matchesSearch && matchesMake && matchesModel;
})
.map(id => FLIGHT_DATA[id]);

  // Toggle team dropdown
  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };

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

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedFlightId('');
  };

  // Handle team selection
  const handleTeamSelect = (teamId: string) => {
    selectTeam(teamId);
    setIsTeamDropdownOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
  // Filter work orders based on current filters and search
  const filteredWorkOrders = workOrdersData.filter(order => {
    const matchesSearch = !searchQuery || order.aircraft.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = currentFilter.status === 'All' || order.status === currentFilter.status;
    const matchesAircraft = currentFilter.aircraft === 'All' || order.aircraft === currentFilter.aircraft;
    
    return matchesSearch && matchesStatus && matchesAircraft;
  });
  
  // Handle row click to navigate to detail page
  const handleRowClick = (order: any) => {
    const aircraftName = order.aircraft.replace(/\s+/g, '-').toLowerCase();
    navigate(`/workOrderManagement/${aircraftName}?orderId=${order.id}&inspection=${encodeURIComponent(order.inspection)}`);
  };

  return (
    <MainContent>
      <TopBar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TeamSelector onClick={toggleTeamDropdown}>
            Team: {selectedTeam?.name} 
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
          {/* <BreadcrumbText>
            &gt; <span>Work Order Management</span>
          </BreadcrumbText> */}
        </div>
      </TopBar>
      
      <PageTitle>Work Order Management</PageTitle>
      
      <SearchContainer>
        <div style={{ position: 'relative' }}>
          <DropdownSelect 
            onClick={() => {/* Toggle dropdown */}}
          >
            All <span>▼</span>
          </DropdownSelect>
        </div>
        <OrText>Or</OrText>
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
      
      <Table>
        <TableHeader>
          <HeaderCell>Date</HeaderCell>
          <HeaderCell>Aircraft</HeaderCell>
          <HeaderCell>Inspection</HeaderCell>
          <HeaderCell>Priority</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          <HeaderCell>Compliance</HeaderCell>
          <HeaderCell>Approve</HeaderCell>
        </TableHeader>
        <TableBody>
          {filteredWorkOrders.map(order => (
            <TableRow 
              key={order.id}
              onClick={() => handleRowClick(order)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{order.Date}</TableCell>
              <TableCell>{order.aircraft}</TableCell>
              <TableCell>{order.inspection}</TableCell>
              <TableCell>
                <PriorityBadge priority={order.priority}>
                  {order.priority}
                </PriorityBadge>
              </TableCell>
              <TableCell>
                <StatusBadge status={order.status}>
                  {order.status}
                </StatusBadge>
              </TableCell>
              <TableCell>{order.compliance}</TableCell>
              <TableCell>{order.Approve}</TableCell>
            </TableRow>
          ))}
          
          {/* Empty rows should have the same number of cells */}
          {[...Array(2)].map((_, index) => (
            <TableRow key={`empty-${index}`} style={{ cursor: 'default' }}>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainContent>
  );
};

export default WorkOrderManagement