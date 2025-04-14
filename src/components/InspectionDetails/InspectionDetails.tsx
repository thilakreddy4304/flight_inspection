import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import InspectionReport from '../InspectionReport/InspectionReport';

// Container for the entire page
const Container = styled.div`
  width: 100%;
`;

// Top navigation and header
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const FlightIdentifier = styled.span`
//   color: #999;
  margin-left: 12px;
`;

const InstructionText = styled.div`
  color: #999;
  font-size: 1rem;
  margin-bottom: 24px;
`;

// Search component
const SearchContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const SearchInput = styled.input`
  background-color: #222;
  border: none;
  border-radius: 24px;
  color: #999;
  font-size: 1rem;
  padding: 12px 16px;
  width: 100%;
  max-width: 600px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px #444;
  }
  
  &::placeholder {
    color: #666;
  }
`;

// Grid layout for inspection boxes
const InspectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 5px;
  margin-top: 10px;
  width: 120%;
  padding: 4px;
`;

const InspectionBox = styled.div`
  background-color: #1E1E1E;
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-height: 170px;
  border: 1px solid #444;
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, transform 0.2s;
  
  &:hover {
    border-color: #666;
    transform: translateY(-2px);
  }
`;

const InspectionTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 16px 0;
  color: white;
`;

const InspectionDescription = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin: 0 0 20px 0;
`;

const InspectionMetadata = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 0;
`;

const RunButton = styled.button`
  background-color: transparent;
  color: grey;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 0 0;
  flex: 1;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const AddToFlowButton = styled.button`
  background-color: transparent;
  color: grey;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 8px 16px;
  flex: 1;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Carousel component
const CarouselPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  padding: 12px 16px;
  gap: 8px;
  margin: 24px auto 0;
  width: fit-content;
  margin-left: 400px;
`;

const CarouselDot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'white' : '#555'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const CarouselNav = styled.button<{ direction: 'prev' | 'next' }>`
  background: transparent;
  color: #777;
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;
  
  &:hover {
    color: white;
  }
`;

interface Flight {
  identifier: string;
  make: string;
  model: string;
  [key: string]: any;
}

interface InspectionDetailsProps {
  flight: Flight;
  onBack: () => void;
}

// Mock inspection data
const inspections = [
  {
    id: 1,
    title: 'Pre-Flight Inspection',
    description: 'Inspect the exterior of the aircraft before a flight or at the beginning of the day.',
    runtime: '10-45 minutes'
  },
  {
    id: 2,
    title: '50-hour/100-hour Inspection',
    description: 'Runs a comprehensive 50-hour or 100-hour inspection on the aircraft.',
    runtime: '60-200 minutes'
  },
  {
    id: 3,
    title: 'FAA-mandated Inspection',
    description: 'Select A-,B-,C- or D-check specific inspection for the aircraft.',
    runtime: '60-240 minutes'
  },
  {
    id: 4,
    title: 'Wings Inspection',
    description: 'Inspect the 2x Wing exterior, above and below, of the aircraft.',
    runtime: '25-60 minutes'
  },
  {
    id: 5,
    title: 'Engine Blade Inspection',
    description: 'Inspect the 2x Wing exterior, above and below, of the aircraft.',
    runtime: '60 minutes'
  },
  {
    id: 6,
    title: 'Engine Thermal Inspection',
    description: 'Inspect the 2x Wing exterior, above and below, of the aircraft.',
    runtime: '60 minutes'
  },
  {
    id: 7,
    title: 'Full Exterior Inspection',
    description: 'Inspect the 2x Wing exterior, above and below, of the aircraft.',
    runtime: '60 minutes'
  },
  {
    id: 8,
    title: 'Fuselage Inspection',
    description: 'Inspect the nose, fuselage, empennage and doors of the aircraft.',
    runtime: '60 minutes'
  },
  {
    id: 9,
    title: 'Exterior Openings Inspection',
    description: 'Inspect all doors (and drains), service panel openings, and landing gear.',
    runtime: '20-45 minutes'
  }
];

const InspectionDetails: React.FC<InspectionDetailsProps> = ({ flight, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInspection, setSelectedInspection] = useState<{ id: number; title: string } | null>(null);
  const { selectedTeam } = useAuth();
  
  // Fixed to 6 dots for pagination
  const totalDots = 6;
  const totalSlides = Math.ceil(inspections.length / 3);
  
  const handlePrev = () => {
    setActiveSlide(prev => {
      // If at the first slide, jump to the last slide
      if (prev === 0) {
        return totalSlides - 1;
      }
      // Otherwise go to previous slide
      return prev - 1;
    });
  };
  
  const handleNext = () => {
    setActiveSlide(prev => {
      // If at the last slide, jump to the first slide
      if (prev === totalSlides - 1) {
        return 0;
      }
      // Otherwise go to next slide
      return prev + 1;
    });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Function to handle dot click with infinite scrolling
  const handleDotClick = (index: number) => {
    setActiveSlide(index % totalSlides);
  };
  
  const handleRunClick = (inspection: { id: number; title: string }) => {
    setSelectedInspection(inspection);
  };
  
  // If an inspection is selected, show the report
  if (selectedInspection) {
    return (
      <InspectionReport 
        inspectionName={selectedInspection.title}
        inspectionType={selectedInspection.id === 3 ? 'A-Check' : 'Inspection'}
        onBack={() => setSelectedInspection(null)}
        flight={flight}
      />
    );
  }
  
  return (
    <Container>
      <TopBar>
        <TeamSelector>
          Team: {selectedTeam?.name || 'Boeing-Everett-MRO'} <TeamSelectorIcon>▼</TeamSelectorIcon>
        </TeamSelector>
      </TopBar>
      
      <PageTitle>
        Inspections &gt; <FlightIdentifier>{flight.identifier} ({flight.make.slice(0, 6)} {flight.model})</FlightIdentifier>
      </PageTitle>
      <InstructionText>Select your choice of Inspection from below</InstructionText>
      
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Search Inspection by Name" 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      
      <InspectionGrid>
        {inspections.slice(0, 9).map((inspection) => (
          <InspectionBox key={inspection.id}>
            <InspectionTitle>{inspection.title}</InspectionTitle>
            <InspectionDescription>{inspection.description}</InspectionDescription>
            <InspectionMetadata>
              <span>Runtime: {inspection.runtime}</span>
            </InspectionMetadata>
            <ButtonContainer>
              <RunButton onClick={() => handleRunClick(inspection)}>Run</RunButton>
              <AddToFlowButton>Add to Flow</AddToFlowButton>
            </ButtonContainer>
          </InspectionBox>
        ))}
      </InspectionGrid>
      
      <CarouselPagination>
        <CarouselNav direction="prev" onClick={handlePrev}>{'<'}</CarouselNav>
        
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselDot 
            key={index} 
            active={index === activeSlide % 6}
            onClick={() => handleDotClick(index)}
          />
        ))}
        
        <CarouselNav direction="next" onClick={handleNext}>{'>'}</CarouselNav>
      </CarouselPagination>
    </Container>
  );
};

export default InspectionDetails; 