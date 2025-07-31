import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, Play, Pause, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DebateStatus = 'active' | 'ended' | 'paused';

export interface DebateRoom {
  id: string;
  title: string;
  description: string;
  status: DebateStatus;
  participantCount: number;
  maxParticipants: number;
  duration: string;
  topic: string;
  createdAt: string;
}

interface DebateRoomCardProps {
  room: DebateRoom;
  onClick: () => void;
  onAudienceJoin: () => void;
}

const statusConfig = {
  active: {
    bgClass: 'bg-debate-active',
    textClass: 'text-debate-active-foreground',
    borderClass: 'border-debate-active/20',
    icon: Play,
    label: '진행중'
  },
  ended: {
    bgClass: 'bg-debate-ended',
    textClass: 'text-debate-ended-foreground', 
    borderClass: 'border-debate-ended/20',
    icon: Square,
    label: '종료됨'
  },
  paused: {
    bgClass: 'bg-debate-paused',
    textClass: 'text-debate-paused-foreground',
    borderClass: 'border-debate-paused/20', 
    icon: Pause,
    label: '일시정지'
  }
};

export const DebateRoomCard = ({ room, onClick, onAudienceJoin }: DebateRoomCardProps) => {
  const config = statusConfig[room.status];
  const StatusIcon = config.icon;
  const isClickable = room.status === 'active';

  return (
    <Card 
      className={cn(
        "group transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm",
        "hover:shadow-elegant animate-fade-in",
        !isClickable && "opacity-75"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight line-clamp-2">
              {room.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
              {room.topic}
            </p>
          </div>
          <Badge 
            className={cn(
              "ml-3 gap-1.5 px-2.5 py-1",
              config.bgClass,
              config.textClass
            )}
          >
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {room.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{room.participantCount}/{room.maxParticipants}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{room.duration}</span>
            </div>
          </div>
          
          <div className="text-xs">
            {new Date(room.createdAt).toLocaleDateString('ko-KR')}
          </div>
        </div>
        
        {isClickable && (
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onAudienceJoin();
              }}
            >
              관중으로 참여하기
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              발화자로 참여하기
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};