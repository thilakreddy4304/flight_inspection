import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import InspectionStages from '../InspectionPages/InspectionStages';
// import SimulationProcessing from '../SimulationProcessing/SimulationProcessing';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    width: 100%;
  }
  
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
  margin-bottom: 10px;
  
  // @media (min-width: 768px) {
  //   margin-bottom: 8px;
  // }
  
  // @media (min-width: 1366px) {
  //   margin-bottom: 10px;
  // }
  
  @media (min-width: 1440px) {
    margin-bottom: 12px;
  }

  @media (min-width: 1680px) {
    margin-bottom: 14px;
  }
  
  @media (min-width: 1920px) {
    margin-bottom: 12px;
  }
  
  @media (min-width: 2560px) {
    margin-bottom: 16px;
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 24px;
  }
`;

const FlightIdentifier = styled.span`
  margin-left: 12px;
  
  // @media (min-width: 768px) {
  //   margin-left: 10px;
  //   font-size: 0.9rem;
  // }
  
  // @media (min-width: 1366px) {
  //   margin-left: 12px;
  //   font-size: 1rem;
  // }
  
  @media (min-width: 1440px) {
    margin-left: 12px;
    font-size: 1.5rem;
  }

  @media (min-width: 1680px) {
    margin-left: 14px;
    font-size: 1.6rem;
  }
  
  @media (min-width: 1920px) {
    margin-left: 14px;
    font-size: 2rem;
  
  @media (min-width: 2560px) {
    margin-left: 18px;
    font-size: 2.4rem;
  }
  
  @media (min-width: 3840px) {
    margin-left: 24px;
    font-size: 3.2rem;
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
  
  // @media (min-width: 768px) {
  //   padding: 4px 8px;
  //   font-size: 0.8rem;
  //   gap: 6px;
  // }
  
  // @media (min-width: 1366px) {
  //   padding: 6px 10px;
  //   font-size: 0.9rem;
  //   gap: 8px;
  // }

  @media (min-width: 1440px) {
    padding: 8px 12px;
    font-size: 1rem;
    gap: 10px;
  }

  @media (min-width: 1680px) {
    padding: 8px 12px;
    font-size: 1.1rem;
    gap: 12px;
  }
  
  @media (min-width: 1920px) {
    padding: 8px 12px;
    font-size: 1.2rem;
    gap: 14px;
  }

  @media (min-width: 2560px) {
    padding: 10px 16px;
    font-size: 1.3rem;
    gap: 16px;
  }
  
  @media (min-width: 3840px) {
    padding: 14px 22px;
    font-size: 1.6rem;
    gap: 16px;
  }
`;

const TeamSelectorIcon = styled.span`
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  
  // @media (min-width: 768px) {
  //   font-size: 0.7rem;
    
  //   svg {
  //     width: 20px;
  //     height: 20px;
  //   }
  // }
  
  // @media (min-width: 1366px) {
  //   font-size: 0.8rem;
    
  //   svg {
  //     width: 22px;
  //     height: 22px;
  //   }
  // }


  @media (min-width: 1440px) {
    font-size: 0.7rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (min-width: 1680px) {
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
    font-size: 1rem;
    
    svg {
      width: 30px;
      height: 32px;
    }
  }
  
  @media (min-width: 3840px) {
    font-size: 1.4rem;
    
    svg {
      width: 38px;
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
  
  // @media (min-width: 768px) {
  //   border-radius: 4px;
  //   margin-top: 4px;
  // }
  
  // @media (min-width: 1366px) {
  //   border-radius: 5px;
  //   margin-top: 5px;
  // }

  @media (min-width: 1440px) {
    border-radius: 5px;
    margin-top: 5px;
  }

  @media (min-width: 1680px) {
    border-radius: 6px;
    margin-top: 6px;
  }

  @media (min-width: 1920px) {
    border-radius: 6px;
    margin-top: 6px;
  }
  
  @media (min-width: 2560px) {
    border-radius: 8px;
    margin-top: 8px;
  }
  
  @media (min-width: 3840px) {
    border-radius: 12px;
    margin-top: 12px;
  }
`;

const TeamOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  // @media (min-width: 768px) {
  //   padding: 6px 12px;
  //   font-size: 0.8rem;
  // }
  
  // @media (min-width: 1366px) {
  //   padding: 8px 14px;
  //   font-size: 0.9rem;
  // }

  @media (min-width: 1440px) {
    padding: 8px 14px;
    font-size: 1rem;
  }

  @media (min-width: 1680px) {
    padding: 8px 16px;
    font-size: 1.1rem;
  }

  
  @media (min-width: 1920px) {
    padding: 10px 16px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 2560px) {
    padding: 12px 20px;
    font-size: 1.3rem;
  }
  
  @media (min-width: 3840px) {
    padding: 16px 28px;
    font-size: 1.6rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  
  // @media (min-width: 768px) {
  //   font-size: 1.4rem;
  //   margin: 0 0 6px 0;
  // }
  
  // @media (min-width: 1366px) {
  //   font-size: 1.8rem;
  //   margin: 0 0 8px 0;
  // }

  @media (min-width: 1440px) {
    font-size: 1.5rem;
    margin: 0 0 10px 0;
  }

  @media (min-width: 1680px) {
    font-size: 1.6rem;
    margin: 0 0 12px 0;
  }

  
  @media (min-width: 1920px) {
    font-size: 2rem;
    margin: 0 0 10px 0;
  }
  
  @media (min-width: 2560px) {
    font-size: 2.4rem;
    margin: 0 0 12px 0;
  }
  
  @media (min-width: 3840px) {
    font-size: 3.2rem;
    margin: 0 0 16px 0;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;

  &:hover {
    color: white;
  }
  
  // @media (min-width: 768px) {
  //   font-size: 1.2rem;
  //   margin-bottom: 12px;
  //   gap: 6px;
  // }
  
  // @media (min-width: 1366px) {
  //   font-size: 1.4rem;
  //   margin-bottom: 16px;
  //   gap: 8px;
  // }
  
  @media (min-width: 1440px) {
    font-size: 1.2rem;
    margin-bottom: 12px;
    gap: 6px;
  }

  @media (min-width: 1680px) {
    font-size: 1.3rem;
    margin-bottom: 14px;
    gap: 8px;
  }

  @media (min-width: 1920px) {
    font-size: 1.6rem;
    margin-bottom: 20px;
    gap: 8px;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.8rem;
    margin-bottom: 24px;
    gap: 10px;
  }
  
  @media (min-width: 3840px) {
    font-size: 2.4rem;
    margin-bottom: 32px;
    gap: 12px;
  }
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  
  // @media (min-width: 768px) {
  //   gap: 6px;
  //   margin-bottom: 24px;
  // }
  
  // @media (min-width: 1366px) {
  //   gap: 8px;
  //   margin-bottom: 28px;
  // }
  
  @media (min-width: 1920px) {
    gap: 10px;
    margin-bottom: 32px;
  }
  
  @media (min-width: 2560px) {
    gap: 12px;
    margin-bottom: 36px;
  }
  
  @media (min-width: 3840px) {
    gap: 16px;
    margin-bottom: 48px;
  }
`;

const ReportTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  
  // @media (min-width: 768px) {
  //   font-size: 1.2rem;
  // }
  
  // @media (min-width: 1366px) {
  //   font-size: 1.4rem;
  // }

  @media (min-width: 1440px) {
    font-size: 1.3rem;
  }

  @media (min-width: 1680px) {
    font-size: 1.4rem;
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
`;

const InfoRow = styled.div`
  margin-bottom: 0;
  margin-top: 0;
  font-size: 1.5rem;
  white-space: nowrap;
  padding-bottom: 1px;

  .label {
    color: #fff;
    margin-bottom: 0;
    font-size: 1rem;
    margin-left: 20px;
  }

  .value {
    margin-left: 5px;
    font-weight: 200;
    margin-bottom: 0;
    font-size: 1rem;
    color: #ccc;
  }
  
  // @media (min-width: 768px) {
  //   font-size: 1.2rem;
  //   padding-bottom: 1px;
    
  //   .label {
  //     font-size: 0.8rem;
  //     margin-left: 16px;
  //   }
    
  //   .value {
  //     font-size: 0.8rem;
  //     margin-left: 4px;
  //   }
  // }
  
  // @media (min-width: 1366px) {
  //   font-size: 1.3rem;
  //   padding-bottom: 1px;
    
  //   .label {
  //     font-size: 0.9rem;
  //     margin-left: 20px;
  //   }
    
  //   .value {
  //     font-size: 0.9rem;
  //     margin-left: 5px;
  //   }
  // }

  @media (min-width: 1440px) {
    font-size: 1.3rem;
    padding-bottom: 2px;

    .label {
      font-size: 1rem;
    }

    .value {
      font-size: 1rem;
    }
  }

  @media (min-width: 1680px) {
    font-size: 1.4rem;
    padding-bottom: 2px;

    .label {
      font-size: 1rem;
    }

    .value {
      font-size: 1rem;
    }
  }

  @media (min-width: 1920px) {
    font-size: 1.4rem;
    padding-bottom: 2px;
    
    .label {
      font-size: 1rem;
    }
    
    .value {
      font-size: 1rem;
    }
  }
  
  @media (min-width: 2560px) {
    font-size: 1.6rem;
    padding-bottom: 2px;
    
    .label {
      font-size: 1.2rem;
    }
    
    .value {
      font-size: 1.2rem;
      margin-left: 6px;
    }
  }
  
  @media (min-width: 3840px) {
    font-size: 2rem;
    padding-bottom: 3px;
    
    .label {
      font-size: 1.6rem;
      margin-left: 30px;
    }
    
    .value {
      font-size: 1.6rem;
      margin-left: 8px;
    }
  }
`;

const ChecklistContainer = styled.div`
  margin-bottom: 10px;
  
  // @media (min-width: 768px) {
  //   margin-bottom: 8px;
  // }
  
  // @media (min-width: 1366px) {
  //   margin-bottom: 10px;
  // }

  @media (min-width: 1440px) {
    margin-bottom: 12px;
  }
  
  @media (min-width: 1680px) {
    margin-bottom: 14px;
  }

  @media (min-width: 1920px) {
    margin-bottom: 16px;
  } 
  
  @media (min-width: 2560px) {
    margin-bottom: 20px;
  }
  
  @media (min-width: 3840px) {
    margin-bottom: 24px;
  }
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 6px;
  margin-left: 20px;
  color: #ccc;
  
  // @media (min-width: 768px) {
  //   gap: 8px;
  //   margin-bottom: 4px;
  //   margin-left: 16px;
  // }
  
  // @media (min-width: 1366px) {
  //   gap: 10px;
  //   margin-bottom: 6px;
  //   margin-left: 20px;
  // }

  @media (min-width: 1440px) {
    gap: 12px;
    margin-bottom: 8px;
  }

  @media (min-width: 1680px) {
    gap: 14px;
    margin-bottom: 10px;
  }
  
  @media (min-width: 1920px) {
    gap: 16px;
    margin-bottom: 12px;
  }
  
  @media (min-width: 2560px) {
    gap: 18px;
    margin-bottom: 14px;
    margin-left: 24px;
  }
  
  @media (min-width: 3840px) {
    gap: 20px;
    margin-bottom: 16px;
    margin-left: 30px;
  }
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  flex-shrink: 0;
  margin-top: 2px;
  
  // @media (min-width: 768px) {
  //   width: 16px;
  //   height: 16px;
  //   margin-top: 1px;
  //   font-size: 0.7rem;
  // }
  
  // @media (min-width: 1366px) {
  //   width: 18px;
  //   height: 18px;
  //   margin-top: 2px;
  //   font-size: 0.8rem;
  // }

  @media (min-width: 1440px) {
    width: 20px;
    height: 20px;
    font-size: 0.9rem;
  }

  @media (min-width: 1680px) {
    width: 22px;
    height: 22px;
    font-size: 1rem;
  }

  @media (min-width: 1920px) {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    font-size: 1.1rem;
  }
  
  @media (min-width: 2560px) {
    width: 28px;
    height: 28px;
    margin-top: 7px;
    font-size: 1.2rem;
  }
  
  @media (min-width: 3840px) {
    width: 32px;
    height: 32px;
    margin-top: 16px;
    font-size: 1.4rem;
  }
`;

const InspectionText = styled.div`
  font-size: 1rem;
  line-height: 1.4;
  
  // @media (min-width: 768px) {
  //   font-size: 0.8rem;
  //   line-height: 1.3;
  // }
  
  // @media (min-width: 1366px) {
  //   font-size: 0.9rem;
  //   line-height: 1.4;
  // }

  @media (min-width: 1440px) {
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (min-width: 1680px) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.2rem;
    line-height: 1.7; 
  }
  
  @media (min-width: 2560px) {
    font-size: 1.4rem;
    line-height: 1.8;
  }
  
  @media (min-width: 3840px) {
    font-size: 2rem;
    line-height: 1.9;
  }
`;

const MetadataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px;
  margin-top: 20px;
  
  // @media (min-width: 768px) {
  //   margin-top: 16px;
  //   gap: 1px;
  // }
  
  // @media (min-width: 1366px) {
  //   margin-top: 20px;
  //   gap: 2px;
  // }

  @media (min-width: 1440px) {
    margin-top: 22px;
    gap: 2px;
  }

  @media (min-width: 1680px) {
    margin-top: 24px;
    gap: 3px;
  }

  @media (min-width: 1920px) {
    margin-top: 24px;
    gap: 3px;
  }
  
  @media (min-width: 2560px) {
    margin-top: 30px;
    gap: 4px;
  }
  
  @media (min-width: 3840px) {
    margin-top: 40px;
    gap: 6px;
  }
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 0;
`;

const DisclaimerContainer = styled.div`
  margin-top: 50px;
  margin-left: 20px;
  
  // @media (min-width: 768px) {
  //   margin-top: 30px;
  //   margin-left: 16px;
  // }
  
  // @media (min-width: 1366px) {
  //   margin-top: 40px;
  //   margin-left: 20px;
  // }
  
  @media (min-width: 1440px) {
    margin-top: 45px;
    margin-left: 22px;
  }

  @media (min-width: 1680px) {
    margin-top: 50px;
    margin-left: 24px;
  }

  @media (min-width: 1920px) {
    margin-top: 55px;
    margin-left: 24px;
  }
  
  @media (min-width: 2560px) {
    margin-top: 60px;
    margin-left: 28px;
  }
  
  @media (min-width: 3840px) {
    margin-top: 80px;
    margin-left: 30px;
  }
`;

const DisclaimerText = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  
  // @media (min-width: 768px) {
  //   font-size: 0.7rem;
  // }
  
  // @media (min-width: 1366px) {
  //   font-size: 0.8rem;
  // }
  
  @media (min-width: 1440px) {
    font-size: 0.9rem;
  }

  @media (min-width: 1680px) { 
    font-size: 1rem;
  }

  @media (min-width: 1920px) {
    font-size: 1.1rem;
  }
  
  @media (min-width: 2560px) {
    font-size: 1.4rem;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.6rem;
  }
`;

const RunButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  justify-content: center;
  float: left;
  display: grid;
  margin-left: 20px;
  width: 120px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #444;
  }
  
  // @media (min-width: 768px) {
  //   border-radius: 4px;
  //   padding: 8px 16px;
  //   margin-top: 16px;
  //   margin-left: 16px;
  //   width: 100px;
  //   font-size: 0.8rem;
  // }
  
  // @media (min-width: 1366px) {
  //   border-radius: 4px;
  //   padding: 10px 20px;
  //   margin-top: 20px;
  //   margin-left: 20px;
  //   width: 110px;
  //   font-size: 0.9rem;
  // }

  @media (min-width: 1440px) {
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 20px;
    width: 110px;
    font-size: 1rem;
  }

  @media (min-width: 1680px) {
    border-radius: 6px;
    padding: 14px 28px;
    margin-top: 30px;
    width: 140px;
    font-size: 1.2rem;
  }

  @media (min-width: 1920px) {
    border-radius: 5px;
    padding: 12px 24px;
    margin-top: 24px;
    width: 120px;
    font-size: 1.4rem;
  }
  
  @media (min-width: 2560px) {
    border-radius: 6px;
    padding: 14px 28px;
    margin-top: 30px;
    margin-left: 24px;
    width: 140px;
    font-size: 1.6rem;
  }
  
  @media (min-width: 3840px) {
    border-radius: 8px;
    padding: 18px 36px;
    margin-top: 40px;
    margin-left: 30px;
    width: 180px;
    font-size: 2rem;
  }
`;

// Inspection report data
const INSPECTION_REPORT_DATA: Record<string, any> = {
  'DL4890': {
    estimated_run_time: '1 hour 30 minutes',
    // estimated_price: '$2,500',
    sensing_assets: '2 units needed',
    compliance_type: 'FAA-mandated',
    Status: 'Qoute Approved'
  },
  'DL1234': {
    estimated_run_time: '1 hour 45 minutes',
    // estimated_price: '$2,800',
    sensing_assets: '2 units needed',
    compliance_type: 'FAA-mandated',
    Status: 'Qoute Approved'
  },
  'DL5678': {
    estimated_run_time: '2 hours 15 minutes',
    // estimated_price: '$3,200',
    sensing_assets: '3 units needed',
    compliance_type: 'FAA-mandated',
    Status: 'Qoute Approved'
  },
  'AA137': {
    estimated_run_time: '2 hours 30 minutes',
    // estimated_price: '$3,500',
    sensing_assets: '3 units needed',
    compliance_type: 'EASA-regulated',
    Status: 'Qoute Approved'
  },
  'UA5432': {
    estimated_run_time: '1 hour 15 minutes',
    // estimated_price: '$2,200',
    sensing_assets: '2 units needed',
    compliance_type: 'FAA-mandated',
    Status: 'Qoute Approved'
  },
  'BA2901': {
    estimated_run_time: '3 hours 45 minutes',
    // estimated_price: '$4,500',
    sensing_assets: '4 units needed',
    compliance_type: 'EASA-regulated',
    Status: 'Qoute Approved'
  },
  'LH7890': {
    estimated_run_time: '2 hours 45 minutes',
    // estimated_price: '$3,800',
    sensing_assets: '3 units needed',
    compliance_type: 'EASA-regulated',
    Status: 'Qoute Approved'
  },
  'FR1234': {
    estimated_run_time: '1 hour 50 minutes',
    // estimated_price: '$2,700',
    sensing_assets: '2 units needed',
    compliance_type: 'EASA-regulated',
    Status: 'Qoute Approved'
  },
  'EK5678': {
    estimated_run_time: '2 hours 20 minutes',
    // estimated_price: '$3,300',
    sensing_assets: '3 units needed',
    compliance_type: 'UAE-GCAA',
    Status: 'Qoute Approved'
  },
  'SQ2345': {
    estimated_run_time: '3 hours 10 minutes',
    // estimated_price: '$4,100',
    sensing_assets: '4 units needed',
    compliance_type: 'CAAS-regulated',
    Status: 'Qoute Approved'
  },
  'JL8765': {
    estimated_run_time: '1 hour 40 minutes',
    // estimated_price: '$2,600',
    sensing_assets: '2 units needed',
    compliance_type: 'JCAB-mandated',
    Status: 'Qoute Approved'
  },
  'QF3456': {
    estimated_run_time: '2 hours 50 minutes',
    // estimated_price: '$3,900',
    sensing_assets: '3 units needed',
    compliance_type: 'CASA-regulated',
    Status: 'Qoute Approved'
  },
  'AF7654': {
    estimated_run_time: '2 hours 10 minutes',
    // estimated_price: '$3,100',
    sensing_assets: '3 units needed',
    compliance_type: 'EASA-regulated',
    Status: 'Qoute Approved'
  },
  'KL2109': {
    estimated_run_time: '1 hour 55 minutes',
    // estimated_price: '$2,900',
    sensing_assets: '2 units needed',
    compliance_type: 'EASA-regulated',
    Status: 'Qoute Approved'
  },
  'NH8901': {
    estimated_run_time: '2 hours 25 minutes',
    // estimated_price: '$3,400',
    sensing_assets: '3 units needed',
    compliance_type: 'JCAB-mandated',
    Status: 'Qoute Approved'
  },
  'CX6543': {
    estimated_run_time: '3 hours 05 minutes',
    // estimated_price: '$4,000',
    sensing_assets: '4 units needed',
    compliance_type: 'HKCAD-regulated',
    Status: 'Qoute Approved'
  },
  'EY9876': {
    estimated_run_time: '2 hours 40 minutes',
    // estimated_price: '$3,700',
    sensing_assets: '3 units needed',
    compliance_type: 'UAE-GCAA',
    Status: 'Qoute Approved'
  },
  'TK5432': {
    estimated_run_time: '1 hour 35 minutes',
    // estimated_price: '$2,550',
    sensing_assets: '2 units needed',
    compliance_type: 'DGCA-mandated',
    Status: 'Qoute Approved'
  },
  'AC3210': {
    estimated_run_time: '2 hours 05 minutes',
    // estimated_price: '$3,050',
    sensing_assets: '3 units needed',
    compliance_type: 'Transport Canada',
    Status: 'Qoute Approved'
  },
  'SU7654': {
    estimated_run_time: '3 hours 20 minutes',
    // estimated_price: '$4,200',
    sensing_assets: '4 units needed',
    compliance_type: 'Rosaviatsia',
    Status: 'Qoute Approved'
  },
  'OS8765': {
    estimated_run_time: '1 hour 25 minutes',
    // estimated_price: '$2,450',
    sensing_assets: '2 units needed',
    compliance_type: 'EASA-regulated',
    Status: 'Qoute Approved'
  },
  'AZ2345': {
    estimated_run_time: '2 hours 35 minutes',
    // estimated_price: '$3,600',
    sensing_assets: '3 units needed',
    compliance_type: 'EASA-regulated',
    Status: 'Qoute Approved'
  },
  'IB6789': {
    estimated_run_time: '3 hours 15 minutes',
    // estimated_price: '$4,150',
    sensing_assets: '4 units needed',
    compliance_type: 'EASA-regulated',
    Status: 'Qoute Approved'
  },
  'BR1357': {
    estimated_run_time: '2 hours 00 minutes',
    // estimated_price: '$3,000',
    sensing_assets: '3 units needed',
    compliance_type: 'CAA-mandated',
    Status: 'Qoute Approved'
  }
};

interface InspectionStepsProps {
  inspectionName: string;
  inspectionType: string;
  onBack: () => void;
  flight: {
    identifier: string;
    make: string;
    model: string;
    [key: string]: any;
  };
}

const InspectionSteps: React.FC<InspectionStepsProps> = ({ 
  inspectionName,
  inspectionType,
  onBack,
  flight
}) => {
  const { selectedTeam, teams, selectTeam } = useAuth();
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
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
  
  // Get report data for the current flight, or use default
  const reportData = INSPECTION_REPORT_DATA[flight.identifier];
  const formatInspectionName = (name: string) => {
    const lastSpaceIndex = name.lastIndexOf(' ');
    return lastSpaceIndex === -1 ? name : name.substring(0, lastSpaceIndex);
  };
  
  const checklistItems = [
    'Visual Inspection - Check for corrosion, deformation, damage or wear.',
    'Visual Inspection on all exterior panels, wings, tail, engines and doors.',
    'Fluid Leak checks',
    'Engine and Engine support inspection',
    'Engine Blade Inspection',
    'Engine Thermal Analysis',
    'Landing Gear Inspection',
    'Control Surface Inspection',
    'Nose Damage Inspection'
  ];
  
  const handleRunClick = () => {
    // Navigate to the inspection stages page with all data in state
    navigate('/InspectionPages', { 
      state: { 
        flightId: flight.identifier,
        inspectionType: inspectionType,
        inspectionName: inspectionName,
        flightData: flight
      } 
    });
  };
  
  // if (isRunning) {
  //   return (
  //     <InspectionStages 
  //       flight={flight}
  //       inspectionName={inspectionName}
  //       inspectionType={inspectionType}
  //       onBack={() => setIsRunning(false)}
  //     />
  //   );
  // }
  
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
      
      <BackButton onClick={onBack}>
          &lt; {inspectionType}: {formatInspectionName(inspectionName)}
        </BackButton>
      
      <ChecklistContainer>
        {checklistItems.map((item, index) => (
          <ChecklistItem key={index}>
            <CheckIcon>✓</CheckIcon>
            <InspectionText>{item}</InspectionText>
          </ChecklistItem>
        ))}
      </ChecklistContainer> 
      
      <MetadataContainer>
        <MetadataItem>
          <InfoRow>
            <span className="label">Estimated Run Time:</span>
            <span className="value">{reportData.estimated_run_time}</span>
          </InfoRow>
        </MetadataItem>
        
        {/* <MetadataItem>
          <InfoRow>
            <span className="label">Estimated Price:</span>
            <span className="value">{reportData.estimated_price}</span>
          </InfoRow>
        </MetadataItem> */}
        
        <MetadataItem>
          <InfoRow>
            <span className="label">Sensing Assets:</span>
            <span className="value">{reportData.sensing_assets}</span>
          </InfoRow>
        </MetadataItem>
        
        <MetadataItem>
          <InfoRow>
            <span className="label">Compliance Type:</span>
            <span className="value">{reportData.compliance_type}</span>
          </InfoRow>
        </MetadataItem>

        <MetadataItem>
          <InfoRow>
            <span className="label">Status:</span>
            <span className="value">{reportData.Status}</span>
          </InfoRow>
        </MetadataItem>
      </MetadataContainer>

      <DisclaimerContainer>
        <DisclaimerText>
          *Recommended time based on allocated sensing assets.
        </DisclaimerText>
      </DisclaimerContainer>
      
      <RunButton onClick={handleRunClick}>Run</RunButton>
    </Container>
  );
};

export default InspectionSteps; 