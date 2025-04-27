import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import InspectionStage4 from './InspectionStage4';
import combinedModel from '../../assets/images/combined.png';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  min-height: 100vh;
  background-color: #121212;
  color: white;

  @media (min-width: 768px) {
    grid-template-columns: 70px 1fr;
  }
  
  @media (min-width: 1366px) {
    grid-template-columns: 80px 1fr;
  }

  @media (min-width: 1440px) {
    grid-template-columns: 80px 1fr;
}

  @media (min-width: 1920px) {
    grid-template-columns: 90px 1fr;
  }
  
  @media (min-width: 2560px) {
    grid-template-columns: 100px 1fr;
  }

  @media (min-width: 3840px) {
    grid-template-columns: 120px 1fr;
  }
`;

const SideNav = styled.div`
  background-color: #181818;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-right: 1px solid #333;
`;

const MainContainer = styled.div`
  width: 100%;
  padding: 24px;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 5px;
  }
  
  @media (min-width: 1366px) {
    padding: 5px;
  }

  @media (min-width: 1440px) {
    padding: 10px;
  }
  
  @media (min-width: 1920px) {
    padding: 10px;
  }
  
  @media (min-width: 2560px) {
    padding: 20px;
  }

  @media (min-width: 3840px) {
    padding: 20px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 1px;

  @media (min-width: 768px) {
    margin-bottom: 8px;
  }
  
  @media (min-width: 1366px) {
    margin-bottom: 8px;
  }

  @media (min-width: 1440px) {
    margin-bottom: 10px;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 12px;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 16px;
  }

  @media (min-width: 3840px) {
    margin-bottom: 20px;
  }
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
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (min-width: 768px) {
    padding: 5px 10px;
    font-size: 0.8rem;
    gap: 6px;
  }
  
  @media (min-width: 1366px) {
    padding: 6px 12px;
    font-size: 0.8rem;
    gap: 6px;
  }

  @media (min-width: 1440px) {
    padding: 8px 16px;
    font-size: 0.9rem;
    gap: 8px;
  }
  
  @media (min-width: 1920px) {
    padding: 10px 18px;
    font-size: 1rem;
    gap: 10px;
  }
  
  @media (min-width: 2560px) {
    padding: 12px 24px;
    font-size: 1.2rem;
    gap: 12px;
    border-radius: 6px;
  }

  @media (min-width: 3840px) {
    padding: 14px 30px;
    font-size: 1.4rem;
    gap: 14px;
    border-radius: 8px;
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
  transition: transform 0.3s ease;

  @media (min-width: 1366px) {
    font-size: 0.7rem;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (min-width: 1440px) {
    font-size: 0.8rem;

    svg {
      width: 22px;
      height: 22px;
    }
  }
  
  @media (min-width: 1920px) {
    font-size: 0.9rem;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
  
  @media (min-width: 2560px) {
    font-size: 1.1rem;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }

  @media (min-width: 3840px) {
    font-size: 1.3rem;

    svg {
      width: 32px;
      height: 32px;
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

  @media (min-width: 768px) {
    border-radius: 4px;
    margin-top: 4px;
  }
  
  @media (min-width: 1366px) {
    border-radius: 4px;
    margin-top: 4px;
  }

  @media (min-width: 1440px) {
    border-radius: 4px;
    margin-top: 5px;
  }
  
  @media (min-width: 1920px) {
    border-radius: 5px;
    margin-top: 6px;
  }
  
  @media (min-width: 2560px) {
    border-radius: 6px;
    margin-top: 8px;
  }

  @media (min-width: 3840px) {
    border-radius: 8px;
    margin-top: 10px;
  }
`;

const TeamOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (min-width: 768px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
  
  @media (min-width: 1366px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  @media (min-width: 1440px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
  
  @media (min-width: 1920px) {
    padding: 10px 18px;
    font-size: 1rem;
  }
  
  @media (min-width: 2560px) {
    padding: 12px 24px;
    font-size: 1.2rem;
  }

  @media (min-width: 3840px) {
    padding: 14px 30px;
    font-size: 1.4rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 12px 0;

  @media (min-width: 768px) {
    font-size: 1.4rem;
    margin: 0 0 10px 0;
  }
  
  @media (min-width: 1366px) {
    font-size: 1.4rem;
    margin: 0 0 10px 0;
  }

  @media (min-width: 1440px) {
    font-size: 1.6rem;
    margin: 0 0 12px 0;
  }
  
  @media (min-width: 1920px) {
    font-size: 2rem;
    margin: 0 0 14px 0;
  }
  
  @media (min-width: 2560px) {
    font-size: 2.4rem;
    margin: 0 0 18px 0;
  }

  @media (min-width: 3840px) {
    font-size: 3rem;
    margin: 0 0 24px 0;
  }
`;

const FlightIdentifier = styled.span`
  margin-left: 12px;
  font-size: 2rem;

  @media (min-width: 768px) {
    margin-left: 10px;
    font-size: 1.4rem;
  }
  
  @media (min-width: 1366px) {
    margin-left: 10px;
    font-size: 1.4rem;
  }

  @media (min-width: 1440px) {
    margin-left: 12px;
    font-size: 1.6rem;
  }
  
  @media (min-width: 1920px) {
    margin-left: 14px;
    font-size: 2rem;
  }
  
  @media (min-width: 2560px) {
    margin-left: 16px;
    font-size: 2.4rem;
  }

  @media (min-width: 3840px) {
    margin-left: 24px;
    font-size: 3rem;
  }
`;

const FlightModel = styled.span`
  font-size: 1.2rem;
  color: #999;
  font-weight: normal;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (min-width: 1366px) {
    font-size: 0.9rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.4rem;
  }

  @media (min-width: 3840px) {
    font-size: 1.6rem;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;

  &:hover {
    color: white;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    margin-bottom: 10px;
    gap: 6px;
  }
  
  @media (min-width: 1366px) {
    font-size: 1rem;
    margin-bottom: 10px;
    gap: 6px;
  }

  @media (min-width: 1440px) {
    font-size: 1.2rem;
    margin-bottom: 14px;
    gap: 8px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.4rem;
    margin-bottom: 24px;
    gap: 10px;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
    gap: 12px;
  }

  @media (min-width: 3840px) {
    font-size: 2rem;
    margin-bottom: 36px;
    gap: 14px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 0;
  position: relative;

  @media (min-width: 768px) {
    gap: 10px;
  }
  
  @media (min-width: 1366px) {
    gap: 10px;
  }

  @media (min-width: 1440px) {
    gap: 14px;
  }
  
  @media (min-width: 1920px) {
    gap: 20px;
  }
  
  @media (min-width: 2560px) {
    gap: 30px;
  }

  @media (min-width: 3840px) {
    gap: 50px;
  }
`;

const StepsContainer = styled.div`
  flex: 0 0 350px;
  margin-top: 10px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex: 0 0 280px;
  }
  
  @media (min-width: 1366px) {
    flex: 0 0 280px;
  }

  @media (min-width: 1440px) {
    flex: 0 0 330px;
  }
  
  @media (min-width: 1920px) {
    flex: 0 0 380px;
  }
  
  @media (min-width: 2560px) {
    flex: 0 0 450px;
  }

  @media (min-width: 3840px) {
    flex: 0 0 550px;
  }
`;

const StepSection = styled.div<{ isActive?: boolean }>`
  margin-bottom: 5px;
  opacity: ${props => props.isActive ? 1 : 0.5};

  @media (min-width: 768px) {
    margin-bottom: 4px;
  }
  
  @media (min-width: 1366px) {
    margin-bottom: 4px;
  }

  @media (min-width: 1440px) {
    margin-bottom: 6px;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 8px;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 12px;
  }

  @media (min-width: 3840px) {
    margin-bottom: 40px;
  }
`;

const StepTitle = styled.h3<{ isActive?: boolean }>`
  font-size: 1.2rem;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  color: ${props => props.isActive ? '#ccc' : '#999'};
  
  &::before {
    content: attr(data-number);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${props => props.isActive ? 'rgba(52, 152, 219, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
    margin-right: 12px;
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
    margin: 0 0 4px 0;
    
    &::before {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      font-size: 0.8rem;
    }
  }
  
  @media (min-width: 1366px) {
    font-size: 0.9rem;
    margin: 0 0 4px 0;
    
    &::before {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      font-size: 0.8rem;
    }
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
    margin: 0 0 6px 0;

    &::before {
      width: 24px;
      height: 24px;
      margin-right: 12px;
      font-size: 0.9rem;
    }
  }
  
  @media (min-width: 1920px) {
    font-size: 1.2rem;
    margin: 0 0 6px 0;
    
    &::before {
      width: 28px;
      height: 28px;
      margin-right: 14px;
      font-size: 1rem;
    }
  }
  
  @media (min-width: 2560px) {
    font-size: 1.6rem;
    margin: 0 0 8px 0;
    
    &::before {
      width: 34px;
      height: 34px;
      margin-right: 16px;
      font-size: 1.2rem;
    }
  }

  @media (min-width: 3840px) {
    font-size: 2.2rem;
    margin: 0 0 12px 0;

    &::before {
      width: 38px;
      height: 38px;
      margin-right: 18px;
      font-size: 1.8rem;
    }
  }
`;

const StepList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0 36px;

  @media (min-width: 768px) {
    margin: 0 0 0 30px;
  }
  
  @media (min-width: 1366px) {
    margin: 0 0 0 30px;
  }

  @media (min-width: 1440px) {
    margin: 0 0 0 36px;
  }
  
  @media (min-width: 1920px) {
    margin: 0 0 0 42px;
  }
  
  @media (min-width: 2560px) {
    margin: 0 0 0 50px;
  }

  @media (min-width: 3840px) {
    margin: 0 0 0 60px;
  }
`;

const StepItem = styled.li<{ isActive?: boolean }>`
  position: relative;
  padding-left: 20px;
  margin-bottom: 2px;
  color: ${props => props.isActive ? '#fff' : '#999'};
  font-size: 0.9rem;
  
  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${props => props.isActive ? '#3498db' : '#777'};
  }

  @media (min-width: 768px) {
    padding-left: 16px;
    margin-bottom: 2px;
    font-size: 0.8rem;
  }
  
  @media (min-width: 1366px) {
    padding-left: 16px;
    margin-bottom: 2px;
    font-size: 0.8rem;
  }

  @media (min-width: 1440px) {
    padding-left: 20px;
    margin-bottom: 2px;
    font-size: 0.9rem;
  }
  
  @media (min-width: 1920px) {
    padding-left: 24px;
    margin-bottom: 4px;
    font-size: 1.1rem;
  }
  
  @media (min-width: 2560px) {
    padding-left: 28px;
    margin-bottom: 6px;
    font-size: 1.3rem;
  }

  @media (min-width: 3840px) {
    padding-left: 32px;
    margin-bottom: 8px;
    font-size: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  height: 1400px;
  max-width: 1000px;
  border-radius: 20px;
  overflow: hidden;
  background-color: rgb(40, 39, 39);
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  border-color: #999;
  border-width: 2px;
  border-style: solid;
  right: 0;
  top: -60px;
  width: calc(100% - 380px);

  @media (min-width: 768px) {
    max-height: 470px;
    border-radius: 16px;
    top: -30px;
    max-width: 700px;
    // width: calc(100% - 300px);
    border-width: 1px;
  }
  
  @media (min-width: 1366px) {
    max-height: 470px;
    border-radius: 16px;
    top: -25px;
    max-width: 700px;
    // width: calc(100% - 300px);
    border-width: 1px;
  }

  @media (min-width: 1440px) {
    max-height: 530px;
    border-radius: 18px;
    top: -30px;
    max-width: 800px;
    // width: calc(100% - 330px);
    border-width: 1px;
  }
  
  @media (min-width: 1920px) {
    max-height: 650px;
    max-width: 1000px;
    border-radius: 24px;
    top: -45px;
    // width: calc(100% - 410px);
    border-width: 2px;
  }
  
  @media (min-width: 2560px) {
    max-height: 850px;
    max-width: 1400px;
    border-radius: 30px;
    top: -60px;
    // width: calc(100% - 480px);
    border-width: 3px;
  }

  @media (min-width: 3840px) {
    max-height: 1180px;
    max-width: 2000px;
    border-radius: 40px;
    top: -70px;
    // width: calc(100% - 550px);
    border-width: 4px;
  }
`;

const StageIndicator = styled.div`
  position: relative;
  padding: 5px 5px;
  background-color: transparent;
  font-size: 0.9rem;
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
  max-width: 100%;

  @media (min-width: 768px) {
    padding: 4px 12px;
    font-size: 0.8rem;
  }
  
  @media (min-width: 1366px) {
    padding: 4px 12px;
    font-size: 0.8rem;
  }

  @media (min-width: 1440px) {
    padding: 5px 10px;
    font-size: 0.9rem;
  }
  
  @media (min-width: 1920px) {
    padding: 6px 18px;
    font-size: 1rem;
  }
  
  @media (min-width: 2560px) {
    padding: 8px 22px;
    font-size: 1.2rem;
  }

  @media (min-width: 3840px) {
    padding: 10px 26px;
    font-size: 1.6rem;
  }
`;

const StageTitle = styled.div`
  font-weight: bold;
  font-style: italic;
  margin-bottom: 5px;
  color: #fff;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }

  @media (min-width: 1366px) {
    font-size: 0.8rem;
  }

  @media (min-width: 1440px) {
    font-size: 0.9rem;
  }

  @media (min-width: 1920px) {
    font-size: 1.2rem;
  }

  @media (min-width: 2560px) {
    font-size: 1.4rem;
  }

  @media (min-width: 3840px) {
    font-size: 1.6rem;
  }
`;

const StageText = styled.div`
  font-style: italic;
  margin-bottom: 5px;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (min-width: 1366px) {
    font-size: 0.7rem;
  }

  @media (min-width: 1440px) {
    font-size: 0.9rem;
  }

  @media (min-width: 1920px) {
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.4rem;
  }

  @media (min-width: 3840px) {
    font-size: 1.6rem;
  }
`;

const AircraftImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  max-height: 600px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

   @media (min-width: 768px) {
    min-height: 350px;
    width: 105%;
    margin-left: -2.5%;
  }
  
  @media (min-width: 1366px) {
    min-height: 350px;
  }
  
  @media (min-width: 1440px) {
    min-height: 450px;
  }

  @media (min-width: 1920px) {
    min-height: 550px;
    max-width: 1000px;
    margin-left: 0.5%;
  }
  
  @media (min-width: 2560px) {
    min-height: 750px;
    max-width: 1400px;
    margin-left: 0.5%;
  }

  @media (min-width: 3840px) {
    min-height: 1100px;
    max-width: 2000px;
    margin-left: 0.5%;
  }
`;

const TimeEstimate = styled.div`
  font-style: italic;
  color: #999;
  margin-top: 95px;
  margin-bottom: 24px;
  text-decoration: underline;

   @media (min-width: 768px) {
    margin-top: 60px;
    margin-bottom: 10px;
    font-size: 0.8rem;
  }
  
  @media (min-width: 1366px) {
    margin-top: 60px;
    margin-bottom: 10px;
    font-size: 0.8rem;
  }

  @media (min-width: 1440px) {
    margin-top: 75px;
    margin-bottom: 15px;
    font-size: 1rem;
  }
  
  @media (min-width: 1920px) {
    margin-top: 95px;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    margin-top: 120px;
    margin-bottom: 30px;
    font-size: 1.4rem;
  }

  @media (min-width: 3840px) {
    margin-top: 160px;
    margin-bottom: 40px;
    font-size: 1.6rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;

  @media (min-width: 768px) {
    gap: 12px;
    margin-top: 4px;
  }
  
  @media (min-width: 1366px) {
    gap: 16px;
    margin-top: 4px;
  }
  
  @media (min-width: 1920px) {
    gap: 20px;
    margin-top: 12px;
  }
  
  @media (min-width: 2560px) {
    gap: 24px;
    margin-top: 16px;
  }

  @media (min-width: 3840px) {
    gap: 30px;
    margin-top: 20px;
  }
`;

const PauseButton = styled.button`
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 40px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3498db;
  }

  @media (min-width: 768px) {
    padding: 10px 32px;
    font-size: 0.9rem;
    border-radius: 4px;
  }
  
  @media (min-width: 1366px) {
    padding: 12px 40px;
    font-size: 1rem;
    border-radius: 4px;
  }
  
  @media (min-width: 1920px) {
    padding: 14px 48px;
    font-size: 1.2rem;
    border-radius: 5px;
  }
  
  @media (min-width: 2560px) {
    padding: 16px 56px;
    font-size: 1.4rem;
    border-radius: 6px;
  }

  @media (min-width: 3840px) {
    padding: 18px 64px;
    font-size: 1.6rem;
    border-radius: 8px;
  }
`;

const StopButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 40px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c0392b;
  }

  @media (min-width: 768px) {
    padding: 10px 32px;
    font-size: 0.9rem;
    border-radius: 4px;
  }
  
  @media (min-width: 1366px) {
    padding: 12px 40px;
    font-size: 1rem;
    border-radius: 4px;
  }
  
  @media (min-width: 1920px) {
    padding: 14px 48px;
    font-size: 1.2rem;
    border-radius: 5px;
  }
  
  @media (min-width: 2560px) {
    padding: 16px 56px;
    font-size: 1.4rem;
    border-radius: 6px;
  }

  @media (min-width: 3840px) {
    padding: 18px 64px;
    font-size: 1.6rem;
    border-radius: 8px;
  }
`;

// Mock data for different flights
const FLIGHT_DATA: Record<string, any> = {
  'DL4890': {
    identifier: 'DL4890',
    make: 'Boeing 737 MAX',
    model: '737-10',
    engines: '2x Turbofans',
    wingspan: '35.9m (117ft 10in)',
    length: '43.8m (143ft 8in)'
  },
  'AA137': {
    identifier: 'AA137',
    make: 'Airbus A320neo',
    model: 'A320-251N',
    engines: '2x LEAP-1A',
    wingspan: '35.8m (117ft 5in)',
    length: '37.6m (123ft 3in)'
  }
};

interface InspectionStage3Props {
  flightId: string;
  inspectionType: string;
  inspectionName: string;
  flightData: any;
}

const InspectionStage3: React.FC<InspectionStage3Props> = ({
  flightId,
  inspectionType,
  inspectionName,
  flightData
}) => {
  const navigate = useNavigate();
  const { selectedTeam, teams, selectTeam } = useAuth();
  const [showStage4, setShowStage4] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  
  // Format inspection name to remove the last word
  const formatInspectionName = (name: string) => {
    const lastSpaceIndex = name.lastIndexOf(' ');
    return lastSpaceIndex === -1 ? name : name.substring(0, lastSpaceIndex);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStage4(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const flight = flightData || FLIGHT_DATA[flightId] || FLIGHT_DATA['DL4890'];
  
  const handleBack = () => {
    navigate('/inspections');
  };
  
  const processingSteps = [
    {
      title: 'Preparation:',
      steps: [
        'Initiate and Prepare Hardware',
        'Check Aircraft & its placement'
      ]
    },
    {
      title: 'Inspection:',
      steps: [
        'Start Inspection',
        'Inspect by Zones (24 zones)',
        'Complete Inspection'
      ]
    },
    {
      title: 'Data Processing:',
      steps: [
        'Process captured data by Zones',
        'Anomaly Identification'
      ]
    },
    {
      title: 'AME Review',
      steps: [
        'Alert AME for Data Review',
        'Cluster defects',
        'Repair Recommendations'
      ]
    },
    {
      title: 'Compliance & Filing:',
      steps: [
        'QA & Compliance Checks',
        'Report Repairs to MRO Technicians',
        'Complete Inspection & Filing'
      ]
    }
  ];

  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };
  
  // Function to handle team selection
  const handleTeamSelect = (teamId: string) => {
    selectTeam(teamId);
    setIsTeamDropdownOpen(false);
  };
  
  if (showStage4) {
    return <InspectionStage4 
      flightId={flightId}
      inspectionType={inspectionType}
      inspectionName={inspectionName}
      flightData={flight}
    />;
  }
  
  return (
    <PageContainer>
      {/* <SideNav> */}
        <SideNavbar 
          activePage="inspections" 
          onNavigate={(view) => navigate(`/introHome`)}
        />
      {/* </SideNav> */}
      
      <MainContainer>
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
          Inspections &gt;<FlightIdentifier>{flight.identifier} <FlightModel>({flight.make} {flight.model})</FlightModel></FlightIdentifier>
        </PageTitle>
        
        <BackButton onClick={handleBack}>
          &lt; {inspectionType}: {formatInspectionName(inspectionName)}
        </BackButton>
        
        <ContentContainer>
          <StepsContainer>
            {processingSteps.map((section, index) => (
              <StepSection key={index} isActive={index === 2}>
                <StepTitle data-number={index + 1} isActive={index === 2}>{section.title}</StepTitle>
                <StepList>
                  {section.steps.map((step, stepIndex) => (
                    <StepItem key={stepIndex} isActive={index === 2}>{step}</StepItem>
                  ))}
                </StepList>
              </StepSection>
            ))}
            
            <TimeEstimate>Run in Background</TimeEstimate>
            
            <ButtonContainer>
              <PauseButton>Pause</PauseButton>
              <StopButton>STOP</StopButton>
            </ButtonContainer>
          </StepsContainer>
          
          <ImageContainer>
            <StageIndicator>
              <StageTitle>Stage 3: Data Processing...90%</StageTitle>
              <StageText>Processing data on zone - 12 out of 24 zones.</StageText>
              <StageText>Anomaly identification...in-progress.</StageText>
            </StageIndicator>
            <AircraftImage>
              <img src={combinedModel} alt="Combined Aircraft Model" />
            </AircraftImage>
          </ImageContainer>
        </ContentContainer>
      </MainContainer>
    </PageContainer>
  );
};

export default InspectionStage3; 