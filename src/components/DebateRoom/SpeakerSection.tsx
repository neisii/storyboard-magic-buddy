import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, MicOff, Clock } from 'lucide-react';
import { Speaker, SpeechHistory } from '@/hooks/useDebateRoom';

interface SpeakerSectionProps {
  speakers: Speaker[];
  currentSpeaker: Speaker | null;
  speechHistory: SpeechHistory[];
}

export const SpeakerSection = ({ speakers, currentSpeaker, speechHistory }: SpeakerSectionProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* 현재 발언자 */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Mic className="h-4 w-4 text-primary" />
            현재 발언자
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentSpeaker ? (
            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-primary/30">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {currentSpeaker.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{currentSpeaker.name}</span>
                  <Badge variant="default" className="gap-1 bg-primary">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    발언 중
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">발언 시간: 2:30</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">현재 발언자가 없습니다</p>
          )}
        </CardContent>
      </Card>

      {/* 발언자 목록 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">발언자 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-sm">
                    {speaker.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <span className="text-sm font-medium">{speaker.name}</span>
                </div>
                {speaker.isActive ? (
                  <Mic className="h-4 w-4 text-primary" />
                ) : (
                  <MicOff className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 발언 이력 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">발언 이력</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64">
            <div className="space-y-3 p-4">
              {speechHistory.map((speech) => (
                <div key={speech.id} className="space-y-2 pb-3 border-b border-border/50 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {speech.speakerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{speech.speakerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(speech.timestamp)}</span>
                      <span>({formatDuration(speech.duration)})</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                    {speech.content}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};