import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

const BreadcrumbText = styled.span`
  color: #ccc;
  font-size: 1rem;
  margin-left: 16px;
  
  a {
    color: #ccc;
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
      color: white;
    }
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;

  &:hover {
    color: #fff;
  }
`;

const PageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #fff;
`;

const SubtitleText = styled.div`
  font-size: 1rem;
  color: #999;
  margin-bottom: 15px;
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const LeftSide = styled.div`
  width: 40%;
  flex: 0 0 25%;
  max-width: 40%;
`;

const RightSide = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 90%;
  height: 100%;
  padding: 20px;
  margin-top: 50px;
  margin-left: 50px;
  min-height: 600px;
  background-color: #121212;
  border-radius: 32px;
  border: 3px solid #333;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceholderText = styled.div`
  color: #666;
  font-size: 1.2rem;
  text-align: center;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const FilterLabel = styled.span`
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
`;

const DropdownSelect = styled.div`
  background-color: #222;
  padding: 6px 8px;
  border-radius: 8px;
  color: #444;
  min-width: 150px;
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
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  z-index: 10;
  max-height: 250px;
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
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  align-self: center;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Table = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: auto;
  border: 1px solid #333;
  background-color: #121212;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 90px 1fr;
  background-color: #2b2a2a;
  border-bottom: 1px solid #333;
`;

const HeaderCell = styled.div`
  padding: 5px 8px;
  font-weight: 500;
  font-size:1.1rem;
  color: #fff;
  text-align: left;
  border-right: 1px solid #333;
  
  &:last-child {
    border-right: none;
  }
`;

const TableBody = styled.div`
  width: 100%;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 50px 90px 1fr;
  border-bottom: 1px solid #333;
  background-color: #1e1e1e;
  
  &:nth-child(odd) {
    background-color: #1a1a1a;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  &.highlighted {
    background-color: rgba(75, 75, 75, 0.5);
  }
`;

const TableCell = styled.div`
  padding: 5px 8px;
  color: #ccc;
  font-size: 0.9rem;
  border-right: 1px solid #333;
  
  &:last-child {
    border-right: none;
  }
`;

const SeverityIndicator = styled.div<{ severity: string }>`
  width: 0;
  height: 0;
  margin: 0 auto;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid ${({ severity }) => {
    switch (severity) {
      case 'Critical': return '#FF4444';
      case 'High': return '#FF8800';
      case 'Medium': return '#FFDD00';
      default: return '#888888';
    }
  }};
`;

const DetailContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #333;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #fff;
`;

const TextBlock = styled.div`
  background-color: #262626;
  border-radius: 6px;
  padding: 15px;
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
`;

// Sample data based on the image
const issueData = [
  { id: 1, severity: 'Medium', zone: 'Zone12', issue: 'Engine Blades' },
  { id: 2, severity: 'High', zone: 'Zone11', issue: 'Engine Thermal Analysis' },
  { id: 3, severity: 'High', zone: 'Zone01', issue: 'Engine Fluid Leaks' },
  { id: 4, severity: 'Critical', zone: 'Zone12', issue: 'Wing Tips' },
  { id: 5, severity: 'Critical', zone: 'Zone03', issue: 'Wing Rivets' },
  { id: 6, severity: 'Medium', zone: 'Zone01', issue: 'Wing Rudders' },
  { id: 7, severity: 'Medium', zone: 'Zone01', issue: 'Rivets' },
  { id: 8, severity: 'High', zone: 'Zone21', issue: 'Rivets' },
  { id: 9, severity: 'Critical', zone: 'Zone22', issue: 'Rivets' },
  { id: 10, severity: 'Critical', zone: 'Zone24', issue: 'Rivets' },
  { id: 11, severity: 'Medium', zone: 'Zone24', issue: 'Rivets' },
  { id: 12, severity: 'Medium', zone: 'Zone02', issue: 'Rivets' },
  { id: 13, severity: 'High', zone: 'Zone16', issue: 'Rivets' },
  { id: 14, severity: 'Medium', zone: 'Zone01', issue: 'Rivets' },
  { id: 15, severity: 'Medium', zone: 'Zone11', issue: 'Rivets' },
  { id: 16, severity: 'High', zone: 'Zone21', issue: 'Paint Peel' },
  { id: 17, severity: 'Medium', zone: 'Zone12', issue: 'Landing Gear' },
  { id: 18, severity: 'Medium', zone: 'Zone17', issue: 'Fluid Leak' },
  { id: 19, severity: 'High', zone: 'Zone15', issue: 'Fluid Leak' },
  { id: 20, severity: 'Medium', zone: 'Zone16', issue: 'Door Opening' },
  { id: 21, severity: 'Medium', zone: 'Zone01', issue: 'Nose FOD' },
];

interface WorkOrderDetailProps {}

const WorkOrderDetail: React.FC<WorkOrderDetailProps> = () => {
  const { aircraftName } = useParams<{ aircraftName: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTeam, teams, selectTeam } = useAuth();
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const severityDropdownRef = useRef<HTMLDivElement>(null);
  const zoneDropdownRef = useRef<HTMLDivElement>(null);
  
  // Extract parameters from query string
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  const inspectionType = queryParams.get('inspection');
  
  // Format aircraft name for display
  const formattedAircraftName = aircraftName 
    ? aircraftName.replace(/-/g, ' ').toUpperCase()
    : 'AIRCRAFT';
  // Get unique zones
  const uniqueZones = Array.from(new Set(issueData.map(item => item.zone))).sort();
  
  // Severity levels
  const severityLevels = ['Medium', 'High', 'Critical'];
  
  // Filter issues based on selected zone and severity
  const filteredIssues = issueData.filter(issue => {
    const matchesZone = !selectedZone || issue.zone === selectedZone;
    const matchesSeverity = !selectedSeverity || issue.severity === selectedSeverity;
    return matchesZone && matchesSeverity;
  });
  
  // Function to toggle team dropdown
  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };
  
  // Function to handle team selection
  const handleTeamSelect = (teamId: string) => {
    selectTeam(teamId);
    setIsTeamDropdownOpen(false);
  };
  
  // Function to handle back button click
  const handleBack = () => {
    navigate('/workOrderManagement');
  };
  
  // Function to handle severity selection
  const handleSeveritySelect = (severity: string) => {
    setSelectedSeverity(severity === selectedSeverity ? '' : severity);
    setShowSeverityDropdown(false);
  };
  
  // Function to handle zone selection
  const handleZoneSelect = (zone: string) => {
    setSelectedZone(zone === selectedZone ? '' : zone);
    setShowZoneDropdown(false);
  };
  
  // Function to clear all filters
  const clearFilters = () => {
    setSelectedSeverity('');
    setSelectedZone('');
  };
  
  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (severityDropdownRef.current && 
          !severityDropdownRef.current.contains(event.target as Node) && 
          showSeverityDropdown) {
        setShowSeverityDropdown(false);
      }
      
      if (zoneDropdownRef.current && 
          !zoneDropdownRef.current.contains(event.target as Node) && 
          showZoneDropdown) {
        setShowZoneDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSeverityDropdown, showZoneDropdown]);
  
  return (
    <MainContent>
      <TopBar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <BreadcrumbText>
            &gt; <a onClick={handleBack}>Work Order Management</a>
          </BreadcrumbText>
        </div>
      </TopBar>
      
      {/* <BackButton onClick={handleBack}>
        &lt; Back to Work Orders
      </BackButton> */}
      
      <PageHeaderContainer>
        <PageTitle>{inspectionType} : {formattedAircraftName}</PageTitle>
      </PageHeaderContainer>
      
      <ContentLayout>
        <LeftSide>
          <FilterContainer>
            <FilterLabel>Filter:</FilterLabel>
            <div ref={severityDropdownRef} style={{ position: 'relative' }}>
              <DropdownSelect onClick={() => setShowSeverityDropdown(!showSeverityDropdown)}>
                {selectedSeverity || 'By Severity'} <span>▼</span>
                {showSeverityDropdown && (
                  <DropdownMenu>
                    {selectedSeverity && (
                      <DropdownMenuItem onClick={() => handleSeveritySelect('')}>
                        Clear selection
                      </DropdownMenuItem>
                    )}
                    {severityLevels.map(severity => (
                      <DropdownMenuItem 
                        key={severity}
                        onClick={() => handleSeveritySelect(severity)}
                      >
                        {severity}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenu>
                )}
              </DropdownSelect>
            </div>
            
            <div ref={zoneDropdownRef} style={{ position: 'relative' }}>
              <DropdownSelect onClick={() => setShowZoneDropdown(!showZoneDropdown)}>
                {selectedZone || 'By Zones'} <span>▼</span>
                {showZoneDropdown && (
                  <DropdownMenu>
                    {selectedZone && (
                      <DropdownMenuItem onClick={() => handleZoneSelect('')}>
                        Clear selection
                      </DropdownMenuItem>
                    )}
                    {uniqueZones.map(zone => (
                      <DropdownMenuItem 
                        key={zone}
                        onClick={() => handleZoneSelect(zone)}
                      >
                        {zone}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenu>
                )}
              </DropdownSelect>
            </div>
            
            {(selectedSeverity || selectedZone) && (
              <ClearFiltersButton onClick={clearFilters}>
                Clear
              </ClearFiltersButton>
            )}
          </FilterContainer>
          
          <Table>
            <TableHeader>
              <HeaderCell></HeaderCell>
              <HeaderCell>Zone</HeaderCell>
              <HeaderCell>Issue List</HeaderCell>
            </TableHeader>
            <TableBody>
              {filteredIssues.map(issue => (
                <TableRow key={issue.id}>
                  <TableCell>
                    <SeverityIndicator severity={issue.severity} title={issue.severity} />
                  </TableCell>
                  <TableCell>{issue.zone}</TableCell>
                  <TableCell>{issue.issue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </LeftSide>
        
        <RightSide>
          <ImageContainer>
            <PlaceholderText>
              Aircraft Inspection Image
            </PlaceholderText>
          </ImageContainer>
        </RightSide>
      </ContentLayout>
    </MainContent>
  );
};

export default WorkOrderDetail; 