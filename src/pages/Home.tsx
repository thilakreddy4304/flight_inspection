import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Flight } from '../types';
import FlightCard from '../components/FlightCard';
import Button from '../components/Button';
import ApiService from '../services/api';
import useApi from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const FlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f9fafb;
  border-radius: 8px;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  font-size: 0.9rem;
  color: #64748b;
`;

const TeamInfo = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 24px;
`;

const TeamName = styled.h2`
  font-size: 1.3rem;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const TeamDescription = styled.p`
  color: #64748b;
  margin: 0;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, selectedTeam } = useAuth();
  const [flights, setFlights] = useState<Flight[]>([]);
  const flightsApi = useApi<Flight[]>(ApiService.flights.getAll);
  
  useEffect(() => {
    // In a real app, this would fetch from the API
    // flightsApi.execute();
    
    // For now, let's use mock data
    const mockFlights: Flight[] = [
      {
        id: '1',
        flightNumber: 'FL1234',
        aircraft: 'Boeing 737-800',
        departureTime: '2023-04-15T10:00:00Z',
        arrivalTime: '2023-04-15T12:30:00Z',
        origin: 'New York (JFK)',
        destination: 'Los Angeles (LAX)',
        status: 'scheduled',
        lastInspectionDate: '2023-04-10T08:00:00Z',
      },
      {
        id: '2',
        flightNumber: 'FL5678',
        aircraft: 'Airbus A320',
        departureTime: '2023-04-15T14:00:00Z',
        arrivalTime: '2023-04-15T16:15:00Z',
        origin: 'Chicago (ORD)',
        destination: 'Miami (MIA)',
        status: 'in-air',
      },
      {
        id: '3',
        flightNumber: 'FL9012',
        aircraft: 'Boeing 787-9',
        departureTime: '2023-04-14T22:00:00Z',
        arrivalTime: '2023-04-15T07:30:00Z',
        origin: 'San Francisco (SFO)',
        destination: 'Tokyo (HND)',
        status: 'landed',
        lastInspectionDate: '2023-04-13T15:00:00Z',
      },
      {
        id: '4',
        flightNumber: 'FL3456',
        aircraft: 'Airbus A380',
        departureTime: '2023-04-15T23:30:00Z',
        arrivalTime: '2023-04-16T15:45:00Z',
        origin: 'London (LHR)',
        destination: 'Singapore (SIN)',
        status: 'scheduled',
      },
    ];
    
    setFlights(mockFlights);
  }, []);

  const handleViewDetails = (id: string) => {
    navigate(`/flights/${id}`);
  };

  const handleInspect = (id: string) => {
    navigate(`/inspections/new?flightId=${id}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>Flight Inspection Dashboard</Title>
          {user && (
            <UserInfo>
              Welcome, {user.name} ({user.email})
            </UserInfo>
          )}
        </div>
        <ButtonGroup>
          <Button 
            onClick={() => navigate('/flights/new')}
            variant="primary"
          >
            Add New Flight
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="secondary"
          >
            Logout
          </Button>
        </ButtonGroup>
      </Header>

      {selectedTeam && (
        <TeamInfo>
          <TeamName>{selectedTeam.name}</TeamName>
          <TeamDescription>
            Manage flight inspections for this location. This team is responsible for regular safety checks, 
            maintenance inspections, and compliance reporting.
          </TeamDescription>
        </TeamInfo>
      )}

      {flightsApi.loading ? (
        <p>Loading flights...</p>
      ) : flights.length > 0 ? (
        <FlightGrid>
          {flights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onViewDetails={handleViewDetails}
              onInspect={handleInspect}
            />
          ))}
        </FlightGrid>
      ) : (
        <EmptyState>
          <h3>No flights found</h3>
          <p>There are no flights available for inspection at this time.</p>
          <Button 
            onClick={() => navigate('/flights/new')}
            variant="primary"
            size="small"
            style={{ marginTop: '12px' }}
          >
            Add Your First Flight
          </Button>
        </EmptyState>
      )}
    </Container>
  );
};

export default Home; 