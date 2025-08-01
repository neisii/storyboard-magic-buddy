import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKakaoSignup: () => void;
  onGoogleSignup: () => void;
}

export const SignupModal = ({ isOpen, onClose, onKakaoSignup, onGoogleSignup }: SignupModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-card/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground">회원가입</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Button
            onClick={onKakaoSignup}
            className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-medium h-12 gap-3"
          >
            <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
              <span className="text-[#FEE500] text-xs font-bold">K</span>
            </div>
            카카오로 회원가입
          </Button>
          
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">또는</span>
            <Separator className="flex-1" />
          </div>
          
          <Button
            onClick={onGoogleSignup}
            variant="outline"
            className="w-full h-12 gap-3 border-border/50 hover:bg-accent/50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            구글로 회원가입
          </Button>
          
          <div className="text-center pt-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              취소
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};