import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #121212;
  padding: 20px;
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  outline: none;
  
  &:focus {
    border-color: #3182ce;
  }
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const RememberMeLabel = styled.label`
  font-size: 0.9rem;
  color: #4a5568;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(to bottom, #2d3748, #1a202c);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: opacity 0.2s;
  opacity: ${props => props.disabled ? 0.7 : 1};
  
  &:hover {
    opacity: ${props => props.disabled ? 0.7 : 0.9};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }
  
  span {
    padding: 0 10px;
    color: #a0aec0;
    font-size: 0.9rem;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: white;
  color: #4a5568;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f7fafc;
  }
`;

const SignInText = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #4a5568;
  margin-top: 16px;
  
  a {
    color: #3182ce;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  margin-bottom: 16px;
  padding: 8px;
  background-color: #fed7d7;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await signup(email, password);
      // Redirect to the home page after successful signup
      navigate('/');
    } catch (error) {
      setError('An error occurred during sign up. Please try again.');
      console.error('Signup error:', error);
    }
  };
  
  return (
    <Container>
      <FormCard>
        <Title>Sign up</Title>
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </FormGroup>
          
          <RememberMeContainer>
            <Checkbox
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <RememberMeLabel htmlFor="remember">Remember me</RememberMeLabel>
          </RememberMeContainer>
          
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </SubmitButton>
        </form>
        
        <SignInText>
          Have an account? <Link to="/signin" style={{ textDecoration: 'underline' }}>Sign in</Link>
        </SignInText>
        
        <Divider><span>or</span></Divider>
        
        <SocialButton type="button" disabled={isLoading}>Sign up with Google</SocialButton>
        <SocialButton type="button" disabled={isLoading}>Sign up with Microsoft</SocialButton>
      </FormCard>
    </Container>
  );
};

export default SignUp;