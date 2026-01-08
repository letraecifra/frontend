import { createContext, type ReactNode, useContext, useState } from 'react';

export interface User {
  avatar?: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  user: null | User;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// FIXME: mock user data
const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  createdAt: '2023-01-15T10:00:00Z',
};

export function AuthProvider({ children }: AuthProviderProps): ReactNode {
  const [user, setUser] = useState<null | User>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login(_email: string, _password: string): Promise<void> {
    // Mock login - just set the user
    setUser(mockUser);
    setIsLoggedIn(true);
  }

  function logout(): void {
    setUser(null);
    setIsLoggedIn(false);
  }

  function updateProfile(data: Partial<User>): void {
    if (user) {
      setUser({ ...user, ...data });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
