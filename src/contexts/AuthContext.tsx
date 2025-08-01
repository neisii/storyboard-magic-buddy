import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  provider: 'kakao' | 'google';
  avatar?: string;
  role: 'speaker' | 'guest';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  login: (provider: 'kakao' | 'google') => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (provider: 'kakao' | 'google') => {
    setIsLoading(true);
    // 실제로는 Supabase auth 로직
    setTimeout(() => {
      console.log("setTimeout");
      setUser({
        id: '1',
        name: provider === 'kakao' ? '카카오 사용자' : '구글 사용자',
        email: `user@${provider}.com`,
        provider,
        avatar: undefined,
        role: 'speaker'
      });
      setIsLoading(false);
    }, 1000);
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    // 실제로는 Supabase에서 계정 삭제 로직
    setTimeout(() => {
      setUser(null);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isGuest = !user;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isGuest,
      isLoading,
      login,
      logout,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};