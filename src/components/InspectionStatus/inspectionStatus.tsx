import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  padding: 24px;
  margin-top: 150px;
`;

const StatusTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 24px 0;
  color: white;
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusName = styled.div`
  color: #CCC;
`;

const StatusCount = styled.div<{ status: string }>`
  font-weight: 600;
  color: #CCC;
`;

interface StatusData {
  status: string;
  label: string;
  count: number;
}

const InspectionStatus: React.FC = () => {
  // Mock data for inspection statuses
  const statuses: StatusData[] = [
    { status: 'scheduled', label: 'Scheduled', count: 74 },
    { status: 'in-progress', label: 'In-progress', count: 23 },
    { status: 'review', label: 'Ready-to-Review', count: 22 },
    { status: 'complete', label: 'Complete', count: 5 },
  ];
  
  return (
    <StatusContainer>
      <StatusTitle>Inspections Status [today]</StatusTitle>
      
      <StatusList>
        {statuses.map((item, index) => (
          <StatusItem key={index}>
            <StatusName>{item.count} Inspections - </StatusName>
            <StatusCount status={item.status}>{item.label}</StatusCount>
          </StatusItem>
        ))}
      </StatusList>
    </StatusContainer>
  );
};

export default InspectionStatus; 