import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const MainContent = styled.div`
  width: 100%;
  padding: 0 8px;
  overflow-x: auto;
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
  margin-bottom: 24px;
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

const SearchInput = styled.input`
  background-color: #222;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  color: #CCC;
  width: 250px;
  
  &:focus {
    outline: none;
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
  grid-template-columns: repeat(6, 1fr);
  background-color:rgb(43, 42, 42);
  border-bottom: 1px solid #333;
  width: 100%;
`;

const HeaderCell = styled.div`
  padding: 8px 16px;
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
  grid-template-columns: repeat(6, 1fr);
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
  { id: '1', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '2', createdDate: '04/01/2025', aircraft: 'Boeing 737-900', inspection: 'Wing Inspection', status: 'Completed', completionDate: '04/15/2025', priority: 'Low' },
  { id: '3', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '4', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '5', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '6', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '7', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '8', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '9', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '10', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '11', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
  { id: '12', createdDate: '04/01/2025', aircraft: 'Boeing 737-10 MAX', inspection: 'FAA-Mandated A-Check', status: 'In-Progress', completionDate: '04/15/2025', priority: 'High' },
];

// Filter options
const filterOptions = {
  status: ['All', 'In-Progress', 'Completed'],
  aircraft: ['All', 'Boeing 737-10 MAX', 'Boeing 737-900']
};

const WorkOrderManagement: React.FC = () => {
  const { selectedTeam, teams, selectTeam } = useAuth();
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({ status: 'All', aircraft: 'All' });
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle team dropdown
  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
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

  // Filter work orders based on current filters and search
  const filteredWorkOrders = workOrdersData.filter(order => {
    const matchesSearch = !searchQuery || order.aircraft.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = currentFilter.status === 'All' || order.status === currentFilter.status;
    const matchesAircraft = currentFilter.aircraft === 'All' || order.aircraft === currentFilter.aircraft;
    
    return matchesSearch && matchesStatus && matchesAircraft;
  });
  
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
      
      <PageTitle>Work Order Management</PageTitle>
      
      <SearchContainer>
        <FilterDropdown onClick={() => {/* Toggle dropdown */}}>
          All <span>▼</span>
        </FilterDropdown>
        <OrText>Or</OrText>
        <FilterDropdown onClick={() => {/* Toggle dropdown */}}>
          Aircraft Make <span>▼</span>
        </FilterDropdown>
        <FilterDropdown onClick={() => {/* Toggle dropdown */}}>
          Aircraft Model <span>▼</span>
        </FilterDropdown>
        <SearchInput 
          placeholder="Search by Flight Unique Identifier" 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      
      <Table>
        <TableHeader>
          <HeaderCell>Created Date</HeaderCell>
          <HeaderCell>Aircraft</HeaderCell>
          <HeaderCell>Inspection</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          <HeaderCell>Completion Date</HeaderCell>
          <HeaderCell>Priority</HeaderCell>
        </TableHeader>
        <TableBody>
          {filteredWorkOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.createdDate}</TableCell>
              <TableCell>{order.aircraft}</TableCell>
              <TableCell>{order.inspection}</TableCell>
              <TableCell>
                <StatusBadge status={order.status}>
                  {order.status}
                </StatusBadge>
              </TableCell>
              <TableCell>{order.completionDate}</TableCell>
              <TableCell>
                <PriorityBadge priority={order.priority}>
                  {order.priority}
                </PriorityBadge>
              </TableCell>
            </TableRow>
          ))}
          
          {/* Add 8 empty rows */}
          {[...Array(2)].map((_, index) => (
            <TableRow key={`empty-${index}`}>
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

export default WorkOrderManagement; 