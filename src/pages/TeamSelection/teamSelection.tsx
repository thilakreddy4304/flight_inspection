import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #121212;
  padding: 20px;
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
`;

const TeamOption = styled.button<{ selected: boolean }>`
  width: 100%;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: ${props => props.selected ? '#f3f4f6' : 'white'};
  color: #333;
  font-size: 1.1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const ContinueButton = styled.button`
width: 100%;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  color: black;
  font-size: 1.8rem;
  font-weight: Bold;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color:rgb(93, 95, 95);
  }
  
  &:focus {
    outline: none;
    border-color:rgb(93, 95, 95);
  }
`;

const TeamSelection: React.FC = () => {
  const navigate = useNavigate();
  const { teams, selectTeam, selectedTeam: currentTeam } = useAuth();
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(currentTeam?.id || null);
  
  const handleTeamSelect = (teamId: string) => {
    setSelectedTeamId(teamId);
  };
  
  const handleContinue = () => {
    if (selectedTeamId) {
      selectTeam(selectedTeamId);
      navigate('/');
    }
  };
  
  return (
    <Container>
      <FormCard>
        <Title>Select Team</Title>
        
        {teams.map(team => (
          <TeamOption
            key={team.id}
            selected={selectedTeamId === team.id}
            onClick={() => handleTeamSelect(team.id)}
          >
            {team.name}
          </TeamOption>
        ))}
        
        <ContinueButton 
          disabled={!selectedTeamId} 
          onClick={handleContinue}
        >
          Continue
        </ContinueButton>
      </FormCard>
    </Container>
  );
};

export default TeamSelection; 