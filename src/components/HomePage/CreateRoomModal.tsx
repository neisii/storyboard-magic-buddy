import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
    debateFormat: ''
  });

  const isFormValid = formData.title && formData.description && formData.category && formData.debateFormat;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    // 인증 검증
    if (!isAuthenticated || isGuest) {
      toast.error('토론방을 만들려면 로그인이 필요합니다.');
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
      debateFormat: ''
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