import React from 'react';
import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isLoading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
  
  /* Size styles */
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '6px 12px';
      case 'large':
        return '12px 24px';
      default:
        return '8px 16px';
    }
  }};
  
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.85rem';
      case 'large':
        return '1.1rem';
      default:
        return '1rem';
    }
  }};
  
  /* Variant styles */
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return '#e2e8f0';
      case 'danger':
        return '#e53e3e';
      case 'success':
        return '#38a169';
      default:
        return '#0070f3';
    }
  }};
  
  color: ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return '#2d3748';
      default:
        return '#ffffff';
    }
  }};
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Full width style */
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'auto')};
  
  /* Loading state */
  position: relative;
  
  ${({ isLoading }) =>
    isLoading &&
    `
    color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isFullWidth = false,
  isLoading = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      isLoading={isLoading}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 