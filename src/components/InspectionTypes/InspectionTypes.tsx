import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import InspectionSteps from '../InspectionSteps/InspectionSteps';

// Container for the entire page
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent scrolling */
  position: relative;

  @media (min-width: 1366px) {
    width: 100%;
  }
  
  @media (min-width: 1920px) {
    width: 100%;
  }
  
  @media (min-width: 2560px) {
    width: 100%;
  }
  
  @media (min-width: 3840px) {
    width: 100%;
  }
`;

// Top navigation and header
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  
  @media (min-width: 1366px) {
    margin-bottom: 12px;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 16px;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 20px;
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 30px;
  }
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
  
  @media (min-width: 1366px) {
    padding: 6px 10px;
    border-radius: 5px;
    gap: 10px;
    font-size: 1rem;
  }
  
  @media (min-width: 1920px) {
    padding: 8px 12px;
    border-radius: 6px;
    gap: 12px;
    font-size: 1.1rem;
  }
  
  @media (min-width: 2560px) {
    padding: 10px 16px;
    border-radius: 8px;
    gap: 16px;
    font-size: 1.3rem;
  }
  
  @media (min-width: 3840px) {
    padding: 14px 22px;
    border-radius: 12px;
    gap: 20px;
    font-size: 1.8rem;
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  
  @media (min-width: 1366px) {
    font-size: 0.8rem;
    
    svg {
      width: 26px;
      height: 26px;
    }
  }
  
  @media (min-width: 1920px) {
    font-size: 0.9rem;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
  
  @media (min-width: 2560px) {
    font-size: 1.1rem;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
  
  @media (min-width: 3840px) {
    font-size: 1.5rem;
    
    svg {
      width: 40px;
      height: 40px;
    }
  }
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
  
  @media (min-width: 1366px) {
    border-radius: 5px;
    margin-top: 6px;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 1920px) {
    border-radius: 6px;
    margin-top: 8px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 2560px) {
    border-radius: 8px;
    margin-top: 10px;
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 3840px) {
    border-radius: 12px;
    margin-top: 14px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const TeamOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (min-width: 1366px) {
    padding: 10px 18px;
    font-size: 1rem;
  }
  
  @media (min-width: 1920px) {
    padding: 12px 20px;
    font-size: 1.1rem;
  }
  
  @media (min-width: 2560px) {
    padding: 16px 24px;
    font-size: 1.3rem;
  }
  
  @media (min-width: 3840px) {
    padding: 22px 32px;
    font-size: 1.8rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  
  @media (min-width: 1366px) {
    font-size: 2.2rem;
    margin: 0 0 6px 0;
  }
  
  @media (min-width: 1920px) {
    font-size: 2.5rem;
    margin: 0 0 8px 0;
  }
  
  @media (min-width: 2560px) {
    font-size: 3rem;
    margin: 0 0 10px 0;
  }
  
  @media (min-width: 3840px) {
    font-size: 4rem;
    margin: 0 0 14px 0;
  }
`;

const FlightIdentifier = styled.span`
  color: #999;
  margin-left: 12px;
  
  @media (min-width: 1366px) {
    margin-left: 14px;
  }
  
  @media (min-width: 1920px) {
    margin-left: 16px;
  }
  
  @media (min-width: 2560px) {
    margin-left: 20px;
  }
  
  @media (min-width: 3840px) {
    margin-left: 28px;
  }
`;

const InstructionText = styled.div`
  color: #999;
  font-size: 1rem;
  margin-bottom: 16px;
  
  @media (min-width: 1366px) {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.2rem;
    margin-bottom: 24px;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.4rem;
    margin-bottom: 28px;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.8rem;
    margin-bottom: 36px;
  }
`;

// Search component
const SearchContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
  
  @media (min-width: 1366px) {
    margin-bottom: 20px;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 22px;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 26px;
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 34px;
  }
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
  
  @media (min-width: 1366px) {
    border-radius: 28px;
    font-size: 1.1rem;
    padding: 14px 18px;
    max-width: 700px;
  }
  
  @media (min-width: 1920px) {
    border-radius: 32px;
    font-size: 1.2rem;
    padding: 16px 22px;
    max-width: 800px;
  }
  
  @media (min-width: 2560px) {
    border-radius: 40px;
    font-size: 1.4rem;
    padding: 20px 28px;
    max-width: 1000px;
  }
  
  @media (min-width: 3840px) {
    border-radius: 52px;
    font-size: 1.8rem;
    padding: 28px 36px;
    max-width: 1400px;
  }
