import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, Hand, Send, MessageCircle } from 'lucide-react';
import { Audience, ChatMessage } from '@/hooks/useDebateRoom';

interface AudienceSectionProps {
  audience: Audience[];
  chatMessages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onRaiseHand: () => void;
}

export const AudienceSection = ({ 
  audience, 
  chatMessages, 
  onSendMessage, 
  onRaiseHand 
}: AudienceSectionProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-4">
      {/* 관중 목록 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="h-4 w-4" />
            관중 ({audience.length}명)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {audience.map((member) => (
              <div key={member.id} className="flex items-center gap-2 p-2 rounded hover:bg-accent/50 transition-colors">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm truncate">{member.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 채팅 */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            채팅
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* 채팅 메시지 */}
          <ScrollArea className="h-64 p-4">
            <div className="space-y-3">
              {chatMessages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs">
                        {message.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{message.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm pl-7 leading-relaxed">{message.message}</p>
                </div>
              ))}
              {chatMessages.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  아직 채팅 메시지가 없습니다
                </p>
              )}
            </div>
          </ScrollArea>

          {/* 채팅 입력 */}
          <div className="p-4 border-t bg-card/50">
            <div className="flex gap-2 mb-2">
              <div className="flex-1 flex gap-1">
                <Input
                  placeholder="메시지를 입력하세요..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="text-sm"
                />
                <Button 
                  size="sm" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* 손들기 버튼 */}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2"
              onClick={onRaiseHand}
            >
              <Hand className="h-4 w-4" />
              발언 요청 (손들기)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};