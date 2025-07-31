import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogIn, UserPlus, User } from 'lucide-react';

interface UserFloatingMenuProps {
  onLogin: () => void;
  onSignup: () => void;
}

export const UserFloatingMenu = ({ onLogin, onSignup }: UserFloatingMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="fixed top-6 right-6 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
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
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="w-48 bg-card/95 backdrop-blur-sm border-border/50 shadow-elegant"
        >
          <DropdownMenuItem 
            onClick={onLogin}
            className="gap-2 cursor-pointer hover:bg-accent/80"
          >
            <LogIn className="h-4 w-4" />
            로그인
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={onSignup}
            className="gap-2 cursor-pointer hover:bg-accent/80"
          >
            <UserPlus className="h-4 w-4" />
            회원가입
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};