import React from 'react';
import styled from 'styled-components';

// ======= Scheduler Styled Components =======
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

// ======= Chart Styled Components =======
const ChartContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  padding: 24px;
  margin-top: 30px;
  width: 70%;
  height: 300px;
`;

const ChartTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #e74c3c;
`;

const Subtitle = styled.div`
  font-size: 1.2rem;
  margin: 0;
  color: #e74c3c;
  font-weight: 600;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr 50px;
  height: 300px;
`;

const YAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #777;
  font-size: 0.8rem;
  padding-right: 10px;
`;

const XAxis = styled.div`
  display: flex;
  justify-content: space-between;
  color: #777;
  font-size: 0.8rem;
  padding-top: 10px;
  grid-column: 2;
`;

const ChartArea = styled.div`
  position: relative;
  border-left: 1px solid #333;
  border-bottom: 1px solid #333;
`;

const GridLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #333;
`;

const DataPoint = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #3498db;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const DataLine = styled.div`
  position: absolute;
  height: 2px;
  background-color: #3498db;
  transform: translateY(-50%);
`;

// Mock data for the chart
const chartData = [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 30 },
  { x: 3, y: 45 },
  { x: 4, y: 50 },
  { x: 5, y: 65 },
  { x: 6, y: 60 },
  { x: 7, y: 75 },
  { x: 8, y: 90 },
  { x: 9, y: 100 }
];

// ======= Scheduler Component =======
export const InspectionScheduler: React.FC<{onViewSchedule: () => void}> = ({ onViewSchedule }) => {
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

// ======= Chart Component =======
export const InspectionChart: React.FC = () => {
  const maxY = 125;
  const yLabels = ['0', '25', '50', '75', '100', '125'];
  const xLabels = ['Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text'];
  
  return (
    <ChartContainer>
      <ChartTitle>
        <Title></Title>
        <Subtitle></Subtitle>
      </ChartTitle>
      
      <ChartGrid>
        <YAxis>
          {yLabels.map((label, index) => (
            <div key={`y-${index}`}>{label}</div>
          ))}
        </YAxis>
        
        <ChartArea>
          {yLabels.map((_, index) => (
            <GridLine 
              key={`grid-${index}`} 
              style={{ 
                bottom: `${(index / (yLabels.length - 1)) * 100}%` 
              }} 
            />
          ))}
          
          {/* Data points and lines */}
          {chartData.map((point, index) => {
            const nextPoint = chartData[index + 1];
            if (!nextPoint) return null;
            
            const x1 = `${(point.x / 9) * 100}%`;
            const y1 = `${(1 - point.y / maxY) * 100}%`;
            const x2 = `${(nextPoint.x / 9) * 100}%`;
            
            return (
              <React.Fragment key={`data-${index}`}>
                <DataPoint style={{ left: x1, bottom: y1 }} />
                <DataLine 
                  style={{ 
                    left: x1,
                    bottom: y1,
                    width: `${(nextPoint.x - point.x) / 9 * 100}%`,
                    transform: 'none'
                  }} 
                />
              </React.Fragment>
            );
          })}
          
          {/* Last data point */}
          <DataPoint 
            style={{ 
              left: `${(chartData[chartData.length - 1].x / 9) * 100}%`, 
              bottom: `${(1 - chartData[chartData.length - 1].y / maxY) * 100}%` 
            }} 
          />
        </ChartArea>
        
        <XAxis>
          {xLabels.map((label, index) => (
            <div key={`x-${index}`}>{label}</div>
          ))}
        </XAxis>
      </ChartGrid>
    </ChartContainer>
  );
};

// ======= Combined Dashboard Components =======
interface introHomeProps {
  onViewSchedule: () => void;
}

const introHome: React.FC<introHomeProps> = ({ onViewSchedule }) => {
  return (
    <div>
      <InspectionScheduler onViewSchedule={onViewSchedule} />
      <InspectionChart />
    </div>
  );
};

export default introHome; 