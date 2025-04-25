import React from 'react';
import styled from 'styled-components';

// ======= Scheduler Styled Components =======
const SchedulerContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  padding: 12px;
  width: 70%;
  text-align: left;
  margin-bottom: 70px;
  border: 2px solid #444;
  
  @media (min-width: 1366px) {
    padding: 16px;
    border-radius: 14px;
    margin-bottom: 80px;
    border-width: 2px;
  }
  
  @media (min-width: 1920px) {
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 90px;
    border-width: 3px;
  }
  
  @media (min-width: 2560px) {
    padding: 28px;
    border-radius: 20px;
    margin-bottom: 110px;
    border-width: 4px;
  }
  
  @media (min-width: 3840px) {
    padding: 36px;
    border-radius: 24px;
    margin-bottom: 150px;
    border-width: 5px;
  }
`;

const SchedulerTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  color: white;
  text-align: left;
  
  @media (min-width: 1366px) {
    font-size: 1.6rem;
    margin: 0 0 24px 0;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.8rem;
    margin: 0 0 28px 0;
  }
  
  @media (min-width: 2560px) {
    font-size: 2.2rem;
    margin: 0 0 36px 0;
  }
  
  @media (min-width: 3840px) {
    font-size: 2.8rem;
    margin: 0 0 48px 0;
  }
`;

const SchedulerGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
  
  @media (min-width: 1366px) {
    gap: 8px;
    margin-bottom: 20px;
  }
  
  @media (min-width: 1920px) {
    gap: 12px;
    margin-bottom: 24px;
  }
  
  @media (min-width: 2560px) {
    gap: 16px;
    margin-bottom: 32px;
  }
  
  @media (min-width: 3840px) {
    gap: 24px;
    margin-bottom: 40px;
  }
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
  
  @media (min-width: 1366px) {
    width: 44px;
    height: 44px;
    margin-right: 18px;
  }
  
  @media (min-width: 1920px) {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }
  
  @media (min-width: 2560px) {
    width: 60px;
    height: 60px;
    margin-right: 24px;
  }
  
  @media (min-width: 3840px) {
    width: 80px;
    height: 80px;
    margin-right: 32px;
  }
  
  span {
    font-size: 1.2rem;
    
    @media (min-width: 1366px) {
      font-size: 1.3rem;
    }
    
    @media (min-width: 1920px) {
      font-size: 1.5rem;
    }
    
    @media (min-width: 2560px) {
      font-size: 1.8rem;
    }
    
    @media (min-width: 3840px) {
      font-size: 2.4rem;
    }
  }
`;

const SchedulerText = styled.div`
  font-size: 1rem;
  color: #CCC;
  
  @media (min-width: 1366px) {
    font-size: 1.1rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.5rem;
  }
  
  @media (min-width: 3840px) {
    font-size: 2rem;
  }
`;

const ActionButton = styled.button`
  background-color: #444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  margin-top: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;
  
  &:hover {
    background-color: #333;
  }
  
  @media (min-width: 1366px) {
    padding: 12px 26px;
    font-size: 1.1rem;
    border-radius: 9px;
    margin-top: 14px;
  }
  
  @media (min-width: 1920px) {
    padding: 14px 30px;
    font-size: 1.2rem;
    border-radius: 10px;
    margin-top: 16px;
  }
  
  @media (min-width: 2560px) {
    padding: 18px 36px;
    font-size: 1.4rem;
    border-radius: 12px;
    margin-top: 20px;
  }
  
  @media (min-width: 3840px) {
    padding: 24px 48px;
    font-size: 1.8rem;
    border-radius: 16px;
    margin-top: 28px;
  }
`;

// ======= Chart Styled Components =======
const ChartContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  padding: 24px;
  margin-top: 30px;
  width: 90%;
  height: 300px;
  
  @media (min-width: 1366px) {
    border-radius: 14px;
    padding: 28px;
    margin-top: 34px;
    height: 320px;
  }
  
  @media (min-width: 1920px) {
    border-radius: 16px;
    padding: 32px;
    margin-top: 40px;
    height: 350px;
  }
  
  @media (min-width: 2560px) {
    border-radius: 20px;
    padding: 40px;
    margin-top: 50px;
    height: 420px;
  }
  
  @media (min-width: 3840px) {
    border-radius: 24px;
    padding: 52px;
    margin-top: 70px;
    height: 500px;
  }
`;

const ChartTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (min-width: 1366px) {
    margin-bottom: 28px;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 32px;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 40px;
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 52px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #e74c3c;
  
  @media (min-width: 1366px) {
    font-size: 1.6rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.8rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 2.2rem;
  }
  
  @media (min-width: 3840px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.div`
  font-size: 1.2rem;
  margin: 0;
  color: #e74c3c;
  font-weight: 600;
  
  @media (min-width: 1366px) {
    font-size: 1.3rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.4rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.7rem;
  }
  
  @media (min-width: 3840px) {
    font-size: 2.2rem;
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr 50px;
  height: 300px;
  
  @media (min-width: 1366px) {
    grid-template-columns: 55px 1fr;
    grid-template-rows: 1fr 55px;
    height: 320px;
  }
  
  @media (min-width: 1920px) {
    grid-template-columns: 60px 1fr;
    grid-template-rows: 1fr 60px;
    height: 350px;
  }
  
  @media (min-width: 2560px) {
    grid-template-columns: 75px 1fr;
    grid-template-rows: 1fr 75px;
    height: 420px;
  }
  
  @media (min-width: 3840px) {
    grid-template-columns: 100px 1fr;
    grid-template-rows: 1fr 100px;
    height: 500px;
  }
`;

const YAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #777;
  font-size: 0.8rem;
  padding-right: 10px;
  
  @media (min-width: 1366px) {
    font-size: 0.9rem;
    padding-right: 12px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1rem;
    padding-right: 14px;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.2rem;
    padding-right: 18px;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.6rem;
    padding-right: 24px;
  }
`;

const XAxis = styled.div`
  display: flex;
  justify-content: space-between;
  color: #777;
  font-size: 0.8rem;
  padding-top: 10px;
  grid-column: 2;
  
  @media (min-width: 1366px) {
    font-size: 0.9rem;
    padding-top: 12px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1rem;
    padding-top: 14px;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.2rem;
    padding-top: 18px;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.6rem;
    padding-top: 24px;
  }
`;

const ChartArea = styled.div`
  position: relative;
  border-left: 1px solid #333;
  border-bottom: 1px solid #333;
  
  @media (min-width: 1920px) {
    border-left-width: 2px;
    border-bottom-width: 2px;
  }
  
  @media (min-width: 3840px) {
    border-left-width: 3px;
    border-bottom-width: 3px;
  }
`;

const GridLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #333;
  
  @media (min-width: 1920px) {
    height: 2px;
  }
  
  @media (min-width: 3840px) {
    height: 3px;
  }
`;

const DataPoint = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #3498db;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  
  @media (min-width: 1366px) {
    width: 12px;
    height: 12px;
  }
  
  @media (min-width: 1920px) {
    width: 14px;
    height: 14px;
  }
  
  @media (min-width: 2560px) {
    width: 18px;
    height: 18px;
  }
  
  @media (min-width: 3840px) {
    width: 24px;
    height: 24px;
  }
`;

const DataLine = styled.div`
  position: absolute;
  height: 2px;
  background-color: #3498db;
  transform: translateY(-50%);
  
  @media (min-width: 1920px) {
    height: 3px;
  }
  
  @media (min-width: 2560px) {
    height: 4px;
  }
  
  @media (min-width: 3840px) {
    height: 6px;
  }
`;

// ======= Layout Styled Components =======
const DashboardLayout = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  padding-right: 40px;
  margin-right: 80px;
  
  @media (min-width: 1366px) {
    padding-right: 45px;
    margin-right: 90px;
  }
  
  @media (min-width: 1920px) {
    padding-right: 50px;
    margin-right: 110px;
  }
  
  @media (min-width: 2560px) {
    padding-right: 60px;
    margin-right: 130px;
  }
  
  @media (min-width: 3840px) {
    padding-right: 80px;
    margin-right: 160px;
  }
`;

// Side navbar style components
const SideNavbar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #333;
  padding: 0 10px;
  z-index: 100;
  
  @media (min-width: 1366px) {
    width: 320px;
    padding: 0 12px;
  }
  
  @media (min-width: 1920px) {
    width: 360px;
    padding: 0 16px;
    border-left-width: 2px;
  }
  
  @media (min-width: 2560px) {
    width: 420px;
    padding: 0 20px;
    border-left-width: 2px;
  }
  
  @media (min-width: 3840px) {
    width: 520px;
    padding: 0 28px;
    border-left-width: 3px;
  }
`;

// ======= Status Panel Styled Components =======
const StatusContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  padding: 10px;
  margin-top: 75px;
  border: 2px solid #444;
  width: 500px;
  height: 250px;

  @media (min-width: 768px) {
    width: 350px;
    height: 170px;
    margin-top: 60px;
    padding: 12px;
    border-radius: 12px;
  }
  
  @media (min-width: 1366px) {
    border-radius: 14px;
    padding: 14px;
    margin-top: 85px;
    width: 400px;
    height: 220px;
  }
  
  @media (min-width: 1920px) {
    border-radius: 16px;
    padding: 20px;
    margin-top: 100px;
    border-width: 3px;
    width: 600px;
    height: 300px;
  }
  
  @media (min-width: 2560px) {
    border-radius: 20px;
    padding: 26px;
    margin-top: 120px;
    border-width: 4px;
    width: 700px;
    height: 350px;
  }
  
  @media (min-width: 3840px) {
    border-radius: 24px;
    padding: 36px;
    margin-top: 150px;
    border-width: 5px;
    width: 900px;
    height: 450px;
  }
`;

const StatusTitle = styled.h3`
  font-size: 2rem;
  color: white;
  margin-bottom: 30px;
  // gap: 15px;
  
  @media (min-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  @media (min-width: 1366px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
  
  @media (min-width: 1920px) {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
  
  @media (min-width: 2560px) {
    font-size: 3rem;
    margin-bottom: 50px;
  }
  
  @media (min-width: 3840px) {
    font-size: 4rem;
    margin-bottom: 70px;
  }
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1rem;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    gap: 8px;
    margin-bottom: 10px;
  }
  
  @media (min-width: 1366px) {
    gap: 10px;
    margin-bottom: 16px;
  }
  
  @media (min-width: 1920px) {
    gap: 16px;
    margin-bottom: 22px;
  }
  
  @media (min-width: 2560px) {
    gap: 20px;
    margin-bottom: 28px;
  }
  
  @media (min-width: 3840px) {
    gap: 28px;
    margin-bottom: 40px;
  }
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;

  @media (min-width: 768px) {
    gap: 6px;
    font-size: 0.8rem;
  }

  @media (min-width: 1366px) {
    gap: 10px;
    font-size: 1rem;
  }
  
  @media (min-width: 1920px) {
    gap: 12px;
    font-size: 1.3rem;
  }
  
  @media (min-width: 2560px) {
    gap: 16px;
    font-size: 1.6rem;
  }
  
  @media (min-width: 3840px) {
    gap: 22px;
    font-size: 2rem;
  }
`;

const StatusNumber = styled.span`
  font-weight: 600;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }

  @media (min-width: 1366px) {
    font-size: 1rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.3rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.6rem;
  }
  
  @media (min-width: 3840px) {
    font-size: 2rem;
  }
`;

const StatusLabel = styled.span`
  color: #fff;
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
    <DashboardLayout>
      <MainContent>
        {/* <InspectionScheduler onViewSchedule={onViewSchedule} /> */}
        <StatusContainer>
          <StatusTitle>Today in Inspections</StatusTitle>
          <StatusList>
            <StatusItem>
              <StatusNumber>74</StatusNumber>
              <StatusLabel>Inspections - Scheduled</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusNumber>23</StatusNumber>
              <StatusLabel>Inspections - In-progress</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusNumber>22</StatusNumber>
              <StatusLabel>Inspections - Ready-to-Review</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusNumber>05</StatusNumber>
              <StatusLabel>Inspections - Complete</StatusLabel>
            </StatusItem>
          </StatusList>
        </StatusContainer>
        {/* <InspectionChart /> */}
      </MainContent>
      {/* <SideNavbar>
        <StatusContainer>
          <StatusTitle>Today in Inspections</StatusTitle>
          <StatusList>
            <StatusItem>
              <StatusNumber>74</StatusNumber>
              <StatusLabel>Inspections - Scheduled</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusNumber>23</StatusNumber>
              <StatusLabel>Inspections - In-progress</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusNumber>22</StatusNumber>
              <StatusLabel>Inspections - Ready-to-Review</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusNumber>05</StatusNumber>
              <StatusLabel>Inspections - Complete</StatusLabel>
            </StatusItem>
          </StatusList>
        </StatusContainer>
      </SideNavbar> */}
    </DashboardLayout>
  );
};

export default introHome; 