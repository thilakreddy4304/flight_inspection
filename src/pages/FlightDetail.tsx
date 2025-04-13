import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Flight, Inspection } from '../types';
import Button from '../components/Button';
import ApiService from '../services/api';
import useApi from '../hooks/useApi';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const HeaderInfo = styled.div``;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 1.8rem;
  color: #2c3e50;
`;

const Subtitle = styled.div`
  color: #7f8c8d;
  font-size: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
`;

const CardTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1.3rem;
  color: #2c3e50;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const InfoItem = styled.div`
  margin-bottom: 16px;
`;

const InfoLabel = styled.div`
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const StatusBadge = styled.span<{ status: string }>`
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  margin-left: 8px;
  
  background-color: ${({ status }) => {
    switch (status) {
      case 'scheduled':
        return '#e2e8f0';
      case 'in-air':
        return '#4299e1';
      case 'landed':
        return '#48bb78';
      case 'cancelled':
        return '#f56565';
      case 'delayed':
        return '#ed8936';
      default:
        return '#e2e8f0';
    }
  }};
  
  color: ${({ status }) => {
    switch (status) {
      case 'scheduled':
        return '#2d3748';
      default:
        return 'white';
    }
  }};
`;

const FlightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from the API
    // But we're using mock data for now
    if (id) {
      const mockFlight: Flight = {
        id: id,
        flightNumber: 'FL1234',
        aircraft: 'Boeing 737-800',
        departureTime: '2023-04-15T10:00:00Z',
        arrivalTime: '2023-04-15T12:30:00Z',
        origin: 'New York (JFK)',
        destination: 'Los Angeles (LAX)',
        status: 'scheduled',
        lastInspectionDate: '2023-04-10T08:00:00Z',
      };
      
      setFlight(mockFlight);
      
      // Mock inspections
      const mockInspections: Inspection[] = [
        {
          id: '1',
          flightId: id,
          inspectionDate: '2023-04-10T08:00:00Z',
          inspectorId: 'inspector-1',
          status: 'completed',
          findings: [],
          notes: 'Regular maintenance inspection completed successfully.',
        },
      ];
      
      setInspections(mockInspections);
    }
  }, [id]);

  if (!flight) {
    return (
      <Container>
        <p>Loading flight details...</p>
      </Container>
    );
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <Title>
            Flight {flight.flightNumber}
            <StatusBadge status={flight.status}>{flight.status}</StatusBadge>
          </Title>
          <Subtitle>{flight.origin} to {flight.destination}</Subtitle>
        </HeaderInfo>
        <ButtonGroup>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/flights')}
          >
            Back to Flights
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate(`/inspections/new?flightId=${flight.id}`)}
          >
            New Inspection
          </Button>
        </ButtonGroup>
      </Header>

      <Card>
        <CardTitle>Flight Information</CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Flight Number</InfoLabel>
            <InfoValue>{flight.flightNumber}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Aircraft</InfoLabel>
            <InfoValue>{flight.aircraft}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Origin</InfoLabel>
            <InfoValue>{flight.origin}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Destination</InfoLabel>
            <InfoValue>{flight.destination}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Departure Time</InfoLabel>
            <InfoValue>{formatDateTime(flight.departureTime)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Arrival Time</InfoLabel>
            <InfoValue>{formatDateTime(flight.arrivalTime)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Status</InfoLabel>
            <InfoValue>{flight.status}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Last Inspection</InfoLabel>
            <InfoValue>
              {flight.lastInspectionDate 
                ? formatDateTime(flight.lastInspectionDate) 
                : 'No inspection records'}
            </InfoValue>
          </InfoItem>
        </InfoGrid>
      </Card>

      <Card>
        <CardTitle>Inspection History</CardTitle>
        {inspections.length > 0 ? (
          <div>
            {inspections.map((inspection) => (
              <div key={inspection.id} style={{ marginBottom: '16px' }}>
                <h3>Inspection on {formatDateTime(inspection.inspectionDate)}</h3>
                <p>Status: {inspection.status}</p>
                {inspection.notes && <p>Notes: {inspection.notes}</p>}
                <Button 
                  variant="secondary" 
                  size="small" 
                  onClick={() => navigate(`/inspections/${inspection.id}`)}
                  style={{ marginTop: '8px' }}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>No inspection records found for this flight.</p>
        )}
      </Card>
    </Container>
  );
};

export default FlightDetail; 