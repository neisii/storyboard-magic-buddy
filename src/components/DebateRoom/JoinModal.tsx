import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Clock } from 'lucide-react';

interface JoinModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  topic: string;
  participantCount: number;
  isLoading?: boolean;
  onJoinAsAudience: () => void;
  onJoinAsSpeaker: () => void;
}

export const JoinModal = ({ 
  open, 
  onClose,
  title, 
  topic, 
  participantCount, 
  isLoading = false, 
  onJoinAsAudience,
  onJoinAsSpeaker
}: JoinModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl">토론방 입장</DialogTitle>
          <DialogDescription className="text-center">
            실시간 토론에 참여하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">토론방 정보를 불러오는 중...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 토론방 정보 */}
            <div className="space-y-3 p-4 bg-card rounded-lg border">
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{participantCount}명 참여 중</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>진행 중</span>
                </div>
              </div>
            </div>

            {/* 입장 버튼 */}
            <div className="space-y-3">
              <Button 
                onClick={onJoinAsSpeaker} 
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                발화자로 참여하기
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                발화자로 참여하여 열정을 불태워보세요!
              </p>
              
              <Button 
                onClick={onJoinAsAudience} 
                variant="outline"
                className="w-full"
                size="lg"
              >
                관중으로 참여하기
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                관중으로 참여하여 토론을 시청하고 채팅에 참여할 수 있습니다
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};