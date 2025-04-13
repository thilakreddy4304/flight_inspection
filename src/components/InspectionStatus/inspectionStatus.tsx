import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const InspectionStatusContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 150px;
`;

const StatusTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 16px 0;
  color: white;
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusNumber = styled.span`
  font-weight: 600;
`;

const StatusLabel = styled.span`
  color: #ccc;
`;

const InspectionStatus: React.FC = () => {
  // Mock data for inspection statuses
  const items = [
    { number: 74, label: ' Inspections-Scheduled' },
    { number: 23, label: 'Inspections-In-progress' },
    { number: 22, label: 'Inspections-Ready-to-Review' },
    { number: 5, label: 'Inspections-Complete' },
  ];
  
  return (
    <Container>
      <InspectionStatusContainer>
        <StatusTitle>Inspections Status [today]</StatusTitle>
        <StatusList>
          {items.map((item, index) => (
            <StatusItem key={index}>
              <StatusNumber>{item.number}</StatusNumber>
              <StatusLabel>{item.label}</StatusLabel>
            </StatusItem>
          ))}
        </StatusList>
      </InspectionStatusContainer>
    </Container>
  );
};

export default InspectionStatus; 