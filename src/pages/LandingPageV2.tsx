import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";

const LandingPageV2 = () => {
  const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "tech", name: "기술/AI", icon: "💻" },
    { id: "work", name: "직장/업무", icon: "💼" },
    { id: "politics", name: "정치/사회", icon: "🏛️" },
    { id: "culture", name: "문화/세대", icon: "🎭" },
    { id: "economy", name: "경제/금융", icon: "💰" },
    { id: "education", name: "교육/학습", icon: "📚" },
    { id: "health", name: "건강/의료", icon: "⚕️" },
    { id: "environment", name: "환경/기후", icon: "🌱" },
  ];

  const liveTopics = [
    {
      title: "AI 시대, 인간의 창의성은 여전히 중요할까?",
      category: "기술/AI",
      duration: "15분 진행중",
      status: "진행중",
      participants: ["김", "이", "박", "최", "+2"],
      statusColor: "bg-emerald-500"
    },
    {
      title: "원격근무 의무화, 찬성 vs 반대",
      category: "직장/업무", 
      duration: "대기중",
      status: "대기중",
      participants: ["정", "한", "윤"],
      statusColor: "bg-amber-500"
    },
    {
      title: "기본소득제도 도입, 현실적일까?",
      category: "정치/사회",
      duration: "5분 진행중", 
      status: "진행중",
      participants: ["송", "강", "조", "신"],
      statusColor: "bg-emerald-500"
    },
    {
      title: "Z세대의 소비 패턴, 어떻게 볼 것인가?",
      category: "문화/세대",
      duration: "대기중",
      status: "대기중", 
      participants: ["민", "서"],
      statusColor: "bg-amber-500"
    }
  ];

  const features = [
    {
      icon: "AI",
      title: "AI 토론 진행자",
      description: "공정하고 체계적인 토론 진행을 위한 AI 모더레이터가 실시간으로 토론을 이끌어갑니다."
    },
    {
      icon: "매칭", 
      title: "즉석 매칭",
      description: "관심있는 주제에 바로 참여하거나, 새로운 주제를 등록하면 자동으로 참여자들을 연결해드립니다."
    },
    {
      icon: "검증",
      title: "실시간 팩트체킹",
      description: "토론 중 제시되는 정보의 신뢰성을 실시간으로 검증하여 더 정확한 토론이 가능합니다."
    }
  ];

  const handleStartMatching = () => {
    if (selectedCategory) {
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;
      alert(`${categoryName} 카테고리로 매칭을 시작합니다!`);
      setIsMatchingModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const closeModal = () => {
    setIsMatchingModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            RealTalk
          </div>
          
          <ul className="hidden md:flex items-center gap-8">
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">토론 참여</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">주제 등록</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">커뮤니티</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">가이드</a></li>
          </ul>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-muted-foreground">
              로그인
            </Button>
            <Button>
              회원가입
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          진짜 토론이 시작되는 곳<br />
          <span className="text-primary">RealTalk</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          AI 진행자가 이끄는 실시간 토론에 참여하세요. 관심있는 주제에 바로 합류하거나, 새로운 토론을 시작해보세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-15">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg font-semibold hover:transform hover:-translate-y-1 transition-all duration-200"
            onClick={() => setIsMatchingModalOpen(true)}
          >
            토론 시작하기
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            둘러보기
          </Button>
        </div>
      </section>

      {/* Live Topics Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">지금 인기 토론</h2>
          <p className="text-lg text-muted-foreground">실시간으로 진행되고 있는 토론에 바로 참여해보세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveTopics.map((topic, index) => (
            <Card key={index} className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{topic.title}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                      <span>{topic.category}</span>
                      <span>{topic.duration}</span>
                    </div>
                  </div>
                  <Badge className={`${topic.statusColor} text-white text-xs`}>
                    {topic.status}
                  </Badge>
                </div>
                
                <div className="flex gap-2 mb-4">
                  {topic.participants.map((participant, idx) => (
                    <Avatar key={idx} className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-xs">
                        {participant}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                
                <Button className="w-full">토론 참여하기</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">RealTalk만의 특별함</h2>
            <p className="text-lg text-muted-foreground">AI 기술로 더 나은 토론 경험을 제공합니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-bold">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matching Modal */}
      <Dialog open={isMatchingModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">토론 매칭 시작</DialogTitle>
            <p className="text-center text-muted-foreground">어떤 주제로 토론하고 싶으신가요?</p>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-4">관심 카테고리를 선택해주세요</label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all text-center hover:border-primary hover:bg-accent ${
                      selectedCategory === category.id 
                        ? 'border-primary bg-accent' 
                        : 'border-border'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="text-xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={closeModal}
              >
                취소
              </Button>
              <Button 
                className="flex-1"
                disabled={!selectedCategory}
                onClick={handleStartMatching}
              >
                매칭 시작
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPageV2;