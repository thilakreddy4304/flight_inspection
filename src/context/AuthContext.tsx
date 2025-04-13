import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface Team {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  selectedTeam: Team | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  selectTeam: (teamId: string) => void;
  hasSelectedTeam: boolean;
  teams: Team[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Mock team data - would come from API in a real app
  const teams: Team[] = [
    { id: '1', name: 'Boeing Everett MRO' },
    { id: '2', name: 'Boeing Hanger, SFO' },
    { id: '3', name: 'Boeing Hanger, OAK' },
    { id: '4', name: 'Boeing Hanger, ORD' },
  ];

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // In a real app, you would validate the token with the server
          // For now, we'll just simulate a logged-in user
          const userData: User = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'admin',
          };
          setUser(userData);
          
          // Check for selected team
          const savedTeamId = localStorage.getItem('selectedTeam');
          if (savedTeamId) {
            const team = teams.find(t => t.id === savedTeamId) || null;
            setSelectedTeam(team);
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('selectedTeam');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would call your API
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      const userData: User = {
        id: '1',
        name: 'Test User',
        email,
        role: 'admin',
      };
      
      // Store the token in localStorage
      localStorage.setItem('auth_token', 'sample_token');
      
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    // In a real app, this would call your API
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful signup
      const userData: User = {
        id: '1',
        name: 'Test User',
        email,
        role: 'admin',
      };
      
      // Store the token in localStorage
      localStorage.setItem('auth_token', 'sample_token');
      
      setUser(userData);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user data and remove token
    localStorage.removeItem('auth_token');
    localStorage.removeItem('selectedTeam');
    setUser(null);
    setSelectedTeam(null);
  };

  const selectTeam = (teamId: string) => {
    const team = teams.find(t => t.id === teamId) || null;
    if (team) {
      setSelectedTeam(team);
      localStorage.setItem('selectedTeam', teamId);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        selectedTeam,
        hasSelectedTeam: !!selectedTeam,
        teams,
        login,
        signup,
        logout,
        selectTeam,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 