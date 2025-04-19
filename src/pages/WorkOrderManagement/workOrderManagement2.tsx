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
  padding: 10px;
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
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TableCell = styled.div`
  padding: 5px 8px;
  color: #ccc;
  font-size: 0.9rem;
  border-right: 1px solid #333;
  
  &:last-child {
    border-right: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const ImageContainerLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const IssueDetailsContainer = styled.div`
  width: 40%;
  padding: 1px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const DetailRow = styled.div`
  margin-bottom: 5px;
`;

const DetailLabel = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 2px;
`;

const DetailValue = styled.div`
  font-size: 0.8rem;
  color: #ccc;
  font-weight: 200;
  margin-bottom: 10px;
`;

const IssueImagesContainer = styled.div`
  width: 60%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  height: 50%;
`;

const ImagePlaceholder = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  height: 50%;
  color: #444;
  font-size: 0.8rem;
  
  &:hover {
    background-color: #252525;
    cursor: pointer;
  }
`;

const SecondImagePlaceholder = styled.div`
  width: 100%;
  height: 50%;
  background-color: #1a1a1a;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
  font-size: 0.8rem;
  
  &:hover {
    background-color: #252525;
    cursor: pointer;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
  margin-bottom: 0px;
`;

const ActionButton = styled.button<{ variant?: string }>`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  
  background-color: ${props => {
    switch (props.variant) {
      case 'primary': return '#ef5e12';
      case 'success': return '#4caf50';
      default: return '#333';
    }
  }};
  
  color: ${props => props.variant ? 'white' : '#ccc'};
  
  &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'primary': return '#f06d2a';
        case 'success': return '#5dbd60';
        default: return '#444';
      }
    }};
  }
`;

const AddRepairsContainer = styled.div`
  margin-top: 15px;
`;

const AddRepairsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const AddButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    background-color: #444;
  }
`;

const RepairItemsList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  font-size: 0.8rem;
  color: #ccc;
  font-weight: 200;
  margin-bottom: 10px;
`;

const RepairItem = styled.li`
  margin-bottom: 2px;
  position: relative;
  font-size: 0.8rem;
  
  &::before {
    content: '>';
    position: absolute;
    left: -15px;
    color: #ccc;
  }
`;

const InvestigateIcon = styled.span`
  color: #ef5e12;
  margin-left: auto;
  font-weight: bold;
`;

const ApproveIcon = styled.span`
  color: #4caf50;
  margin-left: 5px;
  font-weight: bold;
`;

const StatusIcons = styled.div`
  display: flex;
  margin-left: auto;
`;

const RepairInput = styled.textarea`
  width: 100%;
  background-color: #262626;
  border: 1px solid #444;
  border-radius: 4px;
  color: #ccc;
  font-size: 0.8rem;
  padding: 8px;
  margin-bottom: 10px;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #555;
  }
`;

const RepairActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 10px;
`;

const RepairActionButton = styled.button`
  background-color: #333;
  border: none;
  color: #ccc;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: #444;
  }
  
  &.primary {
    background-color: #4caf50;
    color: white;
    
    &:hover {
      background-color: #4caf50;
    }
  }
