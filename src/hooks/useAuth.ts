import React, { useState, useEffect, createContext, useContext } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'super_admin' | 'supplier' | 'user';
  supplierId?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const seedUsers: User[] = [
  {
    id: '1',
    name: 'Admin MXS',
    email: 'admin@mxs.com',
    type: 'super_admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Equipamentos Silva',
    email: 'contato@equipamentossilva.com.br',
    type: 'supplier',
    supplierId: '1',
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    name: 'TechSolutions',
    email: 'suporte@techsolutions.com.br',
    type: 'supplier',
    supplierId: '3',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '4',
    name: 'João Silva',
    email: 'joao@email.com',
    type: 'user',
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '5',
    name: 'Maria Santos',
    email: 'maria@email.com',
    type: 'user',
    createdAt: '2024-01-22T00:00:00Z'
  }
];

const userPasswords: Record<string, string> = {
  'admin@mxs.com': 'admin123',
  'contato@equipamentossilva.com.br': 'supplier123',
  'suporte@techsolutions.com.br': 'supplier123',
  'joao@email.com': 'user123',
  'maria@email.com': 'user123'
};

const AUTH_STORAGE_KEY = 'mxs-auth-user';
const USERS_STORAGE_KEY = 'mxs-users';

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!existingUsers) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seedUsers));
    }

    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Invalid stored user data');
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (userPasswords[email] !== password) {
        setIsLoading(false);
        return false;
      }

      const usersData = localStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = usersData ? JSON.parse(usersData) : seedUsers;
      
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return {
    user,
    login,
    logout,
    isLoading
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  return React.createElement(AuthContext.Provider, { value: auth }, children);
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};