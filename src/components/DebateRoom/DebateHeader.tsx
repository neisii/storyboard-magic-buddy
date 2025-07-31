import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, LogOut, Clock } from 'lucide-react';

interface DebateHeaderProps {
  title: string;
  participantCount: number;
  onLeaveRoom: () => void;
}

export const DebateHeader = ({ title, participantCount, onLeaveRoom }: DebateHeaderProps) => {
  return (
    <div className="bg-card/80 backdrop-blur-sm border-b shadow-glow sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 토론 정보 */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  진행 중
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{participantCount}명 참여</span>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onLeaveRoom}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              나가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};