`;

// Add back the issue data array that was removed in the previous edit
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

interface IssueDetail {
  id: number;
  zone: string;
  issue: string;
  severity: string;
  description: string;
  impact: string;
  possibleResolution: string;
  action: string;
  repairs: string[];
}

// Add a new type to track issue status
type IssueStatus = 'none' | 'investigated' | 'approved';

// Extended issueData with detailed information
const issueDetailsData: IssueDetail[] = [
  { 
    id: issueData[0].id, 
    zone: issueData[0].zone, 
    issue: issueData[0].issue, 
    severity: issueData[0].severity,
    description: 'Minor chips on the Engine blade are detected. Up to 5 chips with 0.25mm to 4mm width are recorded.',
    impact: 'Minimal. This is considered to be wear-and-tear.',
    possibleResolution: 'Follow this issue in next inspection for any further deterioration of blade chips.',
    action: 'Thermal Analysis was recorded as normal. No fluid leaks on the Engine are recorded in this inspection. So, no further action is needed.',
    repairs: ['Analyze for Chip Debris', 'Create Weekly Checkpoint']
  },
  { 
    id: issueData[1].id, 
    zone: issueData[1].zone, 
    issue: issueData[1].issue, 
    severity: issueData[1].severity,
    description: 'Thermal signature shows hot spots in the turbine section. Temperature variance of 35°C above baseline.',
    impact: 'Moderate. May indicate developing turbine inefficiency.',
    possibleResolution: 'Schedule detailed thermal analysis on next ground check.',
    action: 'Document findings and compare with next inspection data to track progression.',
    repairs: ['Record Thermal Values', 'Flag for Engineer Review']
  },
  {
    id: issueData[9].id,
    zone: issueData[9].zone,
    issue: issueData[9].issue,
    severity: issueData[9].severity,
    description: 'Rivets in Zone 22 are rusted heavily, which may lead to lose composites and compromises structural integrity.',
    impact: 'High. This is considered to impact structural integrity of composites.',
    possibleResolution: 'Replace Rivets',
    action: 'Remove the rusted rivets and examine composites and internal parts for leaks or damage. Repair using new rivets.',
    repairs: ['Check for leaks/internal damages', 'Replace Rivets']
  },
  {
    id: issueData[20].id,
    zone: issueData[20].zone,
    issue: issueData[20].issue,
    severity: issueData[20].severity,
    description: 'Lower-side of the back door is damaged from impact with ground vehicle.',
    impact: 'Moderate. This is considered to impact door integrity beyond certain point. Measured damage is below 3mm depth and covers under 10mm area.',
    possibleResolution: 'Repair the door',
    action: 'Since the damage is smaller than the limit, repair will fix the issue.',
    repairs: ['Repair the door damage surface']
  },
  {
    id: issueData[16].id,
    zone: issueData[16].zone,
    issue: issueData[16].issue,
    severity: issueData[16].severity,
    description: 'Paint Peeling on Zone 21 is detected in 508 square inches of area. This may grow with time and exposure to severe weather conditions.',
    impact: 'Moderate. This is considered to impact composite integrity in long-run..',
    possibleResolution: 'Using tape in the area',
    action: 'Clear the paint peels and clean the surface. Apply bonding agents and use tape to cover the exposed surface.',
    repairs: ['Clean the paint peel surface', 'Apply tape with proper bonding agent']
  },
  
  
  // ... add more detailed entries for other issues
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
  const [selectedIssue, setSelectedIssue] = useState<IssueDetail | null>(null);
  const [showAddRepairs, setShowAddRepairs] = useState(false);
  const [issueStatuses, setIssueStatuses] = useState<Record<number, IssueStatus>>({});
  const [newRepair, setNewRepair] = useState("");
  
  // Extract parameters from query string
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  const inspectionType = queryParams.get('inspection');
  
  // Format aircraft name for display
  const formattedAircraftName = aircraftName 
    ? aircraftName.replace(/-/g, ' ').toUpperCase()
    : 'AIRCRAFT';
  // Get unique zones
  const uniqueZones = Array.from(new Set(issueData.map((item: {zone: string}) => item.zone))).sort();
  
  // Severity levels
  const severityLevels = ['Medium', 'High', 'Critical'];
  
  // Filter issues based on selected zone and severity
  const filteredIssues = issueData.filter((issue: {zone: string, severity: string}) => {
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
  
  // Get impact text based on severity
  const getImpactText = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'High';
      case 'High': return 'Moderate';
      case 'Medium': return 'Minimal';
      default: return 'Unknown';
    }
  };
  
  // Handle row click to show issue details
  const handleRowClick = (issue: {id: number, zone: string, issue: string, severity: string}) => {
    // Find the detailed issue data
    const detailedIssue = issueDetailsData.find(detail => 
      detail.zone === issue.zone && detail.issue === issue.issue
    );
    
    // If found, set it as selected, otherwise create a basic detail object
    if (detailedIssue) {
      setSelectedIssue(detailedIssue);
    } else {
      setSelectedIssue({
        id: issue.id,
        zone: issue.zone.slice(-2),
        issue: issue.issue,
        severity: issue.severity,
        description: 'No detailed description available for this issue.',
        impact: `${getImpactText(issue.severity)}. Further inspection recommended.`,
        possibleResolution: 'Schedule further inspection to assess this issue.',
        action: 'Document findings and schedule follow-up inspection.',
        repairs: []
      });
    }
  };
  
  // Handle investigation button click
  const handleInvestigate = () => {
    if (selectedIssue) {
      setIssueStatuses(prev => ({
        ...prev,
        [selectedIssue.id]: 'investigated'
      }));
    }
  };
  
  // Handle approve button click
  const handleApprove = () => {
    if (selectedIssue) {
      setIssueStatuses(prev => ({
        ...prev,
        [selectedIssue.id]: 'approved'
      }));
    }
  };
  
  // Function to render the appropriate status icon based on issue status
  const renderStatusIcon = (issueId: number) => {
    const status = issueStatuses[issueId];
    
    if (status === 'investigated') {
      return <InvestigateIcon>!</InvestigateIcon>;
    } else if (status === 'approved') {
      return (
        <ApproveIcon>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#4caf50" strokeWidth="2"/>
            <path d="M8 12L11 15L16 9" stroke="#4caf50" strokeWidth="2"/>
          </svg>
        </ApproveIcon>
      );
    }
    
    return null;
  };
  
  // Handle adding a new repair
  const handleAddRepair = () => {
    if (selectedIssue && newRepair.trim()) {
      // Create a new issue detail with the updated repairs
      const updatedIssue = {
        ...selectedIssue,
        repairs: [...selectedIssue.repairs, newRepair.trim()]
      };
      
      // Find and update the issue in the details data
      const updatedDetailsData = issueDetailsData.map(issue => 
        issue.id === selectedIssue.id ? updatedIssue : issue
      );
      
      // Update selected issue and reset form
      setSelectedIssue(updatedIssue);
      setNewRepair("");
      setShowAddRepairs(false);
    }
  };
  
  // Handle canceling the repair addition
  const handleCancelAddRepair = () => {
    setNewRepair("");
    setShowAddRepairs(false);
  };
  
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
                <TableRow 
                  key={issue.id}
                  onClick={() => handleRowClick(issue)}
                  style={{ 
                    cursor: 'pointer',
                    backgroundColor: selectedIssue?.id === issue.id ? '#2a2a2a' : undefined
                  }}
                >
                  <TableCell>
                    <SeverityIndicator severity={issue.severity} title={issue.severity} />
                  </TableCell>
                  <TableCell>{issue.zone}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span>{issue.issue}</span>
                      <StatusIcons>
                        {renderStatusIcon(issue.id)}
                      </StatusIcons>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* {selectedIssue && (
            <ButtonsContainer>
              <ActionButton variant="primary">Investigate</ActionButton>
              <ActionButton variant="success">Approve</ActionButton>
              <ActionButton>Export to PDF</ActionButton>
            </ButtonsContainer>
          )} */}
        </LeftSide>
        
        <RightSide>
          <ImageContainer>
            {!selectedIssue ? (
              <PlaceholderText>
                Aircraft Inspection Image
              </PlaceholderText>
            ) : (
              <ImageContainerLayout>
                <IssueDetailsContainer>
                  <DetailRow>
                    <DetailLabel>Category Impact: {selectedIssue.severity}</DetailLabel>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Zone: <span style={{ color: '#ccc', fontWeight: '200' }}>{selectedIssue.zone.slice(-2)}</span></DetailLabel>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Inspection: <span style={{ color: '#ccc', fontWeight: '200' }}>{selectedIssue.issue} Inspection</span></DetailLabel>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Issue: <span style={{ color: '#ccc', fontWeight: '200' }}>{selectedIssue.issue}</span></DetailLabel>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Description:</DetailLabel>
                    <DetailValue>{selectedIssue.description}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Impact: {getImpactText(selectedIssue.severity)}</DetailLabel>
                    <DetailValue>
                      {selectedIssue.impact.split('.')[1]?.trim() || 'Further assessment needed.'}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Possible Resolution:</DetailLabel>
                    <DetailValue>{selectedIssue.possibleResolution}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Action:</DetailLabel>
                    <DetailValue>{selectedIssue.action}</DetailValue>
                  </DetailRow>
                  
                  <AddRepairsContainer>
                    <AddRepairsHeader>
                      <DetailLabel>Add Repairs/Analysis:</DetailLabel>
                      <AddButton onClick={() => setShowAddRepairs(!showAddRepairs)}>+</AddButton>
                    </AddRepairsHeader>
                    
                    {showAddRepairs && (
                      <>
                        <RepairInput
                          value={newRepair}
                          onChange={(e) => setNewRepair(e.target.value)}
                          placeholder="Enter repair or analysis details..."
                        />
                        <RepairActionButtons>
                          <RepairActionButton onClick={handleCancelAddRepair}>
                            Cancel
                          </RepairActionButton>
                          <RepairActionButton 
                            className="primary"
                            onClick={handleAddRepair}
                            disabled={!newRepair.trim()}
                          >
                            Add
                          </RepairActionButton>
                        </RepairActionButtons>
                      </>
                    )}
                    
                    {selectedIssue.repairs.length > 0 && (
                      <RepairItemsList> 
                        {selectedIssue.repairs.map((repair, index) => (
                          <RepairItem key={index}>{repair}</RepairItem>
                        ))}
                      </RepairItemsList>
                    )}
                  </AddRepairsContainer>
                {selectedIssue && (
                <ButtonsContainer>
                <ActionButton variant="primary" onClick={handleInvestigate}>Investigate</ActionButton>
                <ActionButton variant="success" onClick={handleApprove}>Approve</ActionButton>
                <ActionButton>Export to PDF</ActionButton>
                </ButtonsContainer>
            )}
                </IssueDetailsContainer>
                <IssueImagesContainer>
                  {/* <ImagesGrid> */}
                    <ImagePlaceholder>Add Image here</ImagePlaceholder>
                    {/* <ImagePlaceholder>Click to add image</ImagePlaceholder>
                    <ImagePlaceholder>Click to add image</ImagePlaceholder>
                    <ImagePlaceholder>Click to add image</ImagePlaceholder> */}
                  {/* </ImagesGrid> */}
                  
                  <SecondImagePlaceholder>
                    Add Image here
                  </SecondImagePlaceholder>
                </IssueImagesContainer>
              </ImageContainerLayout>
            )}
          </ImageContainer>
        </RightSide>
      </ContentLayout>
    </MainContent>
  );
};

export default WorkOrderDetail; 