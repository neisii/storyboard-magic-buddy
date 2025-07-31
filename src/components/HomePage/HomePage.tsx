import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Search, Plus, Filter } from 'lucide-react';
import { DebateRoomCard, type DebateRoom } from './DebateRoomCard';
import { UserFloatingMenu } from './UserFloatingMenu';
import { JoinModal } from '../DebateRoom/JoinModal';

const mockRooms: DebateRoom[] = [
  {
    id: '1',
    title: 'AI의 미래: 인간을 대체할 것인가?',
    description: '인공지능 기술의 발전이 인간의 직업과 사회에 미치는 영향에 대해 토론합니다.',
    status: 'active',
    participantCount: 8,
    maxParticipants: 20,
    duration: '45분',
    topic: '인공지능과 사회',
    createdAt: '2024-01-15'
  },
  {
    id: '2', 
    title: '기후변화 대응: 개인 vs 기업 책임',
    description: '기후변화 해결을 위한 개인의 노력과 기업의 역할 중 어느 것이 더 중요한지 논의합니다.',
    status: 'active',
    participantCount: 12,
    maxParticipants: 15,
    duration: '30분',
    topic: '환경과 사회',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    title: '원격근무 vs 오프라인 근무',
    description: '코로나19 이후 변화된 근무 환경에서 어떤 방식이 더 효율적인지 토론합니다.',
    status: 'paused',
    participantCount: 6,
    maxParticipants: 10,
    duration: '1시간',
    topic: '노동과 생활',
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    title: '교육 시스템의 변화 필요성',
    description: '현재 교육 시스템의 문제점과 개선 방향에 대한 다양한 의견을 나눕니다.',
    status: 'ended',
    participantCount: 15,
    maxParticipants: 15,
    duration: '2시간',
    topic: '교육과 사회',
    createdAt: '2024-01-12'
  }
];

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<DebateRoom | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const filteredRooms = mockRooms.filter(room => 
    room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoomClick = (room: DebateRoom) => {
    if (room.status === 'active') {
      setSelectedRoom(room);
      setIsJoinModalOpen(true);
    }
  };

  const handleJoinRoom = () => {
    if (selectedRoom) {
      window.location.href = `/debate/${selectedRoom.id}`;
    }
  };

  const handleLogin = () => {
    console.log('Login clicked');
    // TODO: Implement login logic
  };

  const handleSignup = () => {
    console.log('Signup clicked');
    // TODO: Implement signup logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b shadow-glow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">토론 플랫폼</h1>
                <p className="text-sm text-muted-foreground">실시간 토론에 참여하세요</p>
              </div>
            </div>
            
            <Button className="gap-2 shadow-glow">
              <Plus className="h-4 w-4" />
              토론방 만들기
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="토론방이나 주제를 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur-sm border-border/50"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-card/50 backdrop-blur-sm border-border/50">
            <Filter className="h-4 w-4" />
            필터
          </Button>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room, index) => (
            <div 
              key={room.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DebateRoomCard 
                room={room} 
                onClick={() => handleRoomClick(room)}
              />
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <Card className="mt-8 bg-card/50 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">검색 결과가 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating User Menu */}
      <UserFloatingMenu onLogin={handleLogin} onSignup={handleSignup} />

      {/* Join Modal */}
      {selectedRoom && (
        <JoinModal
          open={isJoinModalOpen}
          onClose={() => {
            setIsJoinModalOpen(false);
            setSelectedRoom(null);
          }}
          title={selectedRoom.title}
          topic={selectedRoom.topic}
          participantCount={selectedRoom.participantCount}
          onJoinAsAudience={handleJoinRoom}
        />
      )}
    </div>
  );
};