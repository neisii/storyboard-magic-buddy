import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogIn, UserPlus, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserFloatingMenuProps {
  onLogin: () => void;
  onProfileClick: () => void;
}

export const UserFloatingMenu = ({ onLogin, onProfileClick }: UserFloatingMenuProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  console.log("user >> " +user);
  console.log("isAuthenticated >> " +isAuthenticated);
  
  const getProviderDisplay = (provider: 'kakao' | 'google') => {
    return provider === 'kakao' ? '카카오' : '구글';
  };

  const getProviderColor = (provider: 'kakao' | 'google') => {
    return provider === 'kakao' ? 'text-yellow-500' : 'text-blue-500';
  };

  const handleLoginClick = () => {
    onLogin();
  };
  
  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 shadow-glow transition-all duration-300 hover:scale-105"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-card/95 backdrop-blur-sm border-border/50 shadow-elegant"
          >
            <div className="px-2 py-1.5 text-sm">
              <div className="font-medium text-foreground">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
              <div className={`text-xs font-medium mt-1 ${getProviderColor(user!.provider)}`}>
                {getProviderDisplay(user!.provider)} 계정
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onProfileClick}
              className="gap-2 cursor-pointer hover:bg-accent/80"
            >
              <Settings className="h-4 w-4" />
              내 정보 관리
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={logout}
              className="gap-2 cursor-pointer hover:bg-accent/80"
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={handleLoginClick}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 shadow-glow transition-all duration-300 hover:scale-105"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      )}
    </div>
  );
};