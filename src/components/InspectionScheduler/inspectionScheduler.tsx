import React from 'react';
import styled from 'styled-components';

const SchedulerContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  padding: 24px;
  width: 50%;
  text-align: left;
`;

const SchedulerTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  color: white;
  text-align: left;
`;

const SchedulerGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

const SchedulerItem = styled.div`
  display: flex;
  align-items: center;
`;

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  flex-shrink: 0;
`;

const SchedulerText = styled.div`
  font-size: 1rem;
  color: #CCC;
`;

const ActionButton = styled.button`
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  margin-top: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;
  
  &:hover {
    background-color: #34495e;
  }
`;

interface InspectionSchedulerProps {
  onViewSchedule: () => void;
}

const InspectionScheduler: React.FC<InspectionSchedulerProps> = ({ onViewSchedule }) => {
  return (
    <SchedulerContainer>
      <SchedulerTitle>Inspection Scheduler</SchedulerTitle>
      
      <SchedulerGrid>
        <SchedulerItem>
          <IconCircle>
            <span>📅</span>
          </IconCircle>
          <SchedulerText>124 inspections scheduled for today</SchedulerText>
        </SchedulerItem>
        
        <SchedulerItem>
          <IconCircle>
            <span>📆</span>
          </IconCircle>
          <SchedulerText>1259 inspections scheduled for this week</SchedulerText>
        </SchedulerItem>
        
        <SchedulerItem>
          <IconCircle>
            <span>✓</span>
          </IconCircle>
          <SchedulerText>879 completed out of 1259 inspections this week</SchedulerText>
        </SchedulerItem>
      </SchedulerGrid>
      
      <ActionButton onClick={onViewSchedule}>
        View Schedule
      </ActionButton>
    </SchedulerContainer>
  );
};

export default InspectionScheduler; 