import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Search, Plus, Filter } from 'lucide-react';
import { DebateRoomCard, type DebateRoom } from './DebateRoomCard';
import { UserFloatingMenu } from './UserFloatingMenu';
import { JoinModal } from '../DebateRoom/JoinModal';
import { CreateRoomModal } from './CreateRoomModal';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import { ProfileModal } from './ProfileModal';
import { FilterSection, type FilterState } from './FilterSection';
// import { useAuth } from '@/hooks/useAuth';
import { useAuth } from "@/contexts/AuthContext";
import { toast } from 'sonner';

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
  },
  {
    id: '5',
    title: '디지털 미니멀리즘의 필요성',
    description: '스마트폰과 SNS 과의존 시대, 디지털 디톡스의 효과와 한계를 논의합니다.',
    status: 'active',
    participantCount: 5,
    maxParticipants: 12,
    duration: '30분',
    topic: '테크놀로지',
    createdAt: '2024-01-14'
  },
  {
    id: '6',
    title: '전기차 vs 하이브리드차',
    description: '친환경 자동차의 미래, 전기차와 하이브리드차 중 어느 것이 더 현실적인지 토론합니다.',
    status: 'active',
    participantCount: 9,
    maxParticipants: 16,
    duration: '45분',
    topic: '환경과 기술',
    createdAt: '2024-01-13'
  },
  {
    id: '7',
    title: '최저임금 인상의 효과',
    description: '최저임금 인상이 경제와 일자리에 미치는 긍정적/부정적 영향을 분석합니다.',
    status: 'paused',
    participantCount: 7,
    maxParticipants: 14,
    duration: '1시간',
    topic: '경제와 정책',
    createdAt: '2024-01-12'
  },
  {
    id: '8',
    title: '대중교통 무료화 정책',
    description: '대중교통 무료화가 환경과 시민생활에 미치는 영향을 토론합니다.',
    status: 'active',
    participantCount: 11,
    maxParticipants: 18,
    duration: '30분',
    topic: '정책과 사회',
    createdAt: '2024-01-11'
  },
  {
    id: '9',
    title: '메타버스의 미래',
    description: '가상현실과 메타버스 기술이 우리 삶에 가져올 변화와 가능성을 논의합니다.',
    status: 'ended',
    participantCount: 20,
    maxParticipants: 20,
    duration: '1시간 30분',
    topic: '테크놀로지',
    createdAt: '2024-01-10'
  },
  {
    id: '10',
    title: '비건 생활의 현실성',
    description: '환경과 동물보호를 위한 비건 라이프스타일의 장점과 현실적 어려움을 토론합니다.',
    status: 'active',
    participantCount: 4,
    maxParticipants: 10,
    duration: '45분',
    topic: '환경과 윤리',
    createdAt: '2024-01-10'
  },
  {
    id: '11',
    title: '주4일제 근무의 현실성',
    description: '일과 삶의 균형을 위한 주4일제 도입의 효과와 현실적 한계를 논의합니다.',
    status: 'paused',
    participantCount: 8,
    maxParticipants: 15,
    duration: '1시간',
    topic: '노동과 정책',
    createdAt: '2024-01-09'
  },
  {
    id: '12',
    title: '우주 개발의 우선순위',
    description: '지구의 환경 문제 해결 vs 우주 개발, 어느 것이 더 우선되어야 하는지 토론합니다.',
    status: 'active',
    participantCount: 6,
    maxParticipants: 12,
    duration: '45분',
    topic: '과학과 정책',
    createdAt: '2024-01-09'
  }
];

export const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isGuest, login } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<DebateRoom | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    maxParticipants: 999 // 필터 없음 (모든 토론방 표시)
  });

  const filteredRooms = mockRooms.filter(room => {
    // 검색어 필터링
    const matchesSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 상태 필터링
    const matchesStatus = filters.status.length === 0 || filters.status.includes(room.status);
    
    // 참여자 수 필터링
    const matchesParticipants = room.maxParticipants <= filters.maxParticipants;
    
    return matchesSearch && matchesStatus && matchesParticipants;
  });

  const handleRoomClick = (room: DebateRoom) => {
    setSelectedRoom(room);
    setIsJoinModalOpen(true);
  };

  const handleAudienceJoin = (room: DebateRoom) => {
    navigate(`/debate/${room.id}`);
  };

  const handleJoinRoom = () => {
    if (selectedRoom) {
      window.location.href = `/debate/${selectedRoom.id}`;
    }
  };

  const handleCreateRoom = () => {
    if (isGuest) {
      toast.error('토론에 참여하시려면 회원가입 또는 로그인을 해주세요', {
        position: 'top-right',
        style: {
          marginTop: '25vh' // 상단으로부터 2/8 지점 (25%)
        }
      });
      return;
    }
    setIsCreateModalOpen(true);
  };

  const handleCreateRoomSubmit = (roomData: any) => {
    console.log('토론방 생성:', roomData);
    toast.success('토론방이 성공적으로 생성되었습니다!');
    
    // 새로 생성된 토론방 ID (실제로는 서버에서 받아옴)
    const newRoomId = Date.now().toString();
    setTimeout(() => {
      navigate(`/debate/${newRoomId}`);
    }, 1500);
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleFilterToggle = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: [],
      maxParticipants: 999 // 필터 없음
    });
  };

  const handleKakaoLogin = async () => {
    await login('kakao');
    setIsLoginModalOpen(false);
  };

  const handleGoogleLogin = async () => {
    await login('google');
    setIsLoginModalOpen(false);
  };

  const handleKakaoSignup = async () => {
    await login('kakao');
    setIsSignupModalOpen(false);
  };

  const handleGoogleSignup = async () => {
    await login('google');
    setIsSignupModalOpen(false);
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
            
            <Button 
              onClick={handleCreateRoom}
              disabled={isGuest}
              className={`gap-2 shadow-glow ${isGuest ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
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
          <Button 
            variant="outline" 
            className="gap-2 bg-card/50 backdrop-blur-sm border-border/50"
            onClick={handleFilterToggle}
          >
            <Filter className="h-4 w-4" />
            필터
          </Button>
        </div>

        {/* Filter Section */}
        <FilterSection
          isVisible={isFilterVisible}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

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
                onAudienceJoin={() => handleAudienceJoin(room)}
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

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateRoomSubmit}
      />

    </div>
  );
};