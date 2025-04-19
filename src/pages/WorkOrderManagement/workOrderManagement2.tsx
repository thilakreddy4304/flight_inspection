import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #fff;
`;

const DetailContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #333;
`;

const WorkOrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OrderId = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
`;

const OrderDescription = styled.div`
  font-size: 1rem;
  color: #ccc;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ccc;
`;

const PriorityBadge = styled.span`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ccc;
  margin-left: 10px;
`;

const DetailSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #fff;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

const DetailCard = styled.div`
  background-color: #262626;
  border-radius: 6px;
  padding: 15px;
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 5px;
`;

const DetailValue = styled.div`
  font-size: 1rem;
  color: #ccc;
`;

const TextBlock = styled.div`
  background-color: #262626;
  border-radius: 6px;
  padding: 15px;
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ActionButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    background-color: #444;
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

// Sample work order data
const workOrders = {
  '1': {
    id: '1',
    title: 'FAA-Mandated A-Check',
    description: 'Complete A-Check inspection for Boeing 737-10 MAX',
    aircraft: 'Boeing 737-10 MAX',
    tailNumber: 'N7201S',
    status: 'In-Progress',
    priority: 'High',
    createdDate: '04/01/2025',
    dueDate: '04/15/2025',
    lastUpdated: '04/02/2025',
    assignedTo: 'John Smith',
    team: 'MRO Team 1',
    location: 'Hangar 5B',
    estimatedHours: '24',
    details: 'Perform comprehensive A-Check maintenance inspection according to Boeing service manual and FAA requirements. Include all tasks listed in checklist A-737-100.',
    notes: 'Previous inspection noted minor hydraulic leak in landing gear area. Pay special attention to hydraulic lines and connections.',
    attachments: [
      { name: 'A-Check Checklist.pdf', size: '2.3 MB' },
      { name: 'Previous Inspection Report.pdf', size: '1.7 MB' }
    ]
  },
  '2': {
    id: '2',
    title: 'Wing Inspection',
    description: 'Inspect wing structural integrity and control surfaces',
    aircraft: 'Boeing 737-900',
    tailNumber: 'N37439',
    status: 'Completed',
    priority: 'Low',
    createdDate: '04/01/2025',
    dueDate: '04/15/2025',
    lastUpdated: '04/14/2025',
    assignedTo: 'Sarah Johnson',
    team: 'Wing Inspection Team',
    location: 'Hangar 3A',
    estimatedHours: '16',
    details: 'Conduct thorough wing inspection focusing on structural components, control surfaces, and attachment points. Check for any signs of corrosion, fatigue, or delamination.',
    notes: 'Aircraft experienced moderate turbulence during last flight. Captain reported nothing unusual but requested preventative inspection.',
    attachments: [
      { name: 'Wing Inspection Procedure.pdf', size: '3.1 MB' },
      { name: 'Completion Photos.zip', size: '12.5 MB' }
    ]
  }
};

interface WorkOrderDetailProps {}

const WorkOrderDetail: React.FC<WorkOrderDetailProps> = () => {
  const { aircraftName } = useParams<{ aircraftName: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTeam, teams, selectTeam } = useAuth();
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = React.useState(false);
  
  // Extract orderId from query parameters
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  
  // Get work order data based on ID
  const workOrder = orderId ? workOrders[orderId as keyof typeof workOrders] : null;
  
  // Find orders matching the aircraft name if no specific order is found
  const findOrdersByAircraft = () => {
    if (!aircraftName) return null;
    
    const formattedAircraftName = aircraftName.replace(/-/g, ' ');
    
    // Find all orders with matching aircraft (case insensitive)
    const matchingOrders = Object.values(workOrders).filter(order => 
      order.aircraft.toLowerCase().includes(formattedAircraftName.toLowerCase())
    );
    
    return matchingOrders.length > 0 ? matchingOrders[0] : null;
  };
  
  // Use orderId first, then fall back to matching by aircraft name
  const displayOrder = workOrder || findOrdersByAircraft();
  
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
  
  if (!displayOrder) {
    return (
      <MainContent>
        <BackButton onClick={handleBack}>
          &lt; Back to Work Orders
        </BackButton>
        <PageTitle>Work Order Not Found</PageTitle>
        <p>No work order found for aircraft: {aircraftName}</p>
      </MainContent>
    );
  }
  
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
      
      <BackButton onClick={handleBack}>
        &lt; Back to Work Orders
      </BackButton>
      
      <PageHeader>
        <PageTitle>A-Check: {displayOrder.aircraft}</PageTitle>
      </PageHeader>
      
      <DetailContainer>
        <WorkOrderHeader>
          <OrderInfo>
            <OrderId>Work Order {displayOrder.id}</OrderId>
            <OrderDescription>{displayOrder.description}</OrderDescription>
          </OrderInfo>
          <div>
            <StatusBadge>{displayOrder.status}</StatusBadge>
            <PriorityBadge>Priority: {displayOrder.priority}</PriorityBadge>
          </div>
        </WorkOrderHeader>
        
        <DetailRow>
          <DetailCard>
            <DetailLabel>Aircraft</DetailLabel>
            <DetailValue>{displayOrder.aircraft}</DetailValue>
          </DetailCard>
          <DetailCard>
            <DetailLabel>Tail Number</DetailLabel>
            <DetailValue>{displayOrder.tailNumber}</DetailValue>
          </DetailCard>
        </DetailRow>
        
        <DetailRow>
          <DetailCard>
            <DetailLabel>Created Date</DetailLabel>
            <DetailValue>{displayOrder.createdDate}</DetailValue>
          </DetailCard>
          <DetailCard>
            <DetailLabel>Due Date</DetailLabel>
            <DetailValue>{displayOrder.dueDate}</DetailValue>
          </DetailCard>
        </DetailRow>
        
        <DetailRow>
          <DetailCard>
            <DetailLabel>Assigned To</DetailLabel>
            <DetailValue>{displayOrder.assignedTo}</DetailValue>
          </DetailCard>
          <DetailCard>
            <DetailLabel>Team</DetailLabel>
            <DetailValue>{displayOrder.team}</DetailValue>
          </DetailCard>
        </DetailRow>
        
        <DetailRow>
          <DetailCard>
            <DetailLabel>Location</DetailLabel>
            <DetailValue>{displayOrder.location}</DetailValue>
          </DetailCard>
          <DetailCard>
            <DetailLabel>Estimated Hours</DetailLabel>
            <DetailValue>{displayOrder.estimatedHours}</DetailValue>
          </DetailCard>
        </DetailRow>
      </DetailContainer>
      
      <DetailSection>
        <SectionTitle>Details</SectionTitle>
        <TextBlock>
          {displayOrder.details}
        </TextBlock>
      </DetailSection>
      
      <DetailSection>
        <SectionTitle>Notes</SectionTitle>
        <TextBlock>
          {displayOrder.notes}
        </TextBlock>
      </DetailSection>
      
      <DetailSection>
        <SectionTitle>Attachments</SectionTitle>
        {displayOrder.attachments.map((attachment, index) => (
          <DetailCard key={index} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <DetailValue>{attachment.name}</DetailValue>
              <DetailLabel>{attachment.size}</DetailLabel>
            </div>
          </DetailCard>
        ))}
      </DetailSection>
      
      <div style={{ display: 'flex', marginTop: '30px' }}>
        <ActionButton>Update Status</ActionButton>
        <ActionButton>Add Note</ActionButton>
        <ActionButton>Upload Attachment</ActionButton>
      </div>
    </MainContent>
  );
};

export default WorkOrderDetail; 