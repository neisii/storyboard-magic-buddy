import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageCircle, Mic, Eye } from 'lucide-react';

interface StoryboardPanel {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const Index = () => {
  const [panels] = useState<StoryboardPanel[]>([
    {
      id: '1',
      title: '관중이 토론방 링크 클릭',
      description: '초대링크나 공유된 토론방 URL을 클릭하여 접속을 시도합니다. 로딩 화면이 표시됩니다.'
    },
    {
      id: '2', 
      title: '토론방 입장 확인',
      description: '토론방 제목, 현재 참여자 수, 토론 주제가 표시된 입장 확인 모달이 나타납니다. "관중으로 참여" 버튼을 클릭합니다.'
    },
    {
      id: '3',
      title: '초기 화면 로딩',
      description: '토론방 레이아웃이 구성됩니다. 상단바, 좌측 발언자 영역, 우측 관중 영역이 로딩되며 실시간 연결이 설정됩니다.'
    },
    {
      id: '4',
      title: '완성된 토론방 화면',
      description: '상단바: 토론 제목, 참여자 수, 나가기 버튼\n좌측: 현재 발언자와 발언 이력\n우측: 관중 목록과 채팅창\n하단: 손들기/채팅 입력 영역'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b shadow-glow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">토론방 스토리보드</h1>
                <p className="text-sm text-muted-foreground">관중 입장 시나리오</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>4개 패널</span>
            </div>
          </div>
        </div>
      </div>

      {/* Storyboard Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {panels.map((panel, index) => (
            <Card key={panel.id} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{panel.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Mockup Screen */}
                <div className="mb-4 aspect-video bg-gradient-to-br from-secondary/30 to-accent/20 rounded-lg border-2 border-dashed border-border/30 flex items-center justify-center relative overflow-hidden group-hover:border-primary/30 transition-colors">
                  {index === 3 ? (
                    // Final screen mockup
                    <div className="w-full h-full p-3 text-xs">
                      {/* Top bar */}
                      <div className="bg-primary/20 rounded h-6 mb-2 flex items-center px-2">
                        <div className="w-2 h-2 bg-primary/60 rounded-full mr-2"></div>
                        <div className="text-primary/80">토론: AI의 미래</div>
                        <div className="ml-auto flex gap-1">
                          <Users className="h-3 w-3" />
                          <span>12명</span>
                        </div>
                      </div>
                      {/* Main content */}
                      <div className="flex gap-2 h-32">
                        {/* Left: Speaker area */}
                        <div className="flex-1 bg-accent/20 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Mic className="h-3 w-3 text-primary" />
                            <span className="text-primary font-medium">발언자</span>
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 bg-muted rounded"></div>
                            <div className="h-2 bg-muted rounded w-3/4"></div>
                            <div className="h-2 bg-muted rounded w-1/2"></div>
                          </div>
                        </div>
                        {/* Right: Audience area */}
                        <div className="flex-1 bg-secondary/20 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Eye className="h-3 w-3 text-secondary-foreground" />
                            <span className="font-medium">관중 (8명)</span>
                          </div>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-muted/60 rounded w-3/4"></div>
                            <div className="h-1.5 bg-muted/60 rounded w-2/3"></div>
                            <div className="h-1.5 bg-muted/60 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        {index === 0 && <MessageCircle className="h-6 w-6 text-primary" />}
                        {index === 1 && <Users className="h-6 w-6 text-primary" />}
                        {index === 2 && <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />}
                      </div>
                      <p className="text-sm text-muted-foreground">화면 {index + 1}</p>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {panel.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">시나리오 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              관중이 토론방에 입장하는 전체 플로우를 4단계로 구성했습니다. 
              초기 접속부터 완성된 토론방 화면까지의 사용자 경험을 시각화하여 
              개발 시 참고할 수 있도록 설계했습니다.
            </p>
            <Button asChild className="gap-2">
              <a href="/debate/sample-room">
                <MessageCircle className="h-4 w-4" />
                실제 토론방 체험하기
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
