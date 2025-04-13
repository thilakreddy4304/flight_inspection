import React from 'react';
import styled from 'styled-components';
import { Flight } from '../../types';
import Button from '../Button';

interface FlightCardProps {
  flight: Flight;
  onViewDetails: (id: string) => void;
  onInspect?: (id: string) => void;
}

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const FlightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
`;

const FlightNumber = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: #2c3e50;
`;

const StatusBadge = styled.span<{ status: string }>`
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  
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

const FlightInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.span`
  font-size: 0.85rem;
  color: #718096;
  display: block;
  margin-bottom: 4px;
`;

const Value = styled.span`
  font-weight: 500;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const FlightCard: React.FC<FlightCardProps> = ({ flight, onViewDetails, onInspect }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card>
      <FlightHeader>
        <FlightNumber>{flight.flightNumber}</FlightNumber>
        <StatusBadge status={flight.status}>{flight.status}</StatusBadge>
      </FlightHeader>

      <FlightInfo>
        <InfoItem>
          <Label>Aircraft</Label>
          <Value>{flight.aircraft}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Route</Label>
          <Value>{flight.origin} → {flight.destination}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Departure</Label>
          <Value>{formatDateTime(flight.departureTime)}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Arrival</Label>
          <Value>{formatDateTime(flight.arrivalTime)}</Value>
        </InfoItem>
      </FlightInfo>

      <CardActions>
        {onInspect && (
          <Button 
            variant="secondary" 
            size="small" 
            onClick={() => onInspect(flight.id)}
          >
            Inspect
          </Button>
        )}
        <Button 
          variant="primary" 
          size="small" 
          onClick={() => onViewDetails(flight.id)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default FlightCard; 