`;

// Grid layout for inspection boxes
const InspectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  flex: 1;
  margin-bottom: 15px;
  width: 100%;
  justify-content: space-between;
  margin-left: 25px;
  // overflow-y: auto; /* Allow grid to scroll if needed */
  // padding-right: 15px; /* Add padding for scrollbar */
  
  @media (min-width: 1366px) {
    gap: 34px;
    margin-bottom: 18px;
    margin-left: 30px;
    padding-right: 18px;
  }
  
  @media (min-width: 1920px) {
    gap: 30px;
    margin-bottom: 22px;
    margin-left: 34px;
    padding-right: 20px;
  }
  
  @media (min-width: 2560px) {
    gap: 42px;
    margin-bottom: 30px;
    margin-left: 40px;
    padding-right: 24px;
  }
  
  @media (min-width: 3840px) {
    gap: 48px;
    margin-bottom: 40px;
    margin-left: 52px;
    padding-right: 30px;
  }
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
  
  @media (min-width: 1366px) {
    padding: 18px;
    padding-bottom: 65px;
    min-height: 200px;
    border-radius: 14px;
  }
  
  @media (min-width: 1920px) {
    padding: 22px;
    padding-bottom: 75px;
    min-height: 220px;
    border-radius: 16px;
    border: 3px solid #444;
  }
  
  @media (min-width: 2560px) {
    padding: 28px;
    padding-bottom: 90px;
    min-height: 260px;
    border-radius: 20px;
    border: 3px solid #444;
  }
  
  @media (min-width: 3840px) {
    padding: 36px;
    padding-bottom: 120px;
    min-height: 340px;
    border-radius: 28px;
    border: 4px solid #444;
  }
`;

const InspectionTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 12px 0;
  color: white;
  font-weight: 600;
  
  @media (min-width: 1366px) {
    font-size: 1.1rem;
    margin: 0 0 14px 0;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.2rem;
    margin: 0 0 16px 0;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.4rem;
    margin: 0 0 20px 0;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.8rem;
    margin: 0 0 28px 0;
  }
`;

const InspectionDescription = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 0 0 10px 0;
  flex-grow: 1;
  
  @media (min-width: 1366px) {
    font-size: 0.9rem;
    margin: 0 0 12px 0;
  }
  
  @media (min-width: 1920px) {
    font-size: 1rem;
    margin: 0 0 14px 0;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.2rem;
    margin: 0 0 18px 0;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.6rem;
    margin: 0 0 24px 0;
  }
`;

const InspectionMetadata = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 10px;
  
  @media (min-width: 1366px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1rem;
    margin-bottom: 14px;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.2rem;
    margin-bottom: 18px;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.6rem;
    margin-bottom: 24px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  
  @media (min-width: 1366px) {
    gap: 14px;
    bottom: 12px;
    left: 12px;
    right: 12px;
  }
  
  @media (min-width: 1920px) {
    gap: 16px;
    bottom: 14px;
    left: 14px;
    right: 14px;
  }
  
  @media (min-width: 2560px) {
    gap: 20px;
    bottom: 18px;
    left: 18px;
    right: 18px;
  }
  
  @media (min-width: 3840px) {
    gap: 28px;
    bottom: 24px;
    left: 24px;
    right: 24px;
  }
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
  
  @media (min-width: 1366px) {
    border-radius: 5px;
    padding: 10px 0;
    font-size: 1rem;
  }
  
  @media (min-width: 1920px) {
    border-radius: 6px;
    padding: 12px 0;
    font-size: 1.1rem;
    border: 2px solid #555;
  }
  
  @media (min-width: 2560px) {
    border-radius: 8px;
    padding: 14px 0;
    font-size: 1.3rem;
    border: 2px solid #555;
  }
  
  @media (min-width: 3840px) {
    border-radius: 12px;
    padding: 18px 0;
    font-size: 1.7rem;
    border: 3px solid #555;
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
  
  @media (min-width: 1366px) {
    border-radius: 5px;
    padding: 10px 0;
    font-size: 1rem;
  }
  
  @media (min-width: 1920px) {
    border-radius: 6px;
    padding: 12px 0;
    font-size: 1.1rem;
    border: 2px solid #555;
  }
  
  @media (min-width: 2560px) {
    border-radius: 8px;
    padding: 14px 0;
    font-size: 1.3rem;
    border: 2px solid #555;
  }
  
  @media (min-width: 3840px) {
    border-radius: 12px;
    padding: 18px 0;
    font-size: 1.7rem;
    border: 3px solid #555;
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
  width: fit-content;
  margin-left: auto;  
  margin-right: auto;
  margin-top: auto;
  margin-bottom: 10px;
  position: relative;
  z-index: 5;
  
  @media (min-width: 1366px) {
    border-radius: 34px;
    padding: 7px 14px;
    gap: 10px;
    margin-bottom: 12px;
  }
  
  @media (min-width: 1920px) {
    border-radius: 38px;
    padding: 8px 16px;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  @media (min-width: 2560px) {
    border-radius: 46px;
    padding: 10px 20px;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  @media (min-width: 3840px) {
    border-radius: 60px;
    padding: 14px 28px;
    gap: 20px;
    margin-bottom: 32px;
  }
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
  
  @media (min-width: 1366px) {
    width: 7px;
    height: 7px;
  }
  
  @media (min-width: 1920px) {
    width: 8px;
    height: 8px;
  }
  
  @media (min-width: 2560px) {
    width: 10px;
    height: 10px;
  }
  
  @media (min-width: 3840px) {
    width: 14px;
    height: 14px;
  }
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
  
  @media (min-width: 1366px) {
    width: 12px;
    height: 12px;
    font-size: 1.1rem;
  }
  
  @media (min-width: 1920px) {
    width: 14px;
    height: 14px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    width: 18px;
    height: 18px;
    font-size: 1.4rem;
  }
  
  @media (min-width: 3840px) {
    width: 24px;
    height: 24px;
    font-size: 1.8rem;
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