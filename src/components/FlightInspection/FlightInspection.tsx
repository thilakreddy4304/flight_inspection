import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import InspectionDetails from '../InspectionTypes/InspectionTypes';

// Import images
import realisticModel from '../../assets/images/realistic-aircraft-model.png';
import meshModel from '../../assets/images/mesh-model-aircraft.png';

const MainContent = styled.div`
  width: 100%;
  
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

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  
  @media (min-width: 1366px) {
    margin-bottom: 10px;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 12px;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 15px;
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 20px;
  }
`;

const TeamSelector = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 8px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  // gap: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  width: fit-content;
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    width: 16px;
    height: 16px;
    
    @media (min-width: 1920px) {
      width: 18px;
      height: 18px;
    }
    
    @media (min-width: 2560px) {
      width: 20px;
      height: 20px;
    }
    
    @media (min-width: 3840px) {
      width: 24px;
      height: 24px;
    }
  }
  
  @media (min-width: 1366px) {
    padding: 9px 10px;
    border-radius: 5px;
    gap: 5px;
    font-size: 1rem;
  }
    
  @media (min-width: 1920px) {
    padding: 10px 12px;
    border-radius: 6px;
    gap: 6px;
    font-size: 1.1rem;
  }
    
  @media (min-width: 2560px) {
    padding: 12px 16px;
    border-radius: 8px;
    gap: 8px;
    font-size: 1.3rem;
  }
    
  @media (min-width: 3840px) {
    padding: 16px 24px;
    border-radius: 12px;
    gap: 12px;
    font-size: 1.7rem;
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  
  @media (min-width: 1366px) {
    font-size: 0.8rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 0.9rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.1rem;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
  
  @media (min-width: 3840px) {
    font-size: 1.4rem;
    
    svg {
      width: 36px;
      height: 36px;
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
    box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 1920px) {
    border-radius: 6px;
    margin-top: 8px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 2560px) {
    border-radius: 8px;
    margin-top: 10px;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 3840px) {
    border-radius: 12px;
    margin-top: 12px;
    box-shadow: 0 10px 14px rgba(0, 0, 0, 0.1);
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
    padding: 9px 18px;
  }
  
  @media (min-width: 1920px) {
    padding: 10px 20px;
  }
  
  @media (min-width: 2560px) {
    padding: 12px 24px;
  }
  
  @media (min-width: 3840px) {
    padding: 16px 30px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  
  @media (min-width: 1366px) {
    font-size: 2.2rem;
    margin: 0 0 15px 0;
  }
  
  @media (min-width: 1920px) {
    font-size: 2.5rem;
    margin: 0 0 18px 0;
  }
  
  @media (min-width: 2560px) {
    font-size: 3rem;
    margin: 0 0 24px 0;
  }
  
  @media (min-width: 3840px) {
    font-size: 4rem;
    margin: 0 0 32px 0;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  cursor: text;
  width: 80%;
  
  @media (min-width: 1366px) {
    gap: 18px;
    margin-bottom: 15px;
  }
  
  @media (min-width: 1920px) {
    gap: 20px;
    margin-bottom: 20px;
  }
  
  @media (min-width: 2560px) {
    gap: 26px;
    margin-bottom: 30px;
  }
  
  @media (min-width: 3840px) {
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  background-color: #222;
  border: none;
  padding: 12px 16px;
  padding-right: 40px;
  color: grey;
  border-radius: 24px;
  width: 100%;
  font-size: 1rem;
  
  &:focus {
    outline: 1px solid #444;
  }
  
  @media (min-width: 1366px) {
    padding: 13px 18px;
    padding-right: 45px;
    border-radius: 28px;
    font-size: 1.1rem;
  }
  
  @media (min-width: 1920px) {
    padding: 14px 20px;
    padding-right: 50px;
    border-radius: 32px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    padding: 16px 24px;
    padding-right: 60px;
    border-radius: 40px;
    font-size: 1.4rem;
  }
  
  @media (min-width: 3840px) {
    padding: 20px 30px;
    padding-right: 80px;
    border-radius: 50px;
    font-size: 1.8rem;
  }
`;

const SearchIconButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #777;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 1366px) {
    right: 14px;
    font-size: 1.3rem;
    
    svg {
      width: 26px;
      height: 26px;
    }
  }
  
  @media (min-width: 1920px) {
    right: 16px;
    font-size: 1.4rem;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
  
  @media (min-width: 2560px) {
    right: 20px;
    font-size: 1.6rem;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
  
  @media (min-width: 3840px) {
    right: 26px;
    font-size: 2rem;
    
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

const OrText = styled.span`
  color: #777;
  
  @media (min-width: 1366px) {
    font-size: 1.1rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.4rem;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.8rem;
  }
`;

const DropdownSelect = styled.div`
  background-color: #222;
  padding: 12px 16px;
  border-radius: 24px;
  color: grey;
  min-width: 150px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
  @media (min-width: 1366px) {
    padding: 13px 18px;
    border-radius: 28px;
    min-width: 170px;
    font-size: 1.1rem;
  }
  
  @media (min-width: 1920px) {
    padding: 14px 20px;
    border-radius: 32px;
    min-width: 190px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    padding: 16px 24px;
    border-radius: 40px;
    min-width: 220px;
    font-size: 1.4rem;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
  
  @media (min-width: 3840px) {
    padding: 20px 30px;
    border-radius: 50px;
    min-width: 280px;
    font-size: 1.8rem;
    
    svg {
      width: 36px;
      height: 36px;
    }
  }
`;

const AircraftInfoContainer = styled.div`
  margin-bottom: 20px;
  font-size: 1rem;
  
  @media (min-width: 1366px) {
    margin-bottom: 30px;
    font-size: 1rem;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 40px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 50px;
    font-size: 1.4rem;
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 70px;
    font-size: 1.8rem;
  }
`;

const FlightInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
  
  @media (min-width: 1366px) {
    gap: 6px;
    margin-bottom: 20px;
  }
  
  @media (min-width: 1920px) {
    gap: 8px;
    margin-bottom: 40px;
  }
  
  @media (min-width: 2560px) {
    gap: 10px;
    margin-bottom: 50px;
  }
  
  @media (min-width: 3840px) {
    gap: 15px;
    margin-bottom: 70px;
  }
`;

const InfoRow = styled.div`
  margin-bottom: 1px;
  white-space: nowrap;

  .label {
    color: #fff;
    font-size: 1rem;
  }

  .value {
    margin-left: 10px;
    font-weight: 200;
    font-size: 0.8rem;
  }
  
  @media (min-width: 1366px) {
    margin-bottom: 2px;
    
    .label {
      font-size: 1rem;
    }
    
    .value {
      margin-left: 12px;
      font-weight: 200;
      font-size: 0.8rem;
    }
  }

  @media (min-width: 1366px) and (max-height: 768px) {
    margin-bottom: 1px;

    .label {
      font-size: 0.8rem;
    }
    .value {
      font-size: 0.6rem;
      font-weight: 200;
    }
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 3px;
    // font-size: 1rem;
    
    .label {
      font-size: 1.1rem;
    }
    
    .value {
      margin-left: 14px;
      font-size: 0.9rem;
      font-weight: 200;
    }
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 4px;
    
    .label {
      font-size: 1.5rem;
    }
    
    .value {
      margin-left: 18px;
      font-size: 1.3rem;
      font-weight: 200;
    }
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 6px;
    
    .label {
      font-size: 2.2rem;
    }
    
    .value {
      margin-left: 24px;
      font-size: 2rem;
      font-weight: 200;
    }
  }
`;

const ModelViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  // margin-bottom: 50px;
  justify-content: center;
  text-align: center;
  width: 100%;
  // max-width: 100%;
  margin-left: auto;
  margin-right: auto;

  > div {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
  
  @media (min-width: 1366px) {
    gap: 60px;
  }
  
  @media (min-width: 1920px) {
    gap: 70px;
  }
  
  @media (min-width: 2560px) {
    gap: 90px;
  }
  
  @media (min-width: 3840px) {
    gap: 120px;
  }
`;

const ModelCard1 = styled.div`
  background-color: #fff;
  border-radius: 20px;
  border: 2px solid #444;
  overflow: hidden;
  display: block;
  width: 100%;
  height: 280px;
  

  @media (min-width: 1366px) and (max-width: 1700px) {
    height: 330px;
    border-radius: 22px;
    border: 2px solid #444;
  }
  
    @media (min-width: 1366px) and (max-height: 768px) {
    height: 280px;
  }

  @media (min-width: 1720px) {
    height: 400px;
    border-radius: 25px;
    border: 3px solid #444;
  }
  
  @media (min-width: 1920px) {
    height: 450px;
    border-radius: 25px;
    border: 3px solid #444;
  }
  
  @media (min-width: 2560px) {
    height: 600px;
    border-radius: 30px;
    border: 4px solid #444;
  }
  
  @media (min-width: 3840px) {
    height: 900px;
    border-radius: 40px;
    border: 5px solid #444;
  }
`;

const ModelCard2 = styled.div`
  border-radius: 10px;
  border: 2px solid #444;
  overflow: hidden;
  display: block;
  width: 100%;
  height: 280px;
  
  @media (min-width: 1366px) {
    height: 330px;
    border-radius: 12px;
    border: 2px solid #444;
  }

   @media (min-width: 1366px) and (max-width: 1700px) {
    height: 330px;
    border-radius: 22px;
    border: 2px solid #444;
  }

  @media (min-width: 1366px) and (max-height: 768px) {
    height: 280px;
  }
  
  @media (min-width: 1720px) {
    height: 400px;
    border-radius: 25px;
    border: 3px solid #444;
  }
  
  @media (min-width: 1920px) {
    height: 450px;
    border-radius: 15px;
    border: 3px solid #444;
  }
  
  @media (min-width: 2560px) {
    height: 600px;
    border-radius: 18px;
    border: 4px solid #444;
  }
  
  @media (min-width: 3840px) {
    height: 900px;
    border-radius: 24px;
    border: 5px solid #444;
  }
`;

const ModelImage1 = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: center;
  }
  
  @media (min-width: 1366px) {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  @media (min-width: 1366px) and (max-height: 768px) {
    img {
      width: 100%;
      height: 95%;
      object-fit: contain;
      object-position: center;
    }
  }
  
  @media (min-width: 1920px) {
    margin-top: 14px;
    margin-bottom: 14px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  @media (min-width: 1921px) and (max-width: 2559px) {
    margin-top: 16px;
    margin-bottom: 16px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
  
  @media (min-width: 2560px) {
    margin-top: 18px;
    margin-bottom: 18px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
  
  @media (min-width: 3840px) {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

const SketchfabEmbed = styled.div`
  height: 100%;
  width: 100%;
  padding: 0;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  @media (min-width: 1366px) {
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  
  @media (min-width: 1920px) {
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  
  @media (min-width: 2560px) {
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  
  @media (min-width: 3840px) {
    iframe {
      width: 100%;
      height: 100%;
    }
  }
`;

const ModelImage2 = styled.div`
  height: 100%;
  width: 100%;
  // background-color: #fff;
  padding: 0; /* Default padding - will be overridden by inline style */
  // margin-top: 10px;
  margin-bottom: 10px;
  font-size: 0;
  line-height: 0;
  box-sizing: border-box;
  
  img {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0;
    object-fit: contain;
    padding: 0;
    object-position: center;
    // border-radius: 12px; /* Optional: Add slightly rounded corners to the image */
  }
  
  @media (min-width: 1366px) {
    margin-bottom: 12px;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 14px;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 100px;
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 100px;
    img {
      width: 100%;
      height: 100%;
      display: block;
      margin: 0;
      object-fit: contain;
      padding: 0;
      object-position: center;
      }
  }
`;

const ModelCaption = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #ccc;
  margin-top: 20px;
  margin-left: 0;
  margin-bottom: 0;
  padding: 0;
  animation: slideFromRight 0.8s ease-out forwards;
  position: relative;
  
  @keyframes slideFromRight {
    0% {
      opacity: 0;
      transform: translateX(200px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @media (min-width: 1366px) {
    font-size: 1.1rem;
    margin-top: 24px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.2rem;
    margin-top: 28px;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.4rem;
    margin-top: 34px;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.8rem;
    margin-top: 44px;
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #222;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  
  @media (min-width: 1366px) {
    border-radius: 5px;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
    margin-top: 6px;
    max-height: 220px;
  }
  
  @media (min-width: 1920px) {
    border-radius: 6px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
    margin-top: 8px;
    max-height: 250px;
  }
  
  @media (min-width: 2560px) {
    border-radius: 8px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
    margin-top: 10px;
    max-height: 300px;
  }
  
  @media (min-width: 3840px) {
    border-radius: 12px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
    margin-top: 14px;
    max-height: 400px;
  }
`;

const SearchResultItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #ccc;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (min-width: 1366px) {
    padding: 12px 18px;
    font-size: 1.1rem;
  }
  
  @media (min-width: 1920px) {
    padding: 14px 20px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    padding: 16px 24px;
    font-size: 1.4rem;
  }
  
  @media (min-width: 3840px) {
    padding: 20px 30px;
    font-size: 1.8rem;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  color: #777;
  
  @media (min-width: 1366px) {
    margin-top: 120px;
  }
  
  @media (min-width: 1920px) {
    margin-top: 140px;
  }
  
  @media (min-width: 2560px) {
    margin-top: 180px;
  }
  
  @media (min-width: 3840px) {
    margin-top: 240px;
  }
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  
  @media (min-width: 1366px) {
    font-size: 4.5rem;
    margin-bottom: 24px;
  }
  
  @media (min-width: 1920px) {
    font-size: 5rem;
    margin-bottom: 28px;
  }
  
  @media (min-width: 2560px) {
    font-size: 6rem;
    margin-bottom: 36px;
  }
  
  @media (min-width: 3840px) {
    font-size: 8rem;
    margin-bottom: 48px;
  }
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 100px;
  
  @media (min-width: 1366px) {
    font-size: 1.3rem;
    margin-top: 120px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.5rem;
    margin-top: 140px;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.8rem;
    margin-top: 180px;
  }
  
  @media (min-width: 3840px) {
    font-size: 2.4rem;
    margin-top: 240px;
  }
`;

// Add these dropdown styled components
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #222;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  
  @media (min-width: 1366px) {
    border-radius: 5px;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
    margin-top: 6px;
    max-height: 220px;
  }
  
  @media (min-width: 1920px) {
    border-radius: 6px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
    margin-top: 8px;
    max-height: 250px;
  }
  
  @media (min-width: 2560px) {
    border-radius: 8px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
    margin-top: 10px;
    max-height: 300px;
  }
  
  @media (min-width: 3840px) {
    border-radius: 12px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
    margin-top: 14px;
    max-height: 400px;
  }
`;

const DropdownMenuItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #ccc;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (min-width: 1366px) {
    padding: 12px 18px;
    font-size: 1.1rem;
  }
  
  @media (min-width: 1920px) {
    padding: 14px 20px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    padding: 16px 24px;
    font-size: 1.4rem;
  }
  
  @media (min-width: 3840px) {
    padding: 20px 30px;
    font-size: 1.8rem;
  }
`;

const ClearFiltersButton = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  color: #ccc;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (min-width: 1366px) {
    padding: 9px 14px;
    border-radius: 5px;
    font-size: 0.9rem;
  }
  
  @media (min-width: 1920px) {
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  @media (min-width: 2560px) {
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 3840px) {
    padding: 16px 28px;
    border-radius: 12px;
    font-size: 1.5rem;
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 40px;
  margin-left: 0;
  
  @media (min-width: 1366px) {
    margin-top: 30px;
  }
  
  @media (min-width: 1920px) {
    margin-top: 28px;
  }
  
  @media (min-width: 2560px) {
    margin-top: 36px;
  }
  
  @media (min-width: 3840px) {
    margin-top: 48px;
  }
`;

const ActionButton = styled.button`
  background-color: rgb(40, 43, 45);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #444;
  }
  
  @media (min-width: 1366px) {
    border-radius: 9px;
    padding: 14px 28px;
    font-size: 1.1rem;
  }

  @media (min-width: 1366px) and (max-height: 768px) {
    border-radius: 9px;
    padding: 10px 20px;
    font-size: 1rem;
  }

  @media (min-width: 1920px) {
    border-radius: 10px;
    padding: 16px 32px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    border-radius: 12px;
    padding: 20px 40px;
    font-size: 1.4rem;
  }
  
  @media (min-width: 3840px) {
    border-radius: 16px;
    padding: 26px 52px;
    font-size: 1.8rem;
  }
`;

// Add more mock flight data
const FLIGHT_DATA: Record<string, any> = {
  'DL4890': {
    identifier: 'DL4890',
    make: 'Boeing',
    model: 'Boeing 737-10',
    engines: '2x Turbofans',
    wingspan: '35.9m (117ft 10in)',
    length: '43.8m (143ft 8in)'
  },
  'DL1234': {
    identifier: 'DL1234',
    make: 'Airbus',
    model: 'Airbus A320',
    engines: '2x GEnx-1B',
    wingspan: '60.1m (197ft)',
    length: '63m (206ft 8in)'
  },
  'DL5678': {
    identifier: 'DL5678',
    make: 'Gulfstream',
    model: 'Boeing 737-10',
    engines: '2x Rolls-Royce Trent XWB',
    wingspan: '64.8m (212ft 5in)',
    length: '66.8m (219ft 2in)'
  },
  'AA137': {
    identifier: 'AA137',
    make: 'Dassault',
    model: 'Airbus A320',
    engines: '2x LEAP-1A',
    wingspan: '35.8m (117ft 5in)',
    length: '37.6m (123ft 3in)'
  },
  'UA5432': {
    identifier: 'UA5432',
    make: 'Embraer',
    model: 'Boeing 737-10',
    engines: '2x GE90-115B',
    wingspan: '64.8m (212ft 7in)',
    length: '73.9m (242ft 4in)'
  },
  'BA2901': {
    identifier: 'BA2901',
    make: 'Bombardier',
    model: 'Airbus A320',
    engines: '4x Engine Alliance GP7200',
    wingspan: '79.8m (261ft 10in)',
    length: '72.7m (238ft 7in)'
  },
  'LH7890': {
    identifier: 'LH7890',
    make: 'Lockheed Martin',
    model: 'Boeing 737-10',
    engines: '4x Rolls-Royce AE2100D3',
    wingspan: '40.4m (132ft 7in)',
    length: '29.8m (97ft 9in)'
  },
  'FR1234': {
    identifier: 'FR1234',
    make: 'Cirrus',
    model: 'Airbus A320',
    engines: '1x Williams FJ33-5A',
    wingspan: '11.8m (38ft 7in)',
    length: '9.4m (30ft 11in)'
  },
  'EK5678': {
    identifier: 'EK5678',
    make: 'Textron',
    model: 'Boeing 737-10',
    engines: '2x Honeywell HTF7700L',
    wingspan: '20.5m (67ft 2in)',
    length: '22.3m (73ft 2in)'
  },
  'SQ2345': {
    identifier: 'SQ2345',
    make: 'Raytheon',
    model: 'Airbus A320',
    engines: '2x Pratt & Whitney Canada PW308A',
    wingspan: '18.8m (61ft 9in)',
    length: '21.1m (69ft 2in)'
  },
  'JL8765': {
    identifier: 'JL8765',
    make: 'Cessna',
    model: 'Boeing 737-10',
    engines: '1x Lycoming IO-360-L2A',
    wingspan: '11m (36ft 1in)',
    length: '8.3m (27ft 2in)'
  },
  'QF3456': {
    identifier: 'QF3456',
    make: 'Pilatus',
    model: 'Airbus A320',
    engines: '1x Pratt & Whitney PT6A-67P',
    wingspan: '16.3m (53ft 4in)',
    length: '14.4m (47ft 3in)'
  },
  'AF7654': {
    identifier: 'AF7654',
    make: 'Beechcraft',
    model: 'Boeing 737-10',
    engines: '2x Pratt & Whitney PT6A-60A',
    wingspan: '17.7m (57ft 11in)',
    length: '14.2m (46ft 8in)'
  },
  'KL2109': {
    identifier: 'KL2109',
    make: 'Diamond',
    model: 'Airbus A320',
    engines: '2x Austro Engine AE330',
    wingspan: '14.5m (47ft 7in)',
    length: '9.2m (30ft 2in)'
  },
  'NH8901': {
    identifier: 'NH8901',
    make: 'Honda',
    model: 'Boeing 737-10',
    engines: '2x GE Honda HF120',
    wingspan: '12.1m (39ft 9in)',
    length: '13m (42ft 7in)'
  },
  'CX6543': {
    identifier: 'CX6543',
    make: 'Piper',
    model: 'Airbus A320',
    engines: '1x Pratt & Whitney PT6A-42A',
    wingspan: '13.4m (43ft 10in)',
    length: '9.9m (32ft 7in)'
  },
  'EY9876': {
    identifier: 'EY9876',
    make: 'Air Tractor',
    model: 'Boeing 737-10',
    engines: '1x Pratt & Whitney PT6A-67F',
    wingspan: '18m (59ft 2in)',
    length: '10.9m (35ft 9in)'
  },
  'TK5432': {
    identifier: 'TK5432',
    make: 'Bye',
    model: 'Airbus A320',
    engines: 'Electric',
    wingspan: '16.8m (55ft 1in)',
    length: '12.2m (40ft 0in)'
  },
  'AC3210': {
    identifier: 'AC3210',
    make: 'Carlson',
    model: 'Boeing 737-10',
    engines: '1x Rotax 912 ULS',
    wingspan: '10.4m (34ft 1in)',
    length: '7.3m (24ft 0in)'
  },
  'SU7654': {
    identifier: 'SU7654',
    make: 'Comac',
    model: 'Airbus A320',
    engines: '2x CFM LEAP-1C',
    wingspan: '35.8m (117ft 5in)',
    length: '38.9m (127ft 7in)'
  },
  'OS8765': {
    identifier: 'OS8765',
    make: 'Daher',
    model: 'Boeing 737-10',
    engines: '1x Pratt & Whitney PT6A-66D',
    wingspan: '12.3m (40ft 4in)',
    length: '10.7m (35ft 1in)'
  },
  'AZ2345': {
    identifier: 'AZ2345',
    make: 'Wisk',
    model: 'Airbus A320',
    engines: 'Electric + 12 Lift Rotors',
    wingspan: '11m (36ft 1in)',
    length: '6.4m (21ft 0in)'
  },
  'IB6789': {
    identifier: 'IB6789',
    make: 'Joby',
    model: 'Boeing 737-10',
    engines: 'Electric VTOL',
    wingspan: '11.6m (38ft 1in)',
    length: '8.5m (27ft 11in)'
  },
  'BR1357': {
    identifier: 'BR1357',
    make: 'Archer',
    model: 'Airbus A320',
    engines: 'Electric VTOL',
    wingspan: '12.2m (40ft 0in)',
    length: '7.9m (25ft 11in)'
  }
};

interface FlightInspectionProps {
  flightId?: string;
  hideSidePanel?: (hide: boolean) => void;
}

// Add this function to extract unique makes from FLIGHT_DATA
const getUniqueAircraftMakes = () => {
  const makesMap: Record<string, boolean> = {};
  
  Object.values(FLIGHT_DATA).forEach(flight => {
    makesMap[flight.make] = true;
  });
  
  return Object.keys(makesMap).sort();
};

// Add this function to extract unique models for a selected make
const getModelsForMake = (make: string) => {
  const modelsMap: Record<string, boolean> = {};
  
  Object.values(FLIGHT_DATA)
    .filter(flight => flight.make === make)
    .forEach(flight => {
      modelsMap[flight.model] = true;
    });
  
  return Object.keys(modelsMap).sort();
};

// Add this function to extract all unique models from FLIGHT_DATA
const getAllUniqueModels = () => {
  const modelsMap: Record<string, boolean> = {};
  
  Object.values(FLIGHT_DATA).forEach(flight => {
    modelsMap[flight.model] = true;
  });
  
  return Object.keys(modelsMap).sort();
};

// Add this function to extract unique makes for a selected model
const getMakesForModel = (model: string) => {
  const makesMap: Record<string, boolean> = {};
  
  Object.values(FLIGHT_DATA)
    .filter(flight => flight.model === model)
    .forEach(flight => {
      makesMap[flight.make] = true;
    });
  
  return Object.keys(makesMap).sort();
};

const FlightInspection: React.FC<FlightInspectionProps> = ({ flightId }) => {
  const params = useParams<{ flightId: string }>();
  const navigate = useNavigate();
  const currentFlightId = flightId || params.flightId || '';
  const { selectedTeam, teams, selectTeam } = useAuth();
  const [view, setView] = useState<'selection' | 'details'>('selection');
  // State to control team selector dropdown
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  
  // State for flight search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlightId, setSelectedFlightId] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  // State for make/model dropdowns
  const [showMakeDropdown, setShowMakeDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  
  // Get unique aircraft makes and models
  const uniqueMakes = selectedModel 
    ? getMakesForModel(selectedModel) 
    : getUniqueAircraftMakes();
  const allModels = getAllUniqueModels();
  const modelsForSelectedMake = selectedMake 
    ? getModelsForMake(selectedMake) 
    : allModels;
  
  // Filter flight options based on search query, make, and model
  const filteredFlights = Object.keys(FLIGHT_DATA)
    .filter(id => {
      const flight = FLIGHT_DATA[id];
      const matchesSearch = id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMake = !selectedMake || flight.make === selectedMake;
      const matchesModel = !selectedModel || flight.model === selectedModel;
      return matchesSearch && matchesMake && matchesModel;
    })
    .map(id => FLIGHT_DATA[id]);
  
  // Use the data for the specified flightId, or null if no selection
  const currentFlight = selectedFlightId ? FLIGHT_DATA[selectedFlightId] : null;
  
  // Create refs for dropdown containers
  const makeDropdownRef = useRef<HTMLDivElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  
  // Add state for responsive padding
  const [responsivePadding, setResponsivePadding] = useState({
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  });
  
  // Add useEffect for responsive padding
  useEffect(() => {
    const updatePadding = () => {
      const width = window.innerWidth;
      if (width >= 3840) {
        setResponsivePadding({ top: 5, right: 5, bottom: 5, left: 5 });
      } else if (width >= 2560) {
        setResponsivePadding({ top: 4, right: 4, bottom: 4, left: 4 });
      } else if (width >= 1920) {
        setResponsivePadding({ top: 3, right: 3, bottom: 3, left: 3 });
      } else if (width >= 1366) {
        setResponsivePadding({ top: 2, right: 2, bottom: 2, left: 2 });
      } else {
        setResponsivePadding({ top: 1, right: 1, bottom: 1, left: 1 });
      }
    };
    
    // Set initial value
    updatePadding();
    
    // Add event listener
    window.addEventListener('resize', updatePadding);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', updatePadding);
    };
  }, []);
  
  useEffect(() => {
    if (currentFlightId && FLIGHT_DATA[currentFlightId]) {
      setSelectedFlightId(currentFlightId);
      setSearchQuery(currentFlightId);
      
      const flight = FLIGHT_DATA[currentFlightId];
      if (flight) {
        setSelectedMake(flight.make);
        setSelectedModel(flight.model);
      }
    }
  }, [currentFlightId]);
  // Add click outside event handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close make dropdown if clicked outside
      if (makeDropdownRef.current && 
          !makeDropdownRef.current.contains(event.target as Node) && 
          showMakeDropdown) {
        setShowMakeDropdown(false);
      }
      
      // Close model dropdown if clicked outside
      if (modelDropdownRef.current && 
          !modelDropdownRef.current.contains(event.target as Node) && 
          showModelDropdown) {
        setShowModelDropdown(false);
      }
    };
    
    // Add event listener when dropdowns are open
    if (showMakeDropdown || showModelDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMakeDropdown, showModelDropdown]);
  
  // Function to toggle team dropdown
  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };
  
  // Function to handle team selection
  const handleTeamSelect = (teamId: string) => {
    selectTeam(teamId);
    setIsTeamDropdownOpen(false);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
    
    // Clear selected flight if search field is cleared
    if (value === '') {
      setSelectedFlightId('');
    }
  };
  
  // Handle flight selection from dropdown
  const handleFlightSelect = (flightId: string) => {
    setSelectedFlightId(flightId);
    setSearchQuery(flightId);
    setShowDropdown(false);
    
    // Update make and model dropdowns to match selected flight
    const flight = FLIGHT_DATA[flightId];
    if (flight) {
      setSelectedMake(flight.make);
      setSelectedModel(flight.model);
      setShowDropdown(false);
    }

    navigate(`/inspections/${flightId}`);
  };
  
  // Handle make selection
  const handleMakeSelect = (make: string) => {
    setSelectedMake(make);
    setSelectedModel(''); // Reset model when make changes
    setShowMakeDropdown(false);
    
    // Find a flight with this make and update if there's exactly one match
    const matchingFlights = Object.entries(FLIGHT_DATA)
      .filter(([_, flight]) => flight.make === make);
    
    if (matchingFlights.length === 1) {
      const [flightId] = matchingFlights[0];
      handleFlightSelect(flightId);
    } else if (selectedFlightId && FLIGHT_DATA[selectedFlightId]?.make !== make) {
      // Clear selected flight if it doesn't match the new make
      setSelectedFlightId('');
      setSearchQuery('');
    }
  };
  
  // Handle model selection
  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setShowModelDropdown(false);
    
    if (model === '') {
      // If model selection is cleared, don't filter makes
      if (selectedMake) {
        // Keep current make if it exists
        return;
      }
      setSelectedFlightId('');
      setSearchQuery('');
      return;
    }
    
    // Find makes available for this model
    const availableMakes = getMakesForModel(model);
    
    // If current make is not valid for this model, reset it
    if (selectedMake && !availableMakes.includes(selectedMake)) {
      setSelectedMake('');
    }
    
    // If only one make is available for this model, select it
    if (availableMakes.length === 1) {
      setSelectedMake(availableMakes[0]);
    }
    
    // Find flights with this model
    const matchingFlights = Object.entries(FLIGHT_DATA)
      .filter(([_, flight]) => {
        // If make is selected, filter by both make and model
        if (selectedMake) {
          return flight.make === selectedMake && flight.model === model;
        }
        // Otherwise, just filter by model
        return flight.model === model;
      });
    
    if (matchingFlights.length === 1) {
      // If there's exactly one match, select it
      const [flightId] = matchingFlights[0];
      handleFlightSelect(flightId);
    } else if (selectedFlightId && FLIGHT_DATA[selectedFlightId]?.model !== model) {
      // Clear selected flight if it doesn't match the new model
      setSelectedFlightId('');
      setSearchQuery('');
    }
  };
  
  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedFlightId('');
  };
  
  const handleSelectAndContinue = () => {
    if (currentFlight) {
      setView('details');
    }
  };
  
  // Choose your preferred object-fit style:
  // - 'cover' fills the entire box but may crop parts of the image
  // - 'contain' shows the entire image but may show background visible
  const imageObjectFit = 'cover'; // Change to 'contain' if you prefer to see the entire image
  
  // Choose which part of the image to focus on when using 'cover'
  // Options: 'center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'
  const imagePosition = 'center';
  
  // Create padding string for inline style from responsive padding state
  const imagePadding = `${responsivePadding.top}px ${responsivePadding.right}px ${responsivePadding.bottom}px ${responsivePadding.left}px`;
  
  if (view === 'details' && currentFlight) {
    return <InspectionDetails 
      flight={currentFlight} 
      onBack={() => setView('selection')} 
      // hideSidePanel={hideSidePanel}
    />;
  }
  
  return (
    <MainContent>
      <TopBar>
        <TeamSelector onClick={toggleTeamDropdown}>
          Team: {selectedTeam?.name} 
          <TeamSelectorIcon style={{ transform: isTeamDropdownOpen ? 'rotate(180deg)' : 'none' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 9L12 15L6 9" stroke="#777"/>
</svg>
</TeamSelectorIcon>
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
      
      <PageTitle>Inspections</PageTitle>
      
      <SearchContainer>
        <SearchInputContainer>
          <SearchInput 
            placeholder="Search by Flight Unique Identifier" 
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(searchQuery.length > 0)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          <SearchIconButton>
            <span role="img" aria-label="search"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="6" stroke="#777"/>
<path d="M20 20L17 17" stroke="#777" stroke-linecap="round"/>
</svg>
</span>
          </SearchIconButton>
          {showDropdown && (
            <SearchDropdown>
              {filteredFlights.length > 0 ? (
                filteredFlights.map(flight => (
                  <SearchResultItem 
                  
                    key={flight.identifier}
                    onClick={() => handleFlightSelect(flight.identifier)}
                  >
                    {flight.identifier} - {flight.make} {flight.model}
                  </SearchResultItem>
                ))
              ) : (
                <SearchResultItem>No results found</SearchResultItem>
              )}
            </SearchDropdown>
          )}
        </SearchInputContainer>
        <OrText>Or</OrText>
        <div ref={makeDropdownRef} style={{ position: 'relative' }}>
          <DropdownSelect 
            onClick={() => setShowMakeDropdown(!showMakeDropdown)}
          >
            {selectedMake || 'Aircraft Make'} <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 9L12 15L6 9" stroke="#777"/>
</svg>
</span>
            {showMakeDropdown && (
              <DropdownMenu>
                {selectedMake && (
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleMakeSelect('');
                  }}>
                    Clear
                  </DropdownMenuItem>
                )}
                {uniqueMakes.map(make => (
                  <DropdownMenuItem 
                    key={make}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMakeSelect(make);
                    }}
                  >
                    {make}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
            )}
          </DropdownSelect>
        </div>
        <div ref={modelDropdownRef} style={{ position: 'relative' }}>
          <DropdownSelect 
            onClick={() => setShowModelDropdown(!showModelDropdown)}
          >
            {selectedModel || 'Aircraft Model'} <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 9L12 15L6 9" stroke="#777"/>
</svg>
</span>
            {showModelDropdown && (
              <DropdownMenu>
                {selectedModel && (
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleModelSelect('');
                  }}>
                    Clear
                  </DropdownMenuItem>
                )}
                {modelsForSelectedMake.map(model => (
                  <DropdownMenuItem 
                    key={model}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModelSelect(model);
                    }}
                  >
                    {model}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
            )}
          </DropdownSelect>
        </div>
        {(selectedMake || selectedModel || searchQuery) && (
          <ClearFiltersButton onClick={clearFilters}>
            Clear All
          </ClearFiltersButton>
        )}
      </SearchContainer>
      
      {/* Only show flight information if a flight is selected */}
      {currentFlight ? (
        <>
          <AircraftInfoContainer>
            <FlightInfo>
              <InfoRow>
                <span className="label">Identifier:</span><span className="value">{currentFlight.identifier}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Make:</span><span className="value">{currentFlight.make}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Model:</span><span className="value">{currentFlight.model}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Engines:</span><span className="value">{currentFlight.engines}</span>
              </InfoRow>
              <InfoRow> 
                <span className="label">Wingspan:</span><span className="value">{currentFlight.wingspan}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Length:</span><span className="value">{currentFlight.length}</span>
              </InfoRow>
            </FlightInfo>
          </AircraftInfoContainer>
          
          <ModelViewContainer>
            <div style={{ padding: 0, margin: 0, lineHeight: 0 }}>
              <ModelCard1>
                <ModelImage1 style={{ padding: imagePadding }}>
                  <img 
                    src={realisticModel} 
                    alt={`${currentFlight.make} ${currentFlight.model}`} 
                    style={{ objectFit: imageObjectFit, objectPosition: imagePosition }}
                  />
                </ModelImage1>
              </ModelCard1>
              <ModelCaption>3D Realistic Model</ModelCaption>
            </div>
            
            <div style={{ padding: 0, margin: 0, lineHeight: 0 }}>
              <ModelCard2>
                <ModelImage2 style={{ padding: imagePadding }}>
                  <img 
                    src={meshModel} 
                    alt={`${currentFlight.make} ${currentFlight.model}`} 
                    style={{ objectFit: imageObjectFit, objectPosition: imagePosition }}
                  />
                </ModelImage2>
              </ModelCard2>
              <ModelCaption>3D Mesh Model</ModelCaption>
            </div>
          </ModelViewContainer>
          
          <ActionButtonContainer>
            <ActionButton onClick={handleSelectAndContinue}>Select & Continue</ActionButton>
          </ActionButtonContainer>
        </>
      ) : (
        <EmptyStateContainer>
          {/* <EmptyStateIcon>✈️</EmptyStateIcon> */}
          <EmptyStateText>Search for a flight identifier to view aircraft details</EmptyStateText>
        </EmptyStateContainer>
      )}
    </MainContent>
  );
};

export default FlightInspection; 