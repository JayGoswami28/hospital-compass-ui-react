
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Doctor' | 'Receptionist';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth token
    const storedUser = localStorage.getItem('hospital_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // Mock authentication with role-based login
    const credentials = {
      'Admin': { email: 'admin@hospital.com', password: 'admin123', name: 'Dr. Admin' },
      'Doctor': { email: 'doctor@hospital.com', password: 'doctor123', name: 'Dr. Sarah Wilson' },
      'Receptionist': { email: 'receptionist@hospital.com', password: 'reception123', name: 'Lisa Brown' }
    };

    const roleCredentials = credentials[role as keyof typeof credentials];
    
    if (roleCredentials && email === roleCredentials.email && password === roleCredentials.password) {
      const mockUser = {
        id: role === 'Admin' ? '1' : role === 'Doctor' ? '2' : '3',
        name: roleCredentials.name,
        email: roleCredentials.email,
        role: role as 'Admin' | 'Doctor' | 'Receptionist'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('hospital_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hospital_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
