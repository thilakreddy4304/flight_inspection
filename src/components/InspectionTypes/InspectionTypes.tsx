import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import InspectionSteps from '../InspectionSteps/InspectionSteps';

// Container for the entire page
const Container = styled.div`
  width: 100%;
`;

// Top navigation and header
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TeamSelector = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  width: fit-content;
  position: relative;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
  transition: transform 0.3s ease;
`;

const TeamDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #222;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  z-index: 10;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const TeamOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const FlightIdentifier = styled.span`
  color: #999;
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
  gap: 20px;
  margin-bottom: 15px;
  margin-top: 20px;
  width: 100%;
  padding: 0;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: auto;
`;

const InspectionBox = styled.div`
  background-color: black;
  padding: 15px;
  padding-bottom: 55px; /* Extra space at bottom for buttons */
  display: flex;
  flex-direction: column;
  min-height: 180px;
  border: 2px solid #444;
  border-radius: 12px;
  width: 90%;
  box-sizing: border-box;
  transition: border-color 0.2s, transform 0.2s;
  position: relative;
  
  &:hover {
    border-color: #666;
    transform: translateY(-2px);
  }
`;

const InspectionTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 12px 0;
  color: white;
  font-weight: 600;
`;

const InspectionDescription = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 0 0 10px 0;
  flex-grow: 1;
`;

const InspectionMetadata = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
`;

const RunButton = styled.button`
  background-color: #444;
  color: #fff;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 8px 0;
  flex: 1;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const AddToFlowButton = styled.button`
  background-color: #444;
  color: #fff;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 8px 0;
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
  padding: 6px 12px;
  gap: 8px;
  margin-top: 2px;
  width: fit-content;
  margin-left: auto;  
  margin-right: auto;
`;

const CarouselDot = styled.button<{ active: boolean }>`
  width: 6px;
  height: 6px;
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
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
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

interface InspectionTypesProps {
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
    title: '50-hour Inspection',
    description: 'Runs a comprehensive 50-hour inspection on the aircraft.',
    runtime: '100 minutes'
  },
  {
    id: 3,
    title: '100-hour Inspection',
    description: 'Runs a comprehensive 100-hour inspection on the aircraft.',
    runtime: '120 minutes'
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
    title: 'Lightening Strike Inspection',
    description: 'Inspect the full body for lightening strike entry & exit damage or pinholes.',
    runtime: '55 minutes'
  },
  {
    id: 10,
    title: 'A-Check Inspection',
    description: 'FAA-mandated A-Check inspection for the aircraft.',
    runtime: '100 minutes'
  },
  {
    id: 11,
    title: 'B-Check Inspection',
    description: 'FAA-mandated B-Check inspection for the aircraft.',
    runtime: '100 minutes'
  },
  {
    id: 12,
    title: 'C-Check Inspection',
    description: 'FAA-mandated C-Check inspection for the aircraft.',
    runtime: '120 minutes'
  },
  {
    id: 13,
    title: 'D-Check Inspection',
    description: 'FAA-mandated D-Check inspection for the aircraft.',
    runtime: '250 minutes'
  },
  {
    id: 14,
    title: 'Hard-Landing Inspection',
    description: 'Inspect the landing gear, wingtips and tail underbody of the aircraft for damages.',
    runtime: '90 minutes'
  },
  {
    id: 15,
    title: 'Paint & Tape Inspection',
    description: 'Inspect the exterior for paint-peel and tapeing of the aircraft.',
    runtime: '60 minutes'
  },
  {
    id: 16,
    title: 'Wings & Engine Inspection',
    description: 'Inspect the wings exterior, ad=nd Engine blades and Thermal Inspection of the aircraft includes FOD.',
    runtime: '60 minutes'
  },
  {
    id: 17,
    title: 'Nose Inspection',
    description: 'Inspect the nose of the aircraft for FOD, dents and lightning strike.',
    runtime: '60 minutes'
  },
  {
    id: 18,
    title: 'Exterior Openings Inspection',
    description: 'Inspect all doors (and drains), service panel openings, and landing gear.',
    runtime: '20~45 minutes'
  },
];

const InspectionTypes: React.FC<InspectionTypesProps> = ({ flight, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInspection, setSelectedInspection] = useState<{ id: number; title: string } | null>(null);
  const { selectedTeam, teams, selectTeam } = useAuth();
  
  // State to control team selector dropdown
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  
  // Function to toggle team dropdown
  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };
  
  // Function to handle team selection
  const handleTeamSelect = (teamId: string) => {
    selectTeam(teamId);
    setIsTeamDropdownOpen(false);
  };
  
  // Change to 2 dots for pagination - first 9 and second 9 inspections
  const totalDots = 2;
  const totalSlides = Math.ceil(inspections.length / 9);
  
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
  
  // Function to handle dot click
  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };
  
  const handleRunClick = (inspection: { id: number; title: string }) => {
    setSelectedInspection(inspection);
  };
  
  // If an inspection is selected, show the report
  if (selectedInspection) {
    return (
      <InspectionSteps 
        inspectionName={selectedInspection.title}
        inspectionType={selectedInspection.id === 3 ? 'A-Check' : 'Inspection'}
        onBack={() => setSelectedInspection(null)}
        flight={flight}
      />
    );
  }

  // Get the current set of inspections to display based on activeSlide
  const currentInspections = inspections.slice(activeSlide * 9, (activeSlide + 1) * 9);
  
  return (
    <Container>
      <TopBar>
        <TeamSelector onClick={toggleTeamDropdown}>
          Team: {selectedTeam?.name} 
          <TeamSelectorIcon style={{ transform: isTeamDropdownOpen ? 'rotate(180deg)' : 'none' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 9L12 15L6 9" stroke="#777"/>
</svg></TeamSelectorIcon>
          <TeamDropdown isOpen={isTeamDropdownOpen}>
            {teams.map(team => (
              <TeamOption 
                key={team.id} 
                onClick={(e) => {
                  e.stopPropagation();
                  handleTeamSelect(team.id);
                }}
              >
                {team.name}
              </TeamOption>
            ))}
          </TeamDropdown>
        </TeamSelector>
      </TopBar>
      
      <PageTitle>
        Inspections &gt;<FlightIdentifier>{flight.identifier} ({flight.make} {flight.model})</FlightIdentifier>
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
        {currentInspections.map((inspection) => (
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
        
        {Array.from({ length: totalDots }).map((_, index) => (
          <CarouselDot 
            key={index} 
            active={index === activeSlide}
            onClick={() => handleDotClick(index)}
          />
        ))}
        
        <CarouselNav direction="next" onClick={handleNext}>{'>'}</CarouselNav>
      </CarouselPagination>
    </Container>
  );
};

export default InspectionTypes; 