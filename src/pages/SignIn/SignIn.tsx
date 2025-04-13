import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

const ForgotPassword = styled.div`
  text-align: right;
  
  a {
    color: #3182ce;
    text-decoration: none;
    font-size: 0.9rem;
    
    &:hover {
      text-decoration: underline;
    }
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

const PasswordContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const PasswordLabel = styled.label`
  font-size: 1rem;
  color: #333;
`;

const SignUpText = styled.div`
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

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  
  // Get the page they were trying to visit before being redirected to login
  const { from } = location.state || { from: { pathname: "/" } };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(email, password);
      // Redirect to the page they were trying to visit
      navigate(from);
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    }
  };
  
  return (
    <Container>
      <FormCard>
        <Title>Sign in</Title>
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
            <PasswordContainer>
              <PasswordLabel htmlFor="password">Password</PasswordLabel>
              <ForgotPassword>
                <Link to="/forgot-password" style={{ textDecoration: 'underline' }}>Forgot your password?</Link>
              </ForgotPassword>
            </PasswordContainer>
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
            {isLoading ? 'Signing in...' : 'Sign in'}
          </SubmitButton>
        </form>
        
        <SignUpText>
          Don't have an account? <Link to="/signup" style={{ textDecoration: 'underline' }}>Sign up</Link>
        </SignUpText>
        
        <Divider><span>or</span></Divider>
        
        <SocialButton type="button" disabled={isLoading}>Sign in with Google</SocialButton>
        <SocialButton type="button" disabled={isLoading}>Sign in with Microsoft</SocialButton>
      </FormCard>
    </Container>
  );
};

export default SignIn;