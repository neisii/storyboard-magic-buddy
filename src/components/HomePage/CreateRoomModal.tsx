import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (roomData: any) => void;
}

export const CreateRoomModal = ({ isOpen, onClose, onCreate }: CreateRoomModalProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, isGuest } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    debateFormat: 'general',
    maxSpeakers: '2',
    duration: '0'
  });

  const isFormValid = formData.title && formData.description && formData.category && formData.debateFormat && formData.maxSpeakers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    // 인증 검증
    if (!isAuthenticated || isGuest) {
      toast({
        title: "로그인 필요",
        description: "토론방을 만들려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }
    
    // 토론방 생성
    const roomId = Date.now().toString(); // 임시 ID 생성
    onCreate(formData);
    onClose();
    
    // 토론방으로 이동
    navigate(`/debate/${roomId}`);
    
    // 폼 초기화
    setFormData({
      title: '',
      description: '',
      category: '',
      debateFormat: 'general',
      maxSpeakers: '2',
      duration: '0'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="text-foreground">토론방 만들기</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">토론 주제</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="토론 주제를 입력하세요"
              className={!formData.title ? 'border-destructive focus-visible:ring-destructive' : ''}
              maxLength={100}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="토론에 대한 간단한 설명을 입력하세요"
              className={!formData.description ? 'border-destructive focus-visible:ring-destructive' : ''}
              maxLength={500}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">카테고리</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className={!formData.category ? 'border-destructive focus:ring-destructive' : ''}>
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="politics">정치</SelectItem>
                <SelectItem value="society">사회</SelectItem>
                <SelectItem value="economy">경제</SelectItem>
                <SelectItem value="technology">기술</SelectItem>
                <SelectItem value="culture">문화</SelectItem>
                <SelectItem value="environment">환경</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="debateFormat">토론 방식</Label>
            <div className="flex gap-2">
              <Badge
                variant={formData.debateFormat === 'general' ? 'default' : 'outline'}
                className={`cursor-pointer hover:bg-primary/90 transition-colors px-4 py-2 ${
                  !formData.debateFormat ? 'border-destructive' : ''
                }`}
                onClick={() => setFormData({ ...formData, debateFormat: 'general' })}
              >
                일반 토론
              </Badge>
              <Badge
                variant={formData.debateFormat === 'quick' ? 'default' : 'outline'}
                className={`cursor-pointer hover:bg-primary/90 transition-colors px-4 py-2 ${
                  !formData.debateFormat ? 'border-destructive' : ''
                }`}
                onClick={() => setFormData({ ...formData, debateFormat: 'quick' })}
              >
                3분 토론
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="duration">토론 시간</Label>
            {formData.debateFormat === 'quick' ? (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">3분</span>
                <span className="text-xs text-muted-foreground">3분 토론 고정</span>
              </div>
            ) : (
              <div className="space-y-3">
                <Slider
                  value={[parseInt(formData.duration)]}
                  onValueChange={(value) => setFormData({ ...formData, duration: value[0].toString() })}
                  min={0}
                  max={3}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30분</span>
                  <span>60분</span>
                  <span>90분</span>
                  <span>120분</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium">
                    {formData.duration === '0' && '30분'}
                    {formData.duration === '1' && '60분'}
                    {formData.duration === '2' && '90분'}
                    {formData.duration === '3' && '120분'}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maxSpeakers">최대 발화자 수</Label>
            <Select value={formData.maxSpeakers} onValueChange={(value) => setFormData({ ...formData, maxSpeakers: value })}>
              <SelectTrigger className={!formData.maxSpeakers ? 'border-destructive focus:ring-destructive' : ''}>
                <SelectValue placeholder="최대 발화자 수를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2명</SelectItem>
                <SelectItem value="4">4명</SelectItem>
                <SelectItem value="6">6명</SelectItem>
                <SelectItem value="8">8명</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button type="submit" className="flex-1" disabled={!isFormValid}>
              토론방 만들기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};