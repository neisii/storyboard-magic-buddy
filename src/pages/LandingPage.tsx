import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const LandingPage = () => {
  const liveTopics = [
    {
      id: 1,
      title: "AI 시대, 인간의 창의성은 여전히 중요할까?",
      category: "기술/AI",
      duration: "15분 진행중",
      status: "active",
      participants: ["김", "이", "박", "최", "+2"]
    },
    {
      id: 2,
      title: "원격근무 의무화, 찬성 vs 반대",
      category: "직장/업무",
      duration: "대기중",
      status: "waiting",
      participants: ["정", "한", "윤"]
    },
    {
      id: 3,
      title: "기본소득제도 도입, 현실적일까?",
      category: "정치/사회",
      duration: "5분 진행중",
      status: "active",
      participants: ["송", "강", "조", "신"]
    },
    {
      id: 4,
      title: "Z세대의 소비 패턴, 어떻게 볼 것인가?",
      category: "문화/세대",
      duration: "대기중",
      status: "waiting",
      participants: ["민", "서"]
    }
  ];

  const features = [
    {
      icon: "🤖",
      title: "AI 토론 진행자",
      description: "공정하고 체계적인 토론 진행을 위한 AI 모더레이터가 실시간으로 토론을 이끌어갑니다."
    },
    {
      icon: "⚡",
      title: "즉석 매칭",
      description: "관심있는 주제에 바로 참여하거나, 새로운 주제를 등록하면 자동으로 참여자들을 연결해드립니다."
    },
    {
      icon: "🔍",
      title: "실시간 팩트체킹",
      description: "토론 중 제시되는 정보의 신뢰성을 실시간으로 검증하여 더 정확한 토론이 가능합니다."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">RealTalk</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">토론 참여</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">주제 등록</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">둘러보기</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">가이드</a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost">로그인</Button>
            <Button>회원가입</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          진짜 토론이 시작되는 곳<br />
          <span className="text-primary">RealTalk</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          AI 진행자가 이끄는 실시간 토론에 참여하세요. 관심있는 주제에 바로 합류하거나, 새로운 토론을 시작해보세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="text-lg px-8 py-6">토론 시작하기</Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">둘러보기</Button>
        </div>
      </section>

      {/* Live Topics Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">🔥 지금 인기 토론</h2>
          <p className="text-lg text-muted-foreground">실시간으로 진행되고 있는 토론에 바로 참여해보세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>🏷️ {topic.category}</span>
                      <span>⏱️ {topic.duration}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={topic.status === "active" ? "default" : "secondary"}
                    className={topic.status === "active" ? "bg-debate-active" : "bg-debate-waiting"}
                  >
                    {topic.status === "active" ? "진행중" : "대기중"}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  {topic.participants.map((participant, index) => (
                    <Avatar key={index} className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {participant}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <Button className="w-full">토론 참여하기</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">RealTalk만의 특별함</h2>
            <p className="text-lg text-muted-foreground">AI 기술로 더 나은 토론 경험을 제공합니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;