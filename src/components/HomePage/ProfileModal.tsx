import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { User, Trash2 } from 'lucide-react';
// import { useAuth } from '@/hooks/useAuth'; // 기본 hook 대신 AuthContext 사용해야 함
import { useAuth } from "@/contexts/AuthContext";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user, deleteAccount, isLoading } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const getProviderDisplay = (provider: 'kakao' | 'google') => {
    return provider === 'kakao' ? '카카오' : '구글';
  };

  const getProviderColor = (provider: 'kakao' | 'google') => {
    return provider === 'kakao' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white';
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
    setIsDeleteDialogOpen(false);
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            내 정보 관리
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">이름</label>
              <p className="text-foreground font-medium">{user.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">이메일</label>
              <p className="text-foreground">{user.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">역할</label>
              <Badge variant="secondary" className="mt-1">
                {user.role === 'speaker' ? '발화자' : '게스트'}
              </Badge>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">연결된 계정</label>
              <Badge className={`mt-1 ${getProviderColor(user.provider)}`}>
                {getProviderDisplay(user.provider)} 계정
              </Badge>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="w-full gap-2"
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                  연결 해제 (회원 탈퇴)
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말로 회원 탈퇴하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다. 계정과 관련된 모든 데이터가 영구적으로 삭제됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    회원 탈퇴
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button variant="outline" onClick={onClose} className="w-full">
